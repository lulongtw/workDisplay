
<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup"
  import loginModule from "@/store/loginModule";

  let qty = ref(1)
  let props = defineProps(['currentItem']);
  let currentItem = ref({})
  watch(()=>props.currentItem,
    (newVal)=>{
      currentItem.value = newVal;
    }
  )
  async function addToCart(){
    let url = '/api/:api_path/cart';
    let method = 'post';
    let toSend = { "data": { "product_id":currentItem.value.id,"qty":qty.value } }
    let res = await getData(url,method,toSend);
    if (res.data.success){
   
      url = `/api/:api_path/cart`
      method = 'get';
      store.dispatch('getCartList',{url,method});
      qty.value = 1
      hideModal('#lookDetailModal')

    }
  }
  
</script>

<template>
  <div class="modal fade" id="lookDetailModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">{{`『${currentItem.title}』`}}</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="currentItemWrap">
          <div class="pic">
            <img :src="currentItem.imageUrl" alt="">
          </div>
          <div class="content">
            <div class="des">{{currentItem.description}}</div>
            <div class="money">
              <span>{{currentItem.origin_price}}</span>
              <span>{{currentItem.price}}</span>
            </div>
          </div>
          <select v-model="qty">
            <option v-for="item in 10" :value="item">{{"買"+item+currentItem.unit}}</option>
          </select>

        </div>
      </div>
      <div class="modal-footer">
        <button @click="()=>{qty = 1}" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button @click="addToCart" type="button" class="btn btn-primary">我要買{{qty+currentItem.unit}}</button>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
  img{
    height:50%;
    width:100%;
    object-fit:cover;

  }
  .money{
    display:flex;
    justify-content:space-between;
    align-items:baseline;
  }
  span{
    font-size:2rem;
  }
  .money>span:first-of-type{
    font-size:0.7rem;
    text-decoration:line-through;
  }
  select{
    width:100%;
  }
</style>