<script setup>
  import {ref,watch,onMounted,computed} from "vue";
  import store from "../store/vuex.js";

  let data = ref(store.state.data)
  
  onMounted(()=>{
    store.dispatch("onValueBase")
  
  });

  watch(()=>store.state.data,
        (newVal)=>data.value=newVal
  );

  let reversedData = computed(()=>{
    return Object.values(data.value).reverse()
  });
  
  function which(userName){
     return reversedData.value[0].user==userName?"":"other"
  }
</script>

<template>

  <div class="room">
    <div :class="['chat',which(item.user)]" v-for="item in reversedData">
      <div class="content">
        {{item.user}} 說:{{item.text}}
      <div class="time">
        at {{item.date.hr}}:{{item.date.mi}}:{{item.date.se}}
      </div>
      </div>
      <div class="pic">
        <img :src="'https://picsum.photos/id/'+item.idx+'/50'" alt="">
      </div>
    </div>
  </div>
  
</template>