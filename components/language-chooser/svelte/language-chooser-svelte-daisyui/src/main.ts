import { mount } from "svelte";
import App from "./App.svelte";
import { loadAllLocales } from "./i18n/i18n-util.sync";
import { setLocale } from "./i18n/i18n-svelte";
import { detectLocale } from "./i18n/i18n-util";
import { navigatorDetector } from "typesafe-i18n/detectors";

// Load all locale translations
loadAllLocales();

// Detect and set the initial locale based on browser preferences
const detectedLocale = detectLocale(navigatorDetector);
setLocale(detectedLocale);

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
