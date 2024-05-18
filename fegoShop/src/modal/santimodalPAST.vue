<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import {useField,useForm,defineRule,configure} from "vee-validate";
  import { localize } from '@vee-validate/i18n';
  import {email,required} from "@vee-validate/rules";
  import * as yup from "yup"

  /*
 重點是取得遠端回傳的圖片網址後
 把網址復職給input
 這邊透過既有的
 let {value:xxx,errorMessage:xxx} = useField('名字','規則1||規則2')
 將網址直接復職給value xxx (記得復職時要xxx.valeu = url)

 而上傳的input可以不理會不需設置規則
 因為所以檢查都是透過網址
 因為上傳圖片後出現的網址也會出現在imageUrl1
 input type='file' 只是上傳工具而已，不需對他僅行檢查
所以下方getone沒有屁用
但是他的直接拿取input的值來檢查  兩者取一的方法仍然是正確地
  
  */ 

  defineRule('required',required);
  defineRule('noNum',noNum);
  defineRule('noStr',noStr);
  // defineRule('getone',getone);

  configure({
  generateMessage: localize('zh-tw', {
    messages: {
      required: '要輸入',
      noNum:'輸入字串',
      noStr:'輸入數字',
      // getone:'兩者選一輸入'
    },
  }),
});

let {handleSubmit} = useForm();
let {value:imageUrl1Val,errorMessage:imageUrl1Err} = useField('imageUrl1','required');
// let {value:imageUrl2Val,errorMessage:imageUrl2Err} = useField('imageUrl2','getone')

  let data = ref({})
  let props = defineProps(["data"]);


  watch(()=>props.data,
    (newVal)=>{
      data.value = newVal;
    }
  )

  // function getone(val){
  //   return imageUrl1Val.value||imageUrl2Val.value?true:false
   
  // }

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

  let onSubmit = handleSubmit(val=>{
    console.log(val)
  })
  
  async function uploadFile(e){
    let file = e.target.files[0];
    if (file){
      let toSend = new FormData();
      toSend.append("file-to-upload",file);
      let url = '/api/:api_path/admin/upload';
      let method = 'post';
      let res = await store.dispatch('uploadImg',{url,method,toSend});
      if (res.data.success){
        //癥結點在這邊 將取得的網址復職給imageUrl1.value
        imageUrl1Val.value = res.data.imageUrl
      }
      console.log(res)
    }
  }



  function editProduct(){
    let url = `/api/:api_path/admin/product/${data.value.item.id}`;
    let method = 'put';
    let toSend =     {
      "data": data.value.item
    };
    store.dispatch('editProduct',{url,method,toSend})
  }
</script>

<template>

<div class="modal fade" id="SanTiModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form  @submit.prevent="onSubmit">
      
        <div class="modal-body">
          <div v-if="data.act!='del'" class="santiWrap">
            <div class="picWrap">
              <label for="">
                <input type="text" name="imageUrl1" v-model="imageUrl1Val">
                {{imageUrl1Err}}
              </label>
              <label for="">
                <input type="file"  @change="uploadFile($event)">
                
              </label>
            </div>
          </div>
          <div v-else>你確定要刪除此筆資料?</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-secondary" >send</button>
          </div>
        </div>
      </form>
      <!-- <input type="text" v-if="data.item" v-model="data.item.title" @keyup.enter="send"> -->

    </div>
  </div>
</div>
</template>
<style scoped>

</style>