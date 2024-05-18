<script setup>
  import {ref,watch,computed,onMounted,onActivated,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter,useRoute} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import {Form,Field,ErrorMessage} from "vee-validate";
  import * as yup from "yup";

  import router from "@/router";
 
  let route = useRoute();

  let currentRoute = ref("")

  onActivated(()=>{
    setTimeout(()=>{
      router.push("/checkOut/useCouponPage")
    },0);
    
  })
  watch(()=>route.path,
    (newVal)=>{
      currentRoute.value = newVal
    }
  )
  function go(){
    switch (currentRoute.value){
      case '/checkOut/useCouponPage':
        router.push("/checkOut/buildOrderListPage")
        break
      case '/checkOut/buildOrderListPage':
        router.push("/checkOut/payPage");
        break
    }
  }

</script>

<template>
  <div class="wrap">
    <div class="title">肥狗旺旺結帳</div>
    <div class="stepWrap">
      <div class="step">
        <router-link to="/checkOut/useCouponPage" active-class="active">
          1.套用優惠券
        </router-link>
      </div>
      <div class="step">
        <router-link to="/checkOut/buildOrderListPage" active-class="active">
          2.建立買家訂單
        </router-link>
      </div>
      <div class="step">
        <router-link to="/checkOut/payPage" active-class="active">
          3.付錢
        </router-link>
      </div>
    </div>
    <div class="viewWrap">
      <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    </div>
   
  </div>
  <div class="butnWrap">
    <button v-if="currentRoute!='/checkOut/payPage'&&currentRoute!='/checkOut/buildOrderListPage'" @click.prevent="go"  type="button" class="btn btn-warning">下一步</button>
  </div>
</template>

<style scoped>
  * {
    text-align: center;
  }
  .title {
    font-size: 20px;
    color: grey;
  }
  .stepWrap {
    display: flex;
    gap: 10px;
    justify-content: center;
    position:relative;
  }
  .step a {
    display: block;
    background-color: rgb(246, 246, 246);
    border:1px solid rgb(236, 212, 164);
    padding: 5px 15px;
    color: rgb(0, 0, 0);
    text-decoration: none;
  }
   /* 特异性加强，确保激活时样式能覆盖 */
  .step a.active { /* 这里加入router-link-exact-active是为了更明确指出激活状态 */
    background-color: rgb(240, 187, 81);
    border:1px solid rgb(236, 212, 164);
    color: white;
  }
  .butnWrap{
    text-align: right;
  }
  .viewWrap{
    padding:20px;
  }
</style>

