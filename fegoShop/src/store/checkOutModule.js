import {getData} from "@/functions.js";
import store from "@/store/store.js"
export default {
  state(){
    return {

    }
  },mutations:{

  },
  actions:{
    async delSingleItemInCart(context,payload){
      let temp = await getData(payload.url,payload.method);
      if (temp.data.success){
        let url = `/api/:api_path/cart`
        let method = 'get';
        store.dispatch('getCartList',{url,method})
      }
    },
    async useCoupon(context,payload){
      let temp = await getData(payload.url,payload.method,payload.toSend);
      if (temp.data.success){
        let url = `/api/:api_path/cart`
        let method = 'get';
        store.dispatch('getCartList',{url,method})
      }
      return temp.data.success
    }
  },

}