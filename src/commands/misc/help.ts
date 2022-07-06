import { BaseCommandInteraction, InteractionReplyOptions, MessageActionRow, MessageAttachment, MessageButton, MessageComponentInteraction, MessageEmbed, MessageSelectMenu } from "discord.js";
import { Command } from "../../command";
import { commandsByPage } from "../../commands";
import config from "../../config.json";

const getNextPage = (currentPage: number, up: boolean) => {
  const possiblePages: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 69];
  let index: number = possiblePages.indexOf(currentPage);

  if (up) index++;
  else index--;

  index = (index + possiblePages.length) % possiblePages.length;

  return possiblePages[index];
};

const getEmbed = (currentPage: number) => new MessageEmbed()
  .setTitle(`Help (p${currentPage}/8)`)
  .setDescription(`A comprehensive list of commands.`)
  .setColor(`#${currentPage === 69 ? "696969" : Math.round(currentPage / 8 * 255).toString(16).repeat(3)}`)
  .setTimestamp()
  .setFooter({ text: `This superfluous bot was created by @earth#1337\nBot version: ${config.version}`, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` })
  .addFields(fields(currentPage))
  .setThumbnail("attachment://help.png");

const fields = (page: number) => commandsByPage[page].map(command => ({
  name: `${command.name}`,
  value: `${command.description}`
}));


export const help: Command = {
  name: "help",
  description: "help command",
  type: "CHAT_INPUT",
  run: async(interaction: BaseCommandInteraction) => {
    if (!interaction || !interaction.isCommand()) return;

    let currentPage: number = 1;

    const buttons: MessageActionRow = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("button_prev")
          .setEmoji("◀️")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("button_next")
          .setEmoji("▶️")
          .setStyle("PRIMARY"),
      );

    const selectMenu: MessageActionRow = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId("select_page")
          .setOptions([
            {
              label: "Page 1: Pre-Break Infinity",
              value: "1",
              description: "Pre-Break Infinity commands"
            },
            {
              label: "Page 2: Post-Break Infinity Era",
              value: "2",
              description: "Post-Break Infinity Era commands"
            },
            {
              label: "Page 3: Eternity Era",
              value: "3",
              description: "Eternity Era commands"
            },
            {
              label: "Page 4: ECs and Dilation",
              value: "4",
              description: "ECs and Dilation commands"
            },
            {
              label: "Page 5: Miscellaneous game commands",
              value: "5",
              description: "Miscellaneous game commands"
            },
            {
              label: "Page 6: Miscellaneous game commands",
              value: "6",
              description: "Miscellaneous game commands"
            },
            {
              label: "Page 7: Miscellaneous helper commands",
              value: "7",
              description: "Miscellaneous helper commands"
            },
            {
              label: "Page 8: Miscellaneous game commands",
              value: "8",
              description: "Miscellaneous game commands"
            },
          ])
      );

    const picture = new MessageAttachment("src/images/misc/help.png");

    const content: InteractionReplyOptions = { embeds: [getEmbed(currentPage)], files: [picture], components: [buttons, selectMenu], ephemeral: true };

    const filter = (i: MessageComponentInteraction) => i.customId.startsWith("select") || i.customId.startsWith("button");
    const collector = interaction.channel?.createMessageComponentCollector({ filter, time: 60000 });

    await interaction.reply(content).then(() => {
      collector?.on("collect", async i => {
        try {
          if (i.isSelectMenu()) {
            const page = parseInt(i.values[0], 10);
            currentPage = page;
            await i.update({ embeds: [getEmbed(page)], files: [picture], components: [buttons, selectMenu] });
          }
          if (i.isButton()) {
            const up = i.customId.startsWith("button_next");
            const page = getNextPage(currentPage, up);
            currentPage = page;
            await i.update({ embeds: [getEmbed(page)], files: [picture], components: [buttons, selectMenu] });
          }
        } catch (e) {
          console.log(e);
        }
      });
    });
  }
};