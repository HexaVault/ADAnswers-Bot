import { ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
import { isHelper } from "../../functions/Misc";
import { link } from "../../functions/formatting";

export const code: Command = {
  name: "code",
  description: "sends a link to the ADAB GitHub repository",
  type: ApplicationCommandType.ChatInput,
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // eslint-disable-next-line max-len
    const content: string = `The ADAB GitHub repository is located ${link("here", "https://github.com/earthernsence/ADAnswers-Bot")}.`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};