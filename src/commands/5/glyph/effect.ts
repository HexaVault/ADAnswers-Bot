import { AttachmentBuilder, ChatInputCommandInteraction, EmbedBuilder, User } from "discord.js";
import { GlyphEmbedGetter, basicGlyphs, specialGlyphs } from "../../../utils/databases/glyphs";
import { authorTitle } from "../../../functions/formatting";
import { ids } from "../../../config.json";
import { isHelper } from "../../../functions/Misc";

export async function effectGlyphSubcommand(interaction: ChatInputCommandInteraction): Promise<void> {
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;
  const isADServer: boolean = (interaction.guildId === ids.AD.serverID);

  const glyphName: string = interaction.options.getString("glyph") as string;
  const altered: boolean = interaction.options.getBoolean("altered") as boolean;
  const hasAlteredImage: boolean = ["dilation", "effarig", "infinity", "power", "replication", "time"].includes(glyphName);

  let picture = new AttachmentBuilder(`src/images/glyphs/${glyphName}.png`);
  if (altered && hasAlteredImage) picture = new AttachmentBuilder(`src/images/glyphs/altered/${glyphName}_altered.png`);
  else if (altered) picture = new AttachmentBuilder(`src/images/glyphs/altered/none_altered.png`);

  const glyphRequested = basicGlyphs[glyphName] ?? specialGlyphs[glyphName];

  let imageLink: string = `attachment://${glyphName}.png`;
  if (altered && hasAlteredImage) imageLink = `attachment://${glyphName}_altered.png`;
  else if (altered) imageLink = `attachment://none_altered.png`;

  const embed: EmbedBuilder = GlyphEmbedGetter(glyphRequested, isADServer, altered, false);
  embed.setAuthor({ name: authorTitle(interaction), iconURL: user.displayAvatarURL() })
    .setThumbnail(imageLink);

  await interaction.reply({ embeds: [embed], files: [picture], ephemeral: !isHelper(interaction) });
}