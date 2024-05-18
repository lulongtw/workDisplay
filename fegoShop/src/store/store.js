import {createStore} from "vuex";
import {getData,getUrl} from "@/functions.js"
import loginModule from "./loginModule";
import cartLstModule from "./cartLstModule";
import checkOutModule from "./checkOutModule"
import router from "@/router"



const store = createStore({
  state(){
    return{
      allProducts:[],
      isLoading:false,
      sellerProductList:{},
      currentCategory:"",
      messages:{},
      cartList:[],
      orderLst:[],
      couponLst:{},
      currentPage:1
    }
  },
  mutations:{
    toggleIsLoading(state,newVal){
      state.isLoading = !state.isLoading;
    },
    renewAllProducts(state,newVal){
      state.allProducts = newVal
    },
    renewSellerProductList(state,newVal){
      state.sellerProductList = newVal
    },
    renewCurrentCategory(state,newVal){
      state.currentCategory = newVal
    },
    renewMessages(state,newVal){
      state.messages = newVal
    },
    renewCartList(state,newVal){
      state.cartList = newVal
    },
    renewOrderList(state,newVal){
      state.orderLst = newVal
    },
    renewCouponLst(state,newVal){
      state.couponLst = newVal
    },
    renewCurrentPage(state,newVal){
      state.currentPage = newVal
    }

  },
  actions:{
    //把商品料整理成以分類為鍵 相關分類身品為值 的物件
    async fetchAllProducts(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        let temp = {}
        res.data.products.forEach(item=>{
          if (!temp[item.category]){
            temp[item.category] = [];
              }
          temp[item.category].push(item)
        })
        context.commit('renewAllProducts',temp);
        context.commit('renewCurrentCategory',Object.keys(temp)[0])
      }
    },
    //這應該沒用吧？
    async getSellerProductList(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        context.commit('renewSellerProductList',res.data.products);
      }
    },
    //取得當前購物車資料
    async getCartList(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        context.commit('renewCartList',res.data.data);
      }
    },
    //建立含買家資料的訂單
    async checkout(context,payload){
      let res = await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let url = '/api/:api_path/orders?page=:page';
        let method = 'get'
        await store.dispatch('getOrderList',{url,method})
        router.push('/checkOut/payPage')
      }
    },
    //取得所有訂單
    async getOrderList(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        context.commit('renewOrderList',res.data);
        //  還要更新cartLst 因為建立訂單會消除購物車
        let url = `/api/:api_path/cart`
        let method = 'get';
        store.dispatch('getCartList',{url,method});
      }
    },
    //真正付錢在這
    async pay(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        let url = '/api/:api_path/orders?page=:page';
        let method = 'get'
        await store.dispatch('getOrderList',{url,method})
        router.push("/buyerShop")
      }
    },
    async uploadImg(context,payload){
      let res
       res = await getData(payload.url,payload.method,payload.toSend);
      return res
    },
    async editProduct(context,payload){
      let res = await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let url = `/api/:api_path/admin/products/all`;
        let method = 'get'
        store.dispatch('getSellerProductList',{url,method})
      }
    },
    async createProduct(context,payload){
      let res =  await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let url = `/api/:api_path/admin/products/all`;
        let method = 'get'
        store.dispatch('getSellerProductList',{url,method})
      }
    },
    async deleteProduct(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        let url = `/api/:api_path/admin/products/all`;
        let method = 'get'
        store.dispatch('getSellerProductList',{url,method})
      }
    },
    async getCouponLst(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        context.commit('renewCouponLst',res.data);
      }
    },
    async editCoupon(context,payload){
      let res = await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let url = `/api/:api_path/admin/coupons?page=${store.state.currentPage}`;
        let method = 'get'
        store.dispatch('getCouponLst',{url,method})
      }
    },
    async deleteCoupon(context,payload){
      let res = await getData(payload.url,payload.method);
      if (res.data.success){
        let url = `/api/:api_path/admin/coupons?page=${store.state.currentPage}`;
        let method = 'get'
        store.dispatch('getCouponLst',{url,method})
      }
    },
    async createCoupon(context,payload){
      let res = await getData(payload.url,payload.method,payload.toSend);
      if (res.data.success){
        let url = `/api/:api_path/admin/coupons?page=${store.state.currentPage}`;
        let method = 'get'
        store.dispatch('getCouponLst',{url,method})
      }
    },

  },modules:{
    loginModule,cartLstModule,checkOutModule
  }
})

export default store