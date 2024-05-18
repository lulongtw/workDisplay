<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup";

  import ShowProductsWhenPay from "@/side/ShowProductsWhenPay.vue";

  let orderLst = ref(store.state.orderLst);
  let productsList = ref({})

  watch(()=>store.state.orderLst,
    (newVal)=>{
      orderLst.value = newVal;
    }
  )

  onMounted(()=>{
    let url = '/api/:api_path/orders?page=:page';
    let method = 'get'
    store.dispatch('getOrderList',{url,method})
  })

  function showCartLst(prds){
    console.log(prds);
    productsList.value = prds
    let target = document.querySelector("#ShowProductsWhenPay");
    let modalDOM = Modal.getOrCreateInstance(target);
    modalDOM.show()
  }
  function pay(item){
      let url = `/api/:api_path/pay/${item.id}`;
      let method = 'post';
      store.dispatch('pay',{url,method})
 
  }
  function check(ck){
    return ck?'btn-success':'btn-warning'
  }
  
</script>

<template>
  <ShowProductsWhenPay :data="productsList"></ShowProductsWhenPay>
  <div class="wrap">
    <table>
    <thead>
      <tr>
        <th>日期</th>
        <th>購買人</th>
        <th>看購買明細</th>
        <!-- <th>付款狀態</th> -->
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,idx) in orderLst.orders" :key="idx">
        <td>{{new Date(item.create_at*1000).toISOString().split("T")[0]}}</td>
        <td>{{item.user.name}}</td>
        <td><button @click="showCartLst(item.products)" type="button" class="btn btn-outline-success">看明細</button></td>
        <td><button  @click.prevent="pay(item)" :class="['btn',check(item.is_paid)]" :disabled="item.is_paid">{{item.is_paid?'已付款':'去付款'}}</button></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
<style scoped>

  table{
    width:100%;
    border-collapse:collapse;
    border:1px solid black;
  }
  td,th{
    border:1px solid black;
    padding:5px 8px;
  }
  .notpaid{
    background-color: red;
    color:white;
    border-radius:10px;
  }
  .paid{
    background-color: green;
    color:white
  }


</style>