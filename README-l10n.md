# Localization in EthnoLib

This document explains the localization setup and workflows for this project.

## Structure

- `locales/`: Contains language-specific translation files
  - `[language-code]/`: Directory for each supported language (e.g., `en/`, `fr/`)
    - `messages.po`: Translation file in gettext PO format
    - `messages.ts`: Compiled TypeScript messages for runtime use (React components)
- `available-locales.json`: Dynamically generated list of available locales
- `lingui.config.ts`: Configuration for lingui (React components)
- `crowdin.yml`: Configuration for Crowdin integration

## Workflow

### Adding/Updating Translations

#### For React Components (language-chooser-react-mui)

1. Mark strings for translation in your code using lingui syntax
2. Run extraction command to update PO files (`npm run l10n:extract`)
3. Upload sources to Crowdin (`npm run l10n:upload`)
4. Download translations from Crowdin (`npm run l10n:download`)
5. Compile messages using lingui (`npm run l10n:compile`)

#### For Svelte Components (language-chooser-svelte-daisyui)

1. Mark strings for translation in your code using svelte-i18n syntax: `$_("string to translate")`
2. The Svelte app reads translations directly from the shared `/locales` PO files at build time
3. Run the PO-to-JSON conversion script to update Svelte translations: `npm run l10n:po-to-json`
4. This script converts PO files to JSON format that svelte-i18n can use at runtime
5. The converted JSON files are stored in `components/language-chooser/svelte/language-chooser-svelte-daisyui/src/lib/i18n/locales/`

**Note**: For Svelte components, you only need to run `npm run l10n:po-to-json` after downloading new translations from Crowdin or when PO files are updated. The Svelte app will automatically load the appropriate translation files based on the selected UI language.

### Crowdin Integration

To use the Crowdin upload and download commands, you must set the `ETHNOLIB_CROWDIN_TOKEN` environment variable to the correct Crowdin API token.

### Managing Available Locales

The project uses a dynamic approach to track available locales:

1. `scripts/update-locales.ts` scans the `locales/` directory for language folders
2. It generates `available-locales.json` containing an array of available locale codes
3. This file is used by the application to determine which languages are available

Run the update script whenever you add or remove language directories:

```
npm run l10n:update-locales
```

### Translation Files

- **PO Files** (`messages.po`): Should only be modified through the extraction process (for English source strings) or via Crowdin (for translations)
- **Compiled Files** (`messages.ts`): Generated files used by React applications at runtime
- **JSON Files** (`*.json` in Svelte i18n locales): Generated files used by Svelte applications at runtime

Do not manually edit `messages.ts` files, `messages.po` files, JSON translation files, or `available-locales.json` as they are automatically generated or managed through dedicated processes.

## Translation Implementation by Component

### React Components
- Use **LingUI** (`@lingui/react`)
- Translations are extracted to PO files and compiled to TypeScript
- Use `<Trans>` component or `t()` function for translations

### Svelte Components  
- Use **svelte-i18n**
- Share the same PO files as React components
- PO files are converted to JSON format for runtime use
- Use `$_("string")` function for translations
- Support for dynamic locale switching via the `uiLanguage` prop
