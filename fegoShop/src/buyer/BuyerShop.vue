<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup"

  import Jumbo from "@/side/Jumbo.vue";
  import Category from "@/side/Category.vue";
  import Products from "@/side/Products.vue";
  import GoToSellerModal from "@/modal/GoToSellerModal.vue";
  import CartLst from "@/side/CartLst.vue";
  

  let data = ref(store.state.allProducts);
  let cartList = ref(store.state.cartList.carts)
  let categories = ref([]);
  let showCartLst = ref(false)

  watch(()=>store.state.cartList.carts,
    (newVal)=>{
      cartList.value = newVal;
     // console.log(cartList.value)
    }
  )

  watch(()=>store.state.allProducts,
    (newVal)=>{
      data.value = newVal;
      categories.value = Object.keys(data.value)
    }
  )
</script>

<template>
   <aside>
    <Jumbo></Jumbo>
  </aside>
  <main>
      <div class="category">
        <Category :categories="categories" ></Category>
      </div>
      <div class="productsArea">
        <Products></Products>
      </div>
    </main>
</template>
<style scoped>
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