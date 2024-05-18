import {getData,getUrl} from "@/functions.js"
import store from "@/store/store.js"

export default {
  state(){
    return{

    }},
    mutations:{

    },
    actions:{
      async delSingleItem(context,payload){
        let res = await getData(payload.url,payload.method);
        if (res.data.success){
          let url = `/api/:api_path/cart`
          let method = 'get';
          store.dispatch('getCartList',{url,method});
        }
    }
  }

 
}