<script lang="ts">
  import { onMount } from "svelte";
  import { locale } from "svelte-i18n-lingui";
  import { initI18n } from "./i18n";

  interface I18nProviderProps {
    locale?: string;
    children?: any;
  }

  let { locale: localeParam, children }: I18nProviderProps = $props();

  let isI18nInitialized = $state(false);

  const effectiveLocale = localeParam || detectBrowserLocale();

  onMount(async () => {
    await initI18n(effectiveLocale);
    setIsI18nInitialized(true);
  });

  function setIsI18nInitialized(value: boolean) {
    isI18nInitialized = value;
  }

  /**
   * Detects the browser's preferred language
   * @returns The detected browser locale or 'en' as fallback
   */
  function detectBrowserLocale(): string {
    if (typeof window === "undefined") {
      return "en"; // Default for server-side rendering
    }

    // Use navigator language APIs to get the user's preferred language
    const browserLocale =
      navigator.languages?.[0] ||
      navigator.language ||
      (navigator as any).userLanguage ||
      (navigator as any).browserLanguage ||
      "en";

    return browserLocale;
  }
</script>

{#if isI18nInitialized}
  {@render children?.()}
{/if}
