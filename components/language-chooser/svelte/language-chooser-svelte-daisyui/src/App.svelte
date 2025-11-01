<script lang="ts">
  import { onMount } from "svelte";
  import "./app.css";
  import LanguageChooser from "./lib/LanguageChooser.svelte";
  import LanguageChooserModal from "./lib/LanguageChooserModal.svelte";
  import I18nProvider from "../../common/I18nProvider.svelte";
  import {
    defaultDisplayName,
    type IOrthography,
  } from "@ethnolib/find-language";
  import { locale } from "svelte-i18n-lingui";
  import availableLocales from "./available-locales.json";

  let showModal = $state(() => {});
  let orthography: IOrthography = $state({});
  let languageTag: string | undefined = $state();
  let interfaceLanguage = $state("en");

  async function changeInterfaceLanguage(lang: string) {
    try {
      const { messages } = await import(
        `../../../../locales/${lang}/messages.ts`
      );
      locale.set(lang, messages);
      interfaceLanguage = lang;
    } catch (error) {
      console.error(`Failed to load locale ${lang}:`, error);
    }
  }
</script>

<I18nProvider locale={interfaceLanguage}>
  <main>
    <div class="m-8">
      <h1 class="text-4xl md:text-5xl mb-8">Language Chooser Demo</h1>

      <div class="flex">
        <div class="flex-1">
          <div class="card card-border w-96 bg-base-100 shadow-xl mb-8">
            <div class="card-body">
              <p>
                Language Display Name: {orthography.customDetails
                  ?.customDisplayName ||
                  defaultDisplayName(orthography.language, orthography.script)}
              </p>
              <p>Language Code: {orthography.language?.languageSubtag}</p>
              <p>Script: {orthography.script?.name}</p>
              <p>Region: {orthography.customDetails?.region?.name}</p>
              <p>Dialect: {orthography.customDetails?.dialect}</p>
              <p>Language Tag: {languageTag}</p>
            </div>
          </div>
          <button class="btn btn-primary" onclick={showModal}
            >Modify Language Selection</button
          >
        </div>
        <div class="flex-1">
          <h3 class="mb-2">Choose Interface Language:</h3>
          <select
            class="select select-bordered w-full max-w-xs mb-4"
            bind:value={interfaceLanguage}
            onchange={(e) => changeInterfaceLanguage(e.currentTarget.value)}
          >
            {#each availableLocales as localeCode}
              <option value={localeCode}>{localeCode.toUpperCase()}</option>
            {/each}
          </select>

          <h3 class="mb-2">Choose Theme:</h3>
          <fieldset class="fieldset">
            <label class="flex gap-2 cursor-pointer items-center">
              <input
                type="radio"
                name="theme-radios"
                class="radio radio-sm theme-controller"
                value="light"
                checked
              />
              Light
            </label>
            <label class="flex gap-2 cursor-pointer items-center">
              <input
                type="radio"
                name="theme-radios"
                class="radio radio-sm theme-controller"
                value="dark"
              />
              Dark
            </label>
          </fieldset>
        </div>
      </div>
    </div>

    <LanguageChooserModal
      bind:show={showModal}
      bind:orthography
      bind:languageTag
    />
  </main>
</I18nProvider>
