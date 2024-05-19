<script setup>
  import {ref,watch,computed,onMounted, onActivated} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal} from "@/functions.js";
  
  
  import Category from "@/side/Category.vue";
  import Products from "@/side/Products.vue";
  import GoToSellerModal from "@/modal/GoToSellerModal.vue";
  import CartLst from "@/side/CartLst.vue";
  import router from "@/router";

  let data = ref(store.state.allProducts);
  let cartList = ref(store.state.cartList)
  let categories = ref([]);
  let showCartLst = ref(false)
  

  onMounted(()=>{   
    let url = `/api/:api_path/products/all`
    let method = 'get';
    store.dispatch('fetchAllProducts',{url,method});

    
    url = `/api/:api_path/cart`
    method = 'get';
    store.dispatch('getCartList',{url,method});
  
    router.push("/buyerShop")
  })
  onActivated(()=>{
    router.push("/buyerShop")
  })



  watch(()=>store.state.cartList,
    (newVal)=>{
      cartList.value = newVal;

    }
  )

  watch(()=>store.state.allProducts,
    (newVal)=>{
      data.value = newVal;
      categories.value = Object.keys(data.value)
    }
  )

  function hideCartLst(){
    showCartLst.value = false
  }

</script>

<template>
  <GoToSellerModal></GoToSellerModal>
  <header>
    <div class="hover" @click="showModal('#GoToSellerModal')"><i class="fa-solid fa-paw"></i>肥狗超商</div>
    <div :style="{position:'relative'}">
      <div @click="()=>{ showCartLst = !showCartLst}" class="cart hover">
      <i class="fa-solid fa-cart-shopping"></i>
      <template v-if="cartList.carts"> <span  :style="{padding:'3px',backgroundColor:'rgb(236, 212, 164)',borderRadius:'10px',marginLeft:'3px'}">{{cartList.carts.length}}</span></template>
    </div>
      <CartLst @hideMe="hideCartLst" v-if="showCartLst"></CartLst>
    </div>


  </header>
  <div class="buyerMainWrap">
    <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>

  </div>
  <footer>
    <div>© Copright 2024 Internation Fego Best .Co</div>
    <div>Made with FegoPower</div>
  </footer>
 

</template>
<style scoped>
  .hover:hover{
    cursor:pointer
  }
  *{
    padding:0xp;margin:0px;
  }
  .buyerMainWrap{
    width:90%;
    margin:0 auto
  }
  header{
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding:10px 50px;
    position: sticky ;
    top:0;
    margin: 0 auto;
    background-color: rgb(236, 212, 164);
    z-index:888
  }
  header>div{
    font-size: 1.3rem;
  }
  .cart{
    position: relative;
    background-color: gray;
    padding:10px;
    border-radius:10px;
  }
  main{
    display:grid;
    grid-template-columns:1fr 3fr;
    gap:30px;
  }
  footer{
    text-align: center;
  }
  .category{
    z-index:0;
  }
  

</style>