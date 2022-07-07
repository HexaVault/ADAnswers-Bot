import { BaseCommandInteraction } from "discord.js";
import { Command } from "../../command";
import { Tree } from "../../classes/Tree";
import { isHelper } from "../../functions/Misc";

export const studytree: Command = {
  name: "studytree",
  description: "Generates a Time Study tree based on your total Time Theorems.",
  type: "CHAT_INPUT",
  options: [
    {
      name: "theorems",
      description: "The number of Time Theorems you have.",
      type: "INTEGER",
      required: true,
      // eslint-disable-next-line camelcase
      min_value: 0,
    },
    {
      name: "path",
      description: "The path you want to use; only has effect 54 < x < 123 where x is TT",
      type: "STRING",
      required: false,
      choices: [
        { name: "Passive", value: "passive" },
        { name: "Active", value: "active" },
        { name: "Idle", value: "idle" },
      ]
    }
  ],
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    const theorems: number = interaction.options.getInteger("theorems") as number;
    const path: string = interaction.options.getString("path") as string;
    const tree = new Tree(theorems, path).generateTree();

    await interaction.reply({ content: tree, ephemeral: !isHelper(interaction) });
  }
};