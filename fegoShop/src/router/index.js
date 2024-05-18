import {createRouter,createWebHashHistory} from "vue-router";
import BuyerMain from "@/buyer/BuyerMain.vue";
import SellerMain from "@/seller/SellerMain.vue";
import Login from "@/seller/Login.vue";
import BuyerShop from "@/buyer/BuyerShop.vue";
import CheckOut from "@/buyer/CheckOut.vue";
import BuildOrderListPage from "@/side/BuildOrderListPage.vue";
import UseCouponPage from "@/side/UseCouponPage.vue";
import PayPage from "@/side/PayPage.vue";
import ProductsLst from "@/seller/ProductsLst.vue";
import CouponsLst from "@/seller/CouponsLst.vue"

const router = createRouter({
  history:createWebHashHistory(),
  
  routes:[
    {
      path:"/",
      component:BuyerMain,
      children:[
        {
          path:"buyerShop",
          component:BuyerShop
        },{
          path:"checkOut",
          component:CheckOut,
          children:[
            {
              path:"payPage",
              component:PayPage
            },{
              path:"useCouponPage",
              component:UseCouponPage
            },{
              path:'buildOrderListPage',
              component:BuildOrderListPage
            }
          ]
        }
      ]
    },{
      path:"/sellerMain",
      component:SellerMain,
      meta:{requiredAuth:true},
      children:[
        {
          path:'productsLst',
          component:ProductsLst
        },{
          path:'couponsLst',
          component:CouponsLst
        }
      ]
    },{
      path:'/login',
      component:Login
    }

  ]
});

export default router