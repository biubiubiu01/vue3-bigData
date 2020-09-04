import {
  createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import "@/styles/index.scss";

import "@UI/styles/ui.scss";



createApp(App)
  .use(store)
  .use(router)
  .mount("#app");