<script lang="ts">
  import { onMount } from "svelte";
  import "./app.css";
  import LanguageChooser from "./lib/LanguageChooser.svelte";
  import LanguageChooserModal from "./lib/LanguageChooserModal.svelte";
  import {
    defaultDisplayName,
    type IOrthography,
  } from "@ethnolib/find-language";
  import LL, { locale, setLocale } from "./i18n/i18n-svelte";
  import type { Locales } from "./i18n/i18n-types";

  let showModal = $state(() => {});
  let orthography: IOrthography = $state({});
  let languageTag: string | undefined = $state();
  
  // Available locales for the language switcher
  const availableLocales: { value: Locales; label: string }[] = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
  ];
  
  function handleLocaleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    setLocale(target.value as Locales);
  }
</script>

<main>
  <div class="m-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl md:text-5xl">{$LL.app.title()}</h1>
      
      <!-- Language Selector -->
      <div class="flex items-center gap-2">
        <label for="locale-selector" class="font-semibold">Language:</label>
        <select
          id="locale-selector"
          class="select select-bordered"
          bind:value={$locale}
          onchange={handleLocaleChange}
        >
          {#each availableLocales as loc}
            <option value={loc.value}>{loc.label}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="flex">
      <div class="flex-1">
        <div class="card card-border w-96 bg-base-100 shadow-xl mb-8">
          <div class="card-body">
            <p>
              {$LL.app.languageDisplayName()} {orthography.customDetails
                ?.customDisplayName ||
                defaultDisplayName(orthography.language, orthography.script)}
            </p>
            <p>{$LL.app.languageCode()} {orthography.language?.languageSubtag}</p>
            <p>{$LL.app.script()} {orthography.script?.name}</p>
            <p>{$LL.app.region()} {orthography.customDetails?.region?.name}</p>
            <p>{$LL.app.dialect()} {orthography.customDetails?.dialect}</p>
            <p>{$LL.app.languageTag()} {languageTag}</p>
          </div>
        </div>
        <button class="btn btn-primary" onclick={showModal}
          >{$LL.app.modifyLanguageSelection()}</button
        >
      </div>
      <div class="flex-1">
        <h3>{$LL.app.chooseTheme()}</h3>
        <fieldset class="fieldset">
          <label class="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              class="radio radio-sm theme-controller"
              value="light"
              checked
            />
            {$LL.app.light()}
          </label>
          <label class="flex gap-2 cursor-pointer items-center">
            <input
              type="radio"
              name="theme-radios"
              class="radio radio-sm theme-controller"
              value="dark"
            />
            {$LL.app.dark()}
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
