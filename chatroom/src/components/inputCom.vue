<script setup>
  import {ref} from "vue";
  import store from "../store/vuex.js";
  let user = ref("");
  let text = ref("");
  function send(){
    store.dispatch("sendNewMsg",{
      user:user.value,
      text:text.value,
      date:getTime(),
      idx:getIdx(user.value)
    })
  }
  function getTime(){
    let time = new Date();
    return{
      hr:time.getHours(),
      mi:time.getMinutes(),
      se:time.getSeconds()
    }
  }
  function getIdx(userName){
    let data = store.state.data;
    for (let key in data){
      if (data[key].user==userName){
        return data[key].idx
      }
    }
    return getNewIdx()
  }
  function getNewIdx(){
    let count = store.state.count;
    store.dispatch("sendNewCount",count+9);
    return count
  }
</script>

<template>
  <div class="inputWrap">
    <div class="input-group mb-3">
   <input v-model="user" type="text" class="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
  </div>

  <div class="input-group mb-3">
    <input v-model="text" type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button @click="send" class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
  </div>
  </div>
  
  
</template>