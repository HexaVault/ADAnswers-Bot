import { AttachmentBuilder, ChatInputCommandInteraction, User } from "discord.js";
import { TeresaBasicInfoEmbed, TeresaPerkShopEmbed, TeresaRealityEmbed, TeresaUnlockEmbed } from "../../../utils/databases/celestials/teresa-concept";
import { authorTitle, isHelper } from "../../../functions/Misc";

export async function teresaCelestialSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const infoRequested = interaction.options.getSubcommand();
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
  const image = new AttachmentBuilder("src/images/celestials/teresa.png");

  switch (infoRequested) {
    case "basic": {
      const embed = TeresaBasicInfoEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
    case "reality": {
      const embed = TeresaRealityEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
    case "perkshop": {
      const embed = TeresaPerkShopEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
    case "unlocks": {
      const embed = TeresaUnlockEmbed().setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() }).setThumbnail("attachment://teresa.png");
      await interaction.reply({ embeds: [embed], files: [image], ephemeral: !isHelper(interaction) });
      break;
    }
  }
}