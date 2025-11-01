/**
 * Convert PO files to JSON format for svelte-i18n
 * This script reads PO files from the /locales directory and converts them to JSON
 * format that can be used by svelte-i18n at runtime
 */
import * as fs from "fs";
import * as path from "path";
import gettextParser from "gettext-parser";

const localesDir = path.join(__dirname, "..", "locales");
const outputDir = path.join(
  __dirname,
  "..",
  "components",
  "language-chooser",
  "svelte",
  "language-chooser-svelte-daisyui",
  "src",
  "lib",
  "i18n",
  "locales"
);

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read available locales
const availableLocales = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "available-locales.json"), "utf-8")
);

console.log(`Converting PO files for ${availableLocales.length} locales...`);

for (const locale of availableLocales) {
  const poFile = path.join(localesDir, locale, "messages.po");
  
  if (!fs.existsSync(poFile)) {
    console.warn(`Warning: PO file not found for locale ${locale}`);
    continue;
  }

  try {
    // Read and parse PO file
    const poContent = fs.readFileSync(poFile);
    const parsed = gettextParser.po.parse(poContent);

    // Convert to simple key-value JSON for svelte-i18n
    const translations: Record<string, string> = {};
    
    const translations_obj = parsed.translations[""];
    for (const key in translations_obj) {
      if (key === "") continue; // Skip header
      
      const entry = translations_obj[key];
      // Use msgid as key and msgstr as value
      // For svelte-i18n, we need the actual translation string
      if (entry.msgstr && entry.msgstr[0]) {
        translations[key] = entry.msgstr[0];
      }
    }

    // Write JSON file
    const outputFile = path.join(outputDir, `${locale}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(translations, null, 2));
    
    console.log(`✓ Converted ${locale}: ${Object.keys(translations).length} strings`);
  } catch (error) {
    console.error(`Error processing locale ${locale}:`, error);
  }
}

console.log("\nConversion complete!");
console.log(`JSON files written to: ${outputDir}`);
