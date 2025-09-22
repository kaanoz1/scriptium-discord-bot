import {
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";
import {
  VALID_LANG_CODES,
  VALID_SCRIPTURE_CODES,
  VALID_VOCALIZATION_KEYS,
} from "./consts";

export type TScriptureCode = (typeof VALID_SCRIPTURE_CODES)[number];
export type TVocalizationKey = (typeof VALID_VOCALIZATION_KEYS)[number];
export type TLangCode = (typeof VALID_LANG_CODES)[number];

export interface Command {
  cooldown?: number;
  data: RESTPostAPIChatInputApplicationCommandsJSONBody;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export type Response<T> = {
  data: T;
};
