import { register, init, getLocaleFromNavigator, waitLocale } from 'svelte-i18n';
import availableLocales from '../../../../../../../available-locales.json';

// Register all available locales
availableLocales.forEach((locale) => {
  register(locale, () => import(`./locales/${locale}.json`));
});

// Initialize i18n and return a promise that resolves when ready
export async function initI18n(initialLocale?: string) {
  init({
    fallbackLocale: 'en',
    initialLocale: initialLocale || getLocaleFromNavigator() || 'en',
  });
  
  // Wait for the initial locale to be loaded
  await waitLocale();
}

export { availableLocales };
