<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import {useField,useForm,defineRule,configure} from "vee-validate";
  import { required } from '@vee-validate/rules';
  import { localize } from '@vee-validate/i18n';

/*
yup和useField不同點在於

yup的v-model是外界let的
要使用必須在外面let 然後在標籤上使用取得

而useField在建立時就已經建立v-model


所以如果是用yup
一開始就建立currentProcessData變數  
在create和edit時  也就是在createCoupon() 和edit()
就將空值 或是 要edit的值賦予給currentProcessData
幹這樣yup好像比較簡單吼= = 
*/ 

/*
  一開始卡在
  edit與create公用form 
  以及 
  edit需要拿本地既有資料呈現 而不是像以前表單是空白開始

  先講edit
  input標籤的  v-model 和 name 一樣都是用useField的
  而不是使用editItem的
  這樣才能確保在表單送出時拿到的東西是有用且一致的
  但咬怎樣把空白表單變成editItem的資料
  就是在edit被觸發時 
  將editItem取得的資料復職給useField定義的value  （這部分在function edit() 執行）

  至於edit和create共用onSubmit
  就是透過觸發edit和create按鈕時，定義行為 (act)  
  最後在onSubmit時switch檢查act決定行為
*/ 


  let data = ref([]);
  //取得按下去後 該行coupon的資料
  //在html內使用Edititem.id與迭代的item.id決定是否變edit input
  let editItem = ref({});

  //因為edit直接操作本地資料的v-model 
  //如果有改動，即使沒有送遠端的情況下
  //仍會改動本地資料 形成 遠端本地不一致情形
  //所以要在在close按鈕上 加上恢復本資料的行為
  let originalItem = ref({});

  //決定是否出現新的一行來做新coupon
  let showCreateCoupon = ref(false);

  //因為都是同一個表單 但共用一個submit  所以用此決定不同的遠端行為
  let act = ref('')

  let currentPage = ref(store.state.currentPage);
  let pagination = ref({});
  let {handleSubmit,resetForm} = useForm();

  //所有送遠端行為統一在這邊
  let onSubmit = handleSubmit((val)=>{
    let url;
    let method;
    let toSend;
    val.due_date = new Date(val.due_date).getTime() / 1000
    switch (act.value){
      case "edit":
        url = `/api/:api_path/admin/coupon/${editItem.value.id}`;
        method = 'put';
          toSend = {
          'data':val
        }
        store.dispatch('editCoupon',{url,method,toSend})
        //將選擇到的那行 由input 變成 td
        editItem.value = "";
        break
      case 'create':
        url = '/api/:api_path/admin/coupon';
        method = 'post';
        toSend = {
          'data':val
         };
        store.dispatch('createCoupon',{url,method,toSend});
        //
        exitCreate()
        break
    }
  })
  
  defineRule('required',required);
  defineRule('onlyNum',(val)=>{
    return String(val).split("").every(item=>{
      return !isNaN(item)
    })
  });
  configure({
  generateMessage: localize('zh-tw', {
    messages: {
      required: '要填入',
      onlyNum:'只有數字'
    },
  }),
});

  let {value:nameVal,errorMessage:nameErr} = useField('title',"required");
  let {value:codeVal,errorMessage:codeErr} = useField('code','required');
  let {value:percentVal,errorMessage:percentErr} = useField('percent','required||onlyNum');
  let {value:dateVal,errorMessage:dateErr} = useField('due_date','required');
  let {value:ableVal,errorMessage:ableErr} = useField('is_enabled','');


  onMounted(()=>{
    let url = `/api/:api_path/admin/coupons?page=${currentPage.value}`;
    let method = 'get'
    store.dispatch('getCouponLst',{url,method})
  })

  watch(()=>store.state.couponLst,
    (newVal)=>{
      data.value = newVal.coupons;
      pagination.value = newVal.pagination
      data.value.forEach((item,idx,self)=>{
        self[idx].due_date =  new Date(item.due_date*1000).toISOString().split("T")[0]
      })
  });

  watch(()=>store.state.currentPage,
    (newVal)=>{
      currentPage.value = newVal
    }
  )
  
  function edit(item){
    showCreateCoupon.value = false;
    act.value = 'edit'
    editItem.value = item;
    originalItem.value = JSON.parse(JSON.stringify(item));
    nameVal.value = item.title;
    codeVal.value = item.code;
    percentVal.value = item.percent;
    dateVal.value = item.due_date;
    ableVal.value = item.is_enabled;

  }
  function exitEdit(item){
    act.value = ""
    //將可能更動的資料恢復原狀
    let idx = data.value.indexOf(item);
    data.value[idx] = originalItem.value
    editItem.value = "";
  }

  function del(item){
    let url = `/api/:api_path/admin/coupon/${item.id}`;
    let method = 'delete';
    store.dispatch('deleteCoupon',{url,method})
  }
  function createCoupon(){
    act.value = 'create';
    editItem.value = ""
    //不resetForm 會看到上次的資料
    //而且因為共用一組useField 也就是v-model create會看到edit的資料
    //useField 需要依靠 let {resetForm} = useForm() 來取得resetForm

    //但是yup在submit的函式中自動引入表單value 以及 {resetForm} 參數功能
    //如下面一行註解
    //function onSubmit(values, { resetForm }) {
    //  resetForm()   yup直接透過參數引入  屌吧
    //}

    resetForm()
    showCreateCoupon.value = true;

  }
  function exitCreate(){
    act.value = ""
    showCreateCoupon.value = false;
  }
  function goPage(check,page){
    if (check){
      store.commit('renewCurrentPage',page);
      let url = `/api/:api_path/admin/coupons?page=${page}`;
      let method = 'get'
      store.dispatch('getCouponLst',{url,method})
    }else{
      let stamp = new Date().getTime()
      store.commit('renewMessages',{'message':'到底了，頂到肺了','stamp':stamp})
    }
    
  }
</script>

<template>
  <button @click="createCoupon" type="button" class="btn btn-primary">建立coupon</button>
  <form @submit.prevent="onSubmit" >
  <table>
    <thead>
      <tr>
        <th>coupon名稱</th>
        <th>優惠碼</th>
        <th>折扣</th>
        <th>過期日</th>
        <th>啟用狀態</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>

      <tr v-if="showCreateCoupon">
        <td><input :class="{'err':nameErr}" name="name" type="text" v-model="nameVal">
          <span :style="{color:'red',fontSize:'10px'}">{{nameErr}}</span>
        </td>
        <td><input :class="{'err':codeErr}" name="title" type="text" v-model="codeVal">
          <span :style="{color:'red',fontSize:'10px'}">{{codeErr}}</span>
        </td>
        <td><input :class="{'err':percentErr}" name="percent" type="text" v-model="percentVal">
          <span :style="{color:'red',fontSize:'10px'}">{{percentErr}}</span>
        </td>
        <td><input :class="{'err':dateErr}" name="due_date" type="date" v-model="dateVal">
          <span :style="{color:'red',fontSize:'10px'}">{{dateErr}}</span>
        </td>
        <td>
          <input type="checkbox" name="is_enabled" :true-value="1" :false-value="0"  v-model="ableVal">
        </td>
        <td>
          <div>
          <button  type="submit" class="btn btn-success"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
            create
          </button>
          <button @click="exitCreate" type="button" class="btn btn-success"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
            exit
          </button>
        </div>
        </td>
   
      </tr>
  
      <tr  v-for="(item,idx) in data" :key="item.id">
        <template v-if="editItem.id!=item.id">
          <td>{{item.title}}</td>
          <td>{{item.code}}</td>
          <td>{{item.percent}}</td>
          <td>{{item.due_date}}</td>
          <td>{{item.is_enabled=="1"?'啟用':'沒用'}}</td>
        </template>
        <template v-else>
          <td><input :class="{'err':nameErr}" name="name" type="text" v-model="nameVal">
            <span :style="{color:'red',fontSize:'10px'}">{{nameErr}}</span>
        </td>
        <td><input :class="{'err':codeErr}" name="title" type="text" v-model="codeVal">
          <span :style="{color:'red',fontSize:'10px'}">{{codeErr}}</span>
        </td>
        <td><input :class="{'err':percentErr}" name="percent" type="text" v-model="percentVal">
          <span :style="{color:'red',fontSize:'10px'}">{{percentErr}}</span>
        </td>
        <td><input :class="{'err':dateErr}" name="due_date" type="date" v-model="dateVal">
          <span :style="{color:'red',fontSize:'10px'}">{{dateErr}}</span>
        </td>
        <td>
          <input type="checkbox" name="is_enabled" :true-value="1" :false-value="0"  v-model="ableVal">
        </td>
        </template>
          <td>
            <div v-if="editItem.id!=item.id">
              <button @click="edit(item)" type="button" class="btn btn-info"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
              edit
            </button>
            <button @click="del(item)" type="button" class="btn btn-danger"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
              del
            </button>
            </div>
            <div v-else>
              <button  type="submit" class="btn btn-success"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
              send
            </button>
            <button @click="exitEdit(editItem)" type="button" class="btn btn-success"
              style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
              exit
            </button>
            </div>
          </td>
      </tr>
    </tbody>
  </table>
  </form>

  <nav aria-label="...">
  <ul class="pagination">
    <li @click.prevent="goPage(pagination.has_pre,currentPage-1)" :class="['page-item',{'disabled':!pagination.has_pre}]">
      <a class="page-link">Previous</a>
    </li>
    <li @click.prevent="goPage(true,item)" :class="['page-item',{'active':currentPage==item}]" v-for="item in pagination.total_pages">
      <a class="page-link" href="#">{{item}}</a>
    </li>

    <li @click.prevent="goPage(pagination.has_next,currentPage+1)"  :class="['page-item',{'disabled':!pagination.has_next}]" >
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
</template>
<style scoped>
  table{
    width:min(100%,900px);
    border-collapse:collapse;
    border:1px solid black;
    text-align:center;
    margin:30px auto;
  }
  th,td{
    padding:3px 8px;
    border:1px solid black;
  }
  input{
    width:100%;
  }
  td>div{
    display: flex;
    gap:10px;
  }
  .err{
    border:1px solid red;
  }
</style>