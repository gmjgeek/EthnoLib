export { default as LanguageChooser } from "./src/lib/LanguageChooser.svelte";
export { default as LanguageChooserModal } from "./src/lib/LanguageChooserModal.svelte";
export { default as I18nProvider } from "../common/I18nProvider.svelte";
export { initI18n, i18n } from "../common/i18n";

export {
  defaultSearchResultModifier,
  isUnlistedLanguage,
  createTagFromOrthography,
  parseLangtagFromLangChooser,
  defaultDisplayName,
  defaultRegionForLangTag,
} from "@ethnolib/find-language";
export type {
  ILanguage,
  IScript,
  IRegion,
  IOrthography,
  ICustomizableLanguageDetails,
} from "@ethnolib/find-language";
