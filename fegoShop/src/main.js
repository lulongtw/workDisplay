import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.css'
import axios from "axios";

import {getData} from "@/functions.js"

axios.defaults.withCredentials = true;
let app = createApp(App);

app.use(router);

router.beforeEach(async(to)=>{
  if (to.meta.requiredAuth){
    let res = await getData('/api/user/check','post');
    if (!res.data.success){
      alert('u shall not pass')
      router.push("/login")
    }
  }
})

app.mount("#app")