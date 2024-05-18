import axios from "axios";
import {getData} from "@/functions.js";
import {useRouter} from "vue-router";

import router from "@/router/index.js"

export default {
  state(){
    return{

    }
  },
  actions:{
    async checkUser(context,payload){
      let res = await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let token = res.data.token;
        let expired = res.data.expired;
        document.cookie = `coughToken=${token};expired:${expired}`
        router.push("/sellerMain")
      }
    }
  }
}