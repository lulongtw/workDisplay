<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup";
  import {Field,Form,ErrorMessage} from "vee-validate";

  let router = useRouter();
  // let data = ref({
  //   'name':'',
  //   'email':"",
  //   'phone':"",
  //   'address':'',
  //   'message':''
  // })
  let data = ref({})

  function namestring(val){
    let lst = val.split("");
    return lst.every(item=>{
      return isNaN(item)
    })
  }
  function emailcheck(val){
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    return emailRule.test(val);
  }
  function phonecheck1(val){
    let lst = val.split("");
    return  lst.every(item=>{
      return !isNaN(item)
    })
  }
  function phonecheck2(val){
    let lst = val.split("");
    return lst.length==10?true:false
  }

  const schema = yup.object().shape({
    name:yup.string().test('namestring','你名字有數字?',namestring).required('必須填入'),
    email:yup.string().required('必須填入').test('emailtest','不合格emial',emailcheck),
    phone:yup.string().required('必須填入').test('phonetest1','輸入數字',phonecheck1).test('phonetest2','輸入10位數字',phonecheck2),
    address:yup.string().required('必須填入'),
    message:yup.string()
  })

//yup在submit的函式中自動引入表單value 以及 {resetForm} 參數功能
//useField 則是需要依靠 let {resetForm} = useForm() 來取得resetForm
function onSubmit(values, { resetForm }) {
  let url = '/api/:api_path/order';
  let method = 'post';
  let toSend = {
    "data": {
      "user": {
        "name": values.name,
        "email": values.email,
        "tel": values.phone,
        "address": values.address
      },
      "message": values.message ? values.message : '沒訊息,她離開你了'
    }
  }
  store.dispatch('checkout', { url, method, toSend });
  resetForm();
}

  
</script>

<template>
 <Form :validation-schema="schema" @submit="onSubmit">
  <label for="">大名
    <Field name="name" v-model="data.name" v-slot="{field,errors}">
      <input type="text" :placeholder="errors[0]" v-bind="field" :class="{'error':errors.length>0}">
    </Field>
    <div class="ermsg">
      <ErrorMessage name="name"></ErrorMessage>
    </div>
  </label>
  <label for="">伊妹兒
    <Field name="email" v-model="data.email" v-slot="{field,errors}">
      <input type="text" :placeholder="errors[0]" v-bind="field" :class="{'error':errors.length>0}">
    </Field>
    <div class="ermsg"><ErrorMessage name="email"></ErrorMessage></div>
  </label>
  <label for="">手機
    <Field name="phone" v-model="data.phone" v-slot="{field,errors}">
      <input type="text" :placeholder="errors[0]" v-bind="field" :class="{'error':errors.length>0}">
    </Field>
    <div class="ermsg">
      <ErrorMessage name="phone"></ErrorMessage>
    </div>
  </label>
  <label for="">地址
    <Field name="address" v-model="data.address" v-slot="{field,errors}">
      <input type="text" :placeholder="errors[0]" v-bind="field" :class="{'error':errors.length>0}">
    </Field>
    <div class="ermsg">
      <ErrorMessage name="address"></ErrorMessage>
    </div>
  </label>
  <label for="">留言
    <Field name="message" v-model=data.message v-slot="{field,errors}">
      <textarea v-bind="field" :class="{'error':errors.length>0}"></textarea>
    </Field>
  </label>

  <div class="butnWrap">
    <button class="btn btn-warning">下一步</button>
  </div>


</Form>

</template>
<style scoped>
  label{
    text-align: left;
  }
  label,input,textarea{
    width:100%;

  }
  input{
    padding:5px 10px;
  }
  .error{
    border: 1px solid red;
  }
  .ermsg{
    color:red;
    font-size:10px;
  }
  input.error::placeholder{
    color:red;
    opacity:0.6;
    font-size: 13px;
  }
  .butnWrap{
    text-align: right;
  }

</style>