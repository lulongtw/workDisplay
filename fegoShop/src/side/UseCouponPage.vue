<script setup>
  import {ref,watch,computed,onMounted,onActivated,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup";
  import { nextTick } from 'vue';
  let height
  let crtLstTarget
  let crtLst = ref(store.state.cartList);
  let show = ref(false);
  let couponCode = ref("");
  let couponRes = ref("")


  watch(()=>store.state.cartList,
    (newVal)=>{
      crtLst.value = newVal;
      setTimeout(()=>{
        crtLstTarget.style.height = "auto";
        let styles = window.getComputedStyle(crtLstTarget);
        height = styles.getPropertyValue("height");
      },0)
    }
  )
  /*
    setTimeout()
    nextTick(() => {
      crtLstTarget.style.height = show.value ? height : "0px";
    });
  */
  
  onMounted(()=>{
    crtLstTarget = document.querySelector(".crtLstTarget");
    let styles = window.getComputedStyle(crtLstTarget);
    height = styles.getPropertyValue("height");
    crtLstTarget.style.height = show.value?height:"0px";

  })

  onActivated(()=>{
    //不這樣的話衝新整理會爆炸
    setTimeout(()=>{
      crtLstTarget.style.height = "auto";
    let styles = window.getComputedStyle(crtLstTarget);
    height = styles.getPropertyValue("height");
    crtLstTarget.style.height = show.value?height:"0px";
    },0)
  })

  function showCrtLst(){
    show.value = !show.value;
    crtLstTarget.style.height = show.value?height:"0px"
  
  } 


  function delThis(item){
    let payload = {
      url:`/api/:api_path/cart/${item.id}`,
      method:'delete'
    }
    store.dispatch('delSingleItemInCart',payload)
  }
  async function useCoupon(){
    let url = '/api/:api_path/coupon';
    let method = 'post';
    let toSend = {
      "data": {
        "code": couponCode.value
      }
    } ;
    couponRes.value = await store.dispatch('useCoupon',{url,method,toSend})
    if (!couponRes.value){
      couponCode.value =""
    }
  }
  
</script>

<template>
     <div @click="showCrtLst" class="money">
      <span >顯示購物車內容</span>
      <span>{{Math.floor(crtLst.final_total)}}</span>
    </div>
    <div class="crtLstTarget">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>商品名稱</th>
            <th>數量</th>
            <th>小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,idx) in crtLst.carts">
            <td @click="delThis(item)"><i class="fa-regular fa-trash-can"></i></td>
            <td><img :src="item.product.imageUrl" alt=""></td>
            <td>{{item.product.title}}<div class="tow" v-if="item.coupon">已套用{{item.coupon.title}}</div></td>
            <td>{{item.qty}}{{item.product.unit}}</td>
            <td>{{item.product.price}}元</td>
          </tr>
          <tr>
            <td colspan="5" class="coupon">
              輸入coupon<input @keyup.enter="useCoupon" type="text" v-model="couponCode" placeholder="fego">
              <div>
                <button  v-if="couponCode!=''" @click="useCoupon"  type="button" class="btn btn-warning">送出coupon</button>
              </div>
              <div>運費$60</div>合計${{Math.floor(crtLst.final_total+60)}}
            </td>
  
          </tr>
        </tbody>
      </table>
    </div>
</template>
<style scoped>
  .money{
    padding:10px 20px;
    background-color: grey;
    margin:10px auto;
    display:flex;
    justify-content: space-between;
  }
  .money:hover{
    cursor:pointer
  }
  .crtLstTarget{
    overflow: hidden;
    transition:height 1s
  }
  table{
    width:100%;

  }
  img{
    object-fit: contain;
    width:100px;height:100px;
  }
  tr{
    border-bottom:1px solid grey;
  }
  tr>td:first-of-type:hover{
    cursor: pointer;
  }
  table tr:last-of-type{
    border:none;
    font-weight:800;
  }
  table tr:last-of-type>td,table tr:last-of-type div{
    text-align:right;
  }
  .coupon{
    text-align: right;
  }
  .tow{
    font-size: 10px;
    color:green
  }
</style>