import { ApplicationCommandOptionType, ApplicationCommandType, CommandInteraction } from "discord.js";
import { Command } from "../../command";
// Import { StringIndexedStringObjectType } from "../../utils/types";
import { isHelper } from "../../functions/Misc";

/* eslint-disable max-len */
// const realityMessageObject: StringIndexedStringObjectType = {
//   "link": "Reality has released! Go play it at <https://ivark.github.io/AntimatterDimensions/> and see what's changed for yourself!",
//   "automator": `Check out this video! <https://youtu.be/687i6dUkBlk>. The Automator will also have two modes, a "block" Automator and a regular scripting Automator. The Blocktomato has been compared to something akin to Scratch; drag blocks and create a script. The regular scripting Automator is exactly what it says on the tin. You may have heard something in the past about limited lines, however, this has changed, and there is no line limiting.`,
//   "perks": `On Reality, you gain one Perk Point, which you can spend in the Perk Tree. Start reading <#351477847090659341> at <https://canary.discord.com/channels/351476683016241162/351477847090659341/606221441704394774>.`,
//   "celestials": `After Reality, there are 7 Celestials. Each with unique mechanics and upgrades, and you need to defeat them all. The first four Celestials are pretty much ready, however, the fifth, sixth, and seventh are still being balanced. I'm not revealing more though, as it can be regarded as a spoiler.`,
//   "blackhole": `The Black Hole is an upgradeable mechanic that speeds up time every now and again. It is active for a short time, then on cooldown, but during its active time the speed of time is multiplied.`,
//   "reset": `When you reality, you gain a Glyph, with its level based on a few resources. There are 5 different Glyph types, each with 4 different effects. You will also gain Reality Machines, which are used for upgrades. These upgrades have requirements which you first need to meet. There's also Perk Points, which you can use on a perk tree, these are less of a production boost, and more of a quality of life, like a bit more automation, etc.  `,
//   "releasedate": `There is no set release date for Reality. Even those who are close to the development do not know. We can also not give you an estimate. Reality is a big update with a lot of moving parts, and we want to make sure that it's up to snuff. Please remain patient! Reality will also be the last major update for Antimatter Dimensions, so we want to make sure we deliver the perfect product that we know you will enjoy.`
// };
/* eslint-enable max-len */

export const reality: Command = {
  name: "reality",
  description: "Information surrounding the reality update.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "info",
      description: "Shows selected information about the reality update.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        { name: "link", value: "link" },
        { name: "automator", value: "automator" },
        { name: "perks", value: "perks" },
        { name: "celestials", value: "celestials" },
        { name: "blackhole", value: "blackhole" },
        { name: "reset", value: "reset" },
        { name: "releasedate", value: "releasedate" }
      ]
    }
  ],
  run: async(interaction: CommandInteraction) => {
    if (!interaction || !interaction.isChatInputCommand()) return;

    // Hi, it's earth! I'm not updating this command for now (I want the update to be around for a while before doing so)

    // const informationRequested: string = interaction.options.getString("info") as string;
    const content: string = `Reality has released! Go play it at <https://ivark.github.io/AntimatterDimensions/> and see what's changed for yourself!`;

    await interaction.reply({ content, ephemeral: !isHelper(interaction) });
  }
};