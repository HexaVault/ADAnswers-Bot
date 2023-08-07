import { CommandInteraction, EmbedBuilder, User, hideLinkEmbed, hyperlink } from "discord.js";
import { ids } from "../config.json";

export const Caesar = {
  mod: (n: number, p: number) => {
    let n2 = n;
    if (n < 0)
      n2 = p - Math.abs(n) % p;

    return n2 % p;
  },
  encrypt: (msg: string, key: number) => {
    let encMsg = "";

    const upper = msg.toUpperCase();

    for (let i = 0; i < upper.length; i++) {
      let code = upper.charCodeAt(i);

      // Encrypt only letters in 'A' ... 'Z' interval
      if (code >= 65 && code <= 65 + 26 - 1) {
        code -= 65;
        code = Caesar.mod(code + key, 26);
        code += 65;
      }

      encMsg += String.fromCharCode(code);
    }

    return encMsg;
  },
  randomKey: () => Math.floor(Math.random() * 25),
  randomEncrypt: (msg: string) => Caesar.encrypt(msg, Caesar.randomKey())
};

export const EmbedWithFooter = (customFooter: string | undefined = undefined) => new EmbedBuilder()
  .setTimestamp()
  .setFooter({ text: customFooter === undefined ? footerText() : customFooter, iconURL: `https://cdn.discordapp.com/attachments/351479640755404820/980696250389254195/antimatter.png` });

// Discord irreparably fucked up usernames, now we have this
export function authorTitle(interaction: CommandInteraction): string {
  const user: User = interaction.member === null ? interaction.user : interaction.member.user as User;

  return authorTitleFromUser(user);
}

export function authorTitleFromUser(user: User): string {
  const hasDiscriminator: boolean = user.discriminator !== "0";

  if (hasDiscriminator) return `${user.username}#${user.discriminator}`;
  return `${user.username}`;
}

export const footerText = () => (Math.random() > 0.5 ? `Be sure to read the pins in your progression channel!` : `Art by @mrkrutaman`);

export function formatDate(month: number, day: number, year: number) {
  return `${String(month).length === 1 ? `0${month}` : `${month}`}/${String(day).length === 1 ? `0${day}` : `${day}`}/${year}`;
}

export function getBaseLog(x: number, y: number): number {
  return Math.log(y) / Math.log(x);
}

export function isEligibleForHelper(interaction: CommandInteraction): boolean {
  const roles = interaction.guild?.members.resolve(interaction.user)?.roles.cache;
  const eligibleRoles = ids.rolesGreaterThanOrEqualToInfinityDimension;
  const eligible = roles?.some(role => eligibleRoles.includes(role.id));
  return eligible as boolean;
}

export function isHelper(interaction: CommandInteraction): boolean | undefined {
  if (!interaction.inGuild()) return true;
  // Now that's an expression!
  return interaction.guild?.members.resolve(interaction.user)?.roles.cache.has(ids.AD.requestableRoles.helperRole);
}

export function link(content: string, url: string) {
  return hyperlink(content, hideLinkEmbed(url));
}

// eslint-disable-next-line max-params
export function makeEnumeration<itemType>(
  items: Array<itemType>,
  separator: string = ", ",
  name: string = "",
  finalSeperator: string = "or"
) {
  if (items.length === 0) return "";
  if (items.length === 1) return `${name}${items[0]}`;
  if (items.length === 2) return `${name}${items[0]} ${finalSeperator} ${name}${items[1]}`;
  const commaSeparated = items.slice(0, items.length - 1).join(separator);
  const last = items[items.length - 1];
  return `${name}${commaSeparated}, ${finalSeperator} ${name}${last}`;
}

export function pluralise(word: string, count: number) {
  if (count === 1) {
    return word;
  }
  return `${word}s`;
}

export function quantify(word: string, count: number): string {
  return `${count} ${pluralise(word, count)}`;
}

export function randomInArray<itemType>(array: Array<itemType>) {
  return array[Math.floor(Math.random() * array.length)];
}

export function range(start: number, stop?: number, step?: number) {
  let realStart = start;
  const realStop = stop ?? start;
  const realStep = step ?? 1;
  if (realStop === realStart) {
    realStart = 0;
  }

  if ((realStep > 0 && realStart >= realStop) || (realStep < 0 && realStart <= realStop)) {
    return [];
  }

  const result = [];
  for (let i = realStart; realStep > 0 ? i < realStop : i > realStop; i += realStep) {
    result.push(i);
  }

  return result;
}

export function toNumber(string: string) {
  const match = string.match(/^\d+/u);
  if (!match) return 0;
  return parseInt(match[0], 10);
}