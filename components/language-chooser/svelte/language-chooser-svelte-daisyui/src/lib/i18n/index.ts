import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import availableLocales from '../../../../../../../available-locales.json';

// Register all available locales
availableLocales.forEach((locale) => {
  register(locale, () => import(`./locales/${locale}.json`));
});

// Initialize i18n
export function initI18n(initialLocale?: string) {
  init({
    fallbackLocale: 'en',
    initialLocale: initialLocale || getLocaleFromNavigator() || 'en',
  });
}

export { availableLocales };
