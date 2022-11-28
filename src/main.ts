import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';
import '@/assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(Quasar);
app.use(router);

app.mount('#app');