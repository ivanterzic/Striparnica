import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/colors.css";
import "./styles/general.css";

createApp(App).use(router).mount("#app");
