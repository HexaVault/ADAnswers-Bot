import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";
import { link } from "../../functions/formatting";

export const notations: Command = {
  name: "notations",
  description: "Sends a link to the Notations GitHub repo.",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `Check out all notations in action ${link("here", "https://antimatter-dimensions.github.io/notations/")} (${link("GitHub repo", "https://github.com/antimatter-dimensions/notations")})`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};