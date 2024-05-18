<script setup>
  import {watch,ref} from "vue";
  import store from "@/store/store.js";
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/css/index.css';
  import axios from "axios";



  let messagesLst = ref([])
  let isLoading = ref(false)
  let cookies = document.cookie.split("; ");
  let toSendCookie;


  watch(()=>store.state.messages,
    (newVal)=>{
      messagesLst.value.unshift(newVal);
      setTimeout(()=>{
        delMsg(newVal.stamp)
      },2000)
    }
  )

  cookies.forEach(item=>{
    let temp = item.split('=')
    if ('coughToken'==temp[0]){
      toSendCookie = temp[1]
    }
  })


  
  axios.defaults.headers.common.authorization = toSendCookie;

  watch(()=>store.state.isLoading,
    (newVal)=>{
      let timeOut
      if (!newVal){
        clearTimeout(timeOut)
        isLoading.value = true
        setTimeout(()=>{
          isLoading.value = false
        },1000)
      }else{
        isLoading.value = newVal
      }
    }
  )
  function delMsg(stamp){
    messagesLst.value.forEach(item=>{
      if (item.stamp == stamp){
        let idx = messagesLst.value.indexOf(item);
        messagesLst.value.splice(idx,1)
      }
    })
  }

</script>

<template>
  <div>
    <div v-if="messagesLst[0]">
      <div class="msgs">
      <div @click=" delMsg(item.stamp)" class='msg' v-for="item in messagesLst">{{item.message}}</div>
    </div>
    </div>

    
    <loading v-model:active="isLoading"/>
    <router-view></router-view>
  </div>


</template>
<style scoped>
  .msgs{
    position:fixed;
    top:30px;
    right:30px;
    z-index:1000000
  }

  .msg{
    margin-top:20px;
    padding:20px;
    background-color: pink;
  }

</style>