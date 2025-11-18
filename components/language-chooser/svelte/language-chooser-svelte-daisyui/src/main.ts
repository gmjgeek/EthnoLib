import { mount } from "svelte";
import App from "./App.svelte";
import { initI18n } from "./lib/i18n";

// Initialize i18n before mounting the app
let app: any;
initI18n().then(() => {
  app = mount(App, {
    target: document.getElementById("app")!,
  });
});

export default app;
