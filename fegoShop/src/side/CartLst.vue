<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup"
  import router from "@/router";

  let cartLst = ref(store.state.cartList);

  let emits = defineEmits(['hideMe'])

  watch(()=>store.state.cartList,
    (newVal)=>{
      cartLst.value = newVal
    }
  )

  onMounted(()=>{
    let target = document.querySelector('#target');
    target.addEventListener('mouseleave',()=>{
      emits('hideMe')
    })
  })
  
  function delThisItem(id){
    let url = `/api/:api_path/cart/${id}`;
    let method = 'delete'
    let res = store.dispatch('delSingleItem',{url,method})
  }
  
  function goCheckOut(){
    router.push("/checkOut")
  }
</script>

<template>
  <div class="cartLst" id="target">
    <div v-if="cartLst.carts.length==0" :style="{ textAlign: 'center' ,color:'gray'}">購物車裡面沒東西</div>
    <div class="item" v-for="(item,idx) in cartLst.carts">
      <td @click="delThisItem(item.id)"><i class="fa-regular fa-trash-can"></i></td>
      <td> {{item.product.title}}</td>
      <td><span>{{item.qty}}{{item.product.unit}}</span></td>
      <td>${{item.product.price}}元</td>
    </div>
    <div @click="goCheckOut" class="checkout"><i class="fa-solid fa-paw"></i> checkout</div>
  </div>

</template>
<style scoped>

.cartLst{
    width:250px;
    position:absolute;
    top:50px;
    right:0px;
    padding:10px;
    border:1px solid black;
    background-color: white;
    max-height:300px;
    overflow: scroll;
  }
.item{
  border-bottom: 1px solid gray;
  display:flex;
  gap:3px;
  font-size:12px;
  align-items: center;

}
.item>td:nth-of-type(1){
  color:red;
}
.item>td:nth-of-type(2){
  width:60%;
  text-align:center;
}
.checkout{
  padding:3px;
  background-color: yellow;
  border-radius:13px;
  margin:13px;
  text-align: center;
}
.checkout:hover{
  cursor: pointer;
}
</style>