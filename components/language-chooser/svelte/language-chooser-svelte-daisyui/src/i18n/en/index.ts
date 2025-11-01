import type { BaseTranslation } from '../i18n-types'

const en = {
  // App.svelte
  app: {
    title: 'Language Chooser Demo',
    languageDisplayName: 'Language Display Name:',
    languageCode: 'Language Code:',
    script: 'Script:',
    region: 'Region:',
    dialect: 'Dialect:',
    languageTag: 'Language Tag:',
    modifyLanguageSelection: 'Modify Language Selection',
    chooseTheme: 'Choose Theme:',
    light: 'Light',
    dark: 'Dark'
  },
  
  // LanguageChooser.svelte
  chooser: {
    chooseLanguage: 'Choose Language',
    searchPlaceholder: 'Search by name, code, or country',
    selectScript: 'Select a script',
    editLanguageTag: 'Edit Language Tag',
    customize: 'Customize',
    unlistedLanguage: 'Unlisted Language',
    displayThisLanguageThisWay: 'Display this language this way',
    ok: 'Ok',
    cancel: 'Cancel',
    customLanguageTagPrompt: 'If this user interface is not offering you a language tag that you know is valid ISO 639 code, you can enter it here:',
    invalidBcp47Format: 'This is not in a valid IETF BCP 47 format: {tag}'
  },
  
  // CustomizationModal.svelte
  modal: {
    customLanguageTag: 'Custom Language Tag',
    unlistedLanguageTag: 'Unlisted Language Tag',
    enterCustomTag: 'Enter Custom Tag'
  }
} satisfies BaseTranslation

export default en
