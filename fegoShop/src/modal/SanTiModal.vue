<script setup>




/*
幹遇到爆幹難題
這便是要更新或新增圖片
使用Form讓使用者寫入資料
問題出在上傳圖片時
無法將遠端取得的網址
放入input 作為input的值

以前沒有檢查的做法是 值些使用v-model
但是使用vee-validate Form表單
依賴Field的v-slot 傳入規則
讓input可以遵守規則
但是input的type為file時，就無法引入v-bind:field 來引入規則

所以嘗試使用setFieldValue  
因為這個規則只有required  所以只要傳值進相對應的name 也就是imageUrl2
當取得遠端時 使用setFieldValue 塞值進去  但是一樣無法哭哭

/////以上是白癡在靠背//////////

我被input type='file'誤導
以為他也要引入規則，
但實際上他的呈現也是透過上面那行input name='imageUrl1'
所以不需糾結要如何給他引入規則，(當我知道type='file'無法使用v-bind 來引入ㄑｆｉｅｌｄ規則嚇壞了)

而重點是取得值，只需給imageUrl1特別放置v-model 
（注意：是放在Field上 透過v-slot與v-bind傳給input 取得input響應式值）
然後在input type='file' 的@change行為遠端取得資料後
將資料復職近該v-model即可

所以時機上這兩個input 算是同一個input 只需對inageUrl1設置規則即可
*/ 
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import {Form,Field,ErrorMessage} from "vee-validate";
  import {email,required} from "@vee-validate/rules";
  import * as yup from "yup"

  let data = ref();
  let act = ref("");
  let originData = ref()
  let props = defineProps(["payload"]);
  

  watch(() => props.payload, (newVal) => {
  //喔喔喔喔  幹還可以這樣
  //直接不用emit喔
  /*
  因為傳給子組件的payload是物件
  而在watch時 
  子組件只取物件的值  而不是整個物件
  所以是傳參考
  變成說子組件的資料一動
  父組件就會動了
  至於為什麼要研究這個
  因為在沒有送出更動的情形下
  有趣更改modal裡面的資料然後直接close
  會因為傳參考的特性將子組件更改後的資料傳給父組件
  形成emit
  幹這樣也可以 = =
  */
  // 创建一个深拷贝来避免直接修改原始对象
  
  data.value = JSON.parse(JSON.stringify(newVal.item));
  act.value = newVal.act;
}, { deep: true });


  function noNum(val){
    return val.split("").every(item=>{
      return isNaN(item)
    })
  }
  function noStr(val){
    return val.split("").every(item=>{
      return !isNaN(item)
    })
  }
  
  async function uploadFile(e){
    let file = e.target.files[0];
    if (file){
      let toSend = new FormData();
      toSend.append("file-to-upload",file);
      let url = '/api/:api_path/admin/upload';
      let method = 'post';
      let res = await store.dispatch('uploadImg',{url,method,toSend});
      if (res.data.success){
        // console.log(res.data.imageUrl)
        data.value.imageUrl = res.data.imageUrl
      }
      console.log(res)
    }
  }


  const schema = yup.object().shape({
    imageUrl:yup.string().required('必須填入'),
    title:yup.string().required("必須填入"),
    category:yup.string().required("必須填入").test('catetest','分類不是數字',noNum),
    unit:yup.string().required("必須填入").test('unittest','單位不是數字',noNum),
    origin_price:yup.string().required("必須填入").test('orpricetest','原價填入數字',noStr),
    price:yup.string().required("必須填入").test('prtest','售價填入數字',noStr),
  })

  function onSubmit(val){
    let url;
    let method;
    let toSend
    switch (act.value){
      case 'edit':
        url = `/api/:api_path/admin/product/${data.value.id}`;
        method = 'put';
        toSend = {
          'data':val
        };
        store.dispatch('editProduct',{url,method,toSend});
        break
      case 'add' :
        url = '/api/:api_path/admin/product';
        method = 'post';
        toSend = {
          'data':val
        }
        store.dispatch('createProduct',{url,method,toSend});
        break
      case 'del' :
        url = `/api/:api_path/admin/product/${data.value.id}`;
        method = 'delete';
        store.dispatch('deleteProduct',{url,method});
      
    }
    hideModal('#SanTiModal')
  }



</script>

<template>
     <!-- <input v-if="data.item" type="text" :value="data.item.id"> -->
<div class="modal fade" id="SanTiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <Form  :validation-schema="schema" @submit="onSubmit">
  
        <div class="modal-body">
          <div v-if="act!='del'" class="santiWrap">

            <div  v-if="data" class="picWrap">
              <label  for="imageUrl">輸入圖片網址
                <Field name="imageUrl" v-model="data.imageUrl" v-slot="{field,errors}">
                  <input type="text"  v-bind="field"  :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="imageUrl"></ErrorMessage>
                </div>
              </label>
              <label>或 上傳圖片
                  <input @change="uploadFile($event)" type="file"  >
              </label>
              <img :src="data.imageUrl" alt="">
            </div>
            <div  v-if="data" class="contentWrap">
              <label class="fatty" for="">標題
                <Field name="title" v-model="data.title" v-slot="{field,errors}">
                  <input type="text" v-bind="field" :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="title"></ErrorMessage>
                </div>
              </label>
              <label for="category">分類
                <Field name="category" v-model="data.category" v-slot="{field,errors}" >
                  <input type="text" v-bind="field" :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="category"></ErrorMessage>
                </div>
              </label>
              <label for="unit">單位
                <Field name="unit" v-model="data.unit" v-slot="{field,errors}">
                  <input type="text" v-bind="field" :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="unit"></ErrorMessage>
                </div>
              </label>
              <label for="origin_price">原價
                <Field name="origin_price" v-model="data.origin_price" v-slot="{field,errors}">
                  <input type="text" v-bind="field" :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="origin_price"></ErrorMessage>
                </div>
              </label>
              <label for="price">售價
                <Field name="price" v-model="data.price" v-slot="{field,errors}">
                  <input type="text" v-bind="field" :class="{'error':errors.length>0}">
                </Field>
                <div class="errMsg">
                  <ErrorMessage name="price"></ErrorMessage>
                </div>
              </label>
              <label class="fatty" for="">描述
                <Field name="description" v-model="data.description" v-slot="{field}">
                  <textarea v-bind="field" name="" id="" ></textarea>
                </Field>
              </label>
              <label class="fatty" for="">內容
                <Field name="content" v-model="data.content" v-slot="{field}">
                  <textarea v-bind="field"  name="" id="" ></textarea>
                </Field>
              </label>
      
                <Field name="is_enabled" v-slot="{field}" v-model="data.is_enabled">

                  <input v-bind="field" v-model="data.is_enabled" type="checkbox">是否啟用
                </Field>
      
            </div>
          </div>
          <div v-else>你確定要刪除此筆資料?</div>
          <div class="modal-footer">
         
            <button  type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button v-if="act!='del'"  class="btn btn-primary" >送出</button>
            <button v-else @click="onSubmit"  class="btn btn-primary" >送出</button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</div>
</template>
<style scoped>
  @import '@/assets/santiModalCss.css';
</style>