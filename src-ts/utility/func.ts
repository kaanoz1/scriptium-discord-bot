import {
  VALID_LANG_CODES,
  VALID_SCRIPTURE_CODES,
  VALID_VOCALIZATION_KEYS,
} from "./consts";
import { TLangCode, TScriptureCode, TVocalizationKey } from "./types";

export const isValidScriptureCode = (
  input: string | TScriptureCode
): input is TScriptureCode => {
  return VALID_SCRIPTURE_CODES.some((e) => e === input);
};

export const isValidVocalization = (
  input: string | TVocalizationKey
): input is TVocalizationKey => {
  return VALID_VOCALIZATION_KEYS.some((e) => e == input);
};

export const isValidLangCode = (
  input: string | TLangCode
): input is TLangCode => {
  return VALID_LANG_CODES.some((e) => e == input);
};
