import App from "./App.vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import "./assets/style.css";

import {createApp} from "vue";

let app = createApp(App);

app.mount("#app");