import { ActivityType, ApplicationCommandType, Client, ContextMenuCommandBuilder } from "discord.js";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { Commands } from "../commands";
import { PresenceMessage } from "../functions/presence";
import { ids } from "../config.json";

export default (client: Client, databases: Sequelize[], tagsArray: ModelStatic<Model>[]): void => {
  client.on("ready", async() => {
    if (!client.user || !client.application) {
      console.log("Missing user or application. Restart the bot.");
      return;
    }

    for (const database of databases) {
      await database.authenticate();
      console.log(`Authenticated ${database.getDatabaseName()}`);
    }

    for (const tag of tagsArray) {
      tag.sync();
      console.log(`Synced ${tag.name}`);
    }

    try {
      await client.application.commands.set(Commands);
      await client.application.commands.create(new ContextMenuCommandBuilder()
        .setName("Report message")
        .setType(ApplicationCommandType.Message));
      console.log("Commands globally deployed.");
      await client.guilds.cache.get(ids.testServer)?.commands.set(Commands);
      await client.guilds.cache.get(ids.testServer)?.commands.create(new ContextMenuCommandBuilder()
        .setName("Report message")
        .setType(ApplicationCommandType.Message));
      console.log("Commands deployed to test server.");
    } catch (e) {
      console.log(e);
    }

    function setBotStatus(): void {
      const next = PresenceMessage.next();
      client.user?.setActivity(next, { type: ActivityType.Listening });
    }

    setInterval(setBotStatus, 15000);

    console.log(`${client.user.username} is online`);
  });
};