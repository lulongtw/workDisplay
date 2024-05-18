<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import LookDetailModal from "@/modal/lookDetailModal.vue"
  import * as yup from "yup"
import { image } from "@vee-validate/rules";

  //  所有已分類商品資料
  let products = ref([]);
  //當前分類
  let currentCategory = ref(store.state.currentCategory);
  //看仔細按鈕 呼叫modal傳給modal的props
  let currentItem = ref({});

  //當前分類商品的數量
  let currentCategoryLength = ref("");
  //當前分類商品頁數號碼
  let currentPage = ref(1);

//1 , 5, 9  %4==1


  let currentShow = computed(()=>{
    //確定取得 所有商品 當前分類 後  (不這樣在一開始[]尚未取得資料會報錯)
    if ( products.value[currentCategory.value]){
      //對當前分類商品進行拆分
      //使用.slice 與當前頁面 篩出目標頁面資料
      let ans = products.value[currentCategory.value].slice((currentPage.value-1)*2,(currentPage.value-1)*2+2);
    return ans
    }
  });


  let pages = computed(()=>{
    //運算當前選擇分類可以分成多少頁
    return Math.ceil(currentCategoryLength.value/2)
  })


  watch(()=>store.state.currentCategory,
    (newVal)=>{
      //STORE換page要把頁數回1
      currentPage.value = 1;
      //追蹤目前選擇的分類
      currentCategory.value = newVal;
      //運算當前選擇分類有幾個
      currentCategoryLength.value = products.value[currentCategory.value].length
   
    }
  )
  watch(()=>store.state.allProducts,
    (newVal)=>{
      products.value = newVal;
    }
  )
  function lookDetail(item){
    currentItem.value = item
  }

  function checkLoaded(item){
    let image = new Image();
    image.src = item.imageUrl;
    image.onload = ()=>{
      return false
    }
    return true
  }

  let vSex = {
    mounted(el,bind) {
      el.style.backgroundImage = ""
      el.classList.toggle('spinner')
      let img = new Image();
      img.src = bind.value.imageUrl;
      img.onload = ()=>{
        el.classList.toggle('spinner')
        el.style.backgroundImage =  `url(${bind.value.imageUrl})`
      }
    },
    updated:(el,bind)=>{
      el.style.backgroundImage = ""
      el.classList.toggle('spinner')
      let img = new Image();
      img.src = bind.value.imageUrl;
      img.onload = ()=>{
        el.classList.toggle('spinner')
        el.style.backgroundImage =  `url(${bind.value.imageUrl})`
      }
 
    }
  }

  async function addToCart(item){
    let url = '/api/:api_path/cart';
    let method = 'post';
    let toSend = { "data": { "product_id":item.id,"qty":1 } };
    let res = await getData(url,method,toSend);
    if (res.data.success){
       url = `/api/:api_path/cart`
       method = 'get';
      store.dispatch('getCartList',{url,method});
    }
  }
  function goPage(page){
    //更動目前頁面
    //因為透過computed currentShow 所以不用watch即可響應
    currentPage.value = page
  }

  function goPrev(){
    currentPage.value = currentPage.value!==1?currentPage.value-=1:1
  } 
  function goNext(){
    currentPage.value = currentPage.value!==pages.value?currentPage.value+=1:pages.value
  } 
</script>

<template>
  <LookDetailModal :currentItem="currentItem"></LookDetailModal>
  <div class="productsWrap">
      <div  v-for="(item,idx) in currentShow" class="item">
        <div class="pic">
          <!-- <div v-if="checkLoaded(item)" class="spinner">da</div>
          <img v-else :src="item.imageUrl"> -->
          <!-- <img :src="item.imageUrl" v-sex="item"> -->
          <div class="imageDiv" v-sex="item"></div>
        </div>
        <div class="name">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
        <div class="buttons">
          <button @click="lookDetail(item)" type="button" class="btn btn-outline-warning"
           style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"  data-bs-toggle="modal" data-bs-target="#lookDetailModal">
              <span :style="{color:'black'}">看仔細</span>
          </button>
          <button @click="addToCart(item)" type="button" class="btn btn-warning"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            直購霸狗！
          </button>
        </div>
      </div>
  </div>

  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li @click.prevent='goPrev' :class="['page-item',{'disabled':currentPage==1}]"><a class="page-link" href="#">Previous</a></li>
    <li @click.prevent="goPage(item)" :class="['page-item',{'active':currentPage==item}]" v-for="item in pages"><a class="page-link" href="#">{{item}}</a></li>
    <li @click.prevent="goNext" :class="['page-item',{'disabled':currentPage==pages}]"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>
</template>
<style scoped>
  .spinner{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .spinner::after{
    content:"";
    width:50px;height:50px;
    border:3px solid grey;
    border-top :3px solid rgb(0, 0, 0);
    border-radius: 100%;
    animation: spin 1s infinite;
  }
  @keyframes spin{
    to {transform:rotate(360deg)}
  }
  .imageDiv{
    width:100%;
    height:200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius:30px;
    border-radius:30px 0px 0px 0px;
  
  }
  .productsWrap{
    /* display:grid;
    grid-template-columns:1fr 1fr; */
    display:flex;
    flex-wrap:wrap;
    gap:30px;    
  }
  .item{
    border:1px solid gray;
    text-align:center;
    display:flex;
    flex-direction: column;
    gap:10px;
    width:250px;
    border-radius:30px 0px 30px 0px;
  }
  img{
    width:100%;
    height:200px;
    object-fit:cover;
    border-radius:30px;
    border-radius:30px 0px 0px 0px;
  }
  .buttons{
    padding:10px;
    border-top: 1px solid rgb(165, 165, 165);
    border-radius:0px 0px 30px 0px;
    display:flex;
    justify-content: space-evenly;
  }
  nav{
    margin:30px auto;
  }

  @media (max-width:800px){
    .productsWrap{
      justify-content: center;
    }
    nav{
      display: flex;
      justify-content: center;
    }
  }
</style>