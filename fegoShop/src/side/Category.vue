
<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal} from "@/functions.js";
  import * as yup from "yup"

  let props = defineProps(['categories']);
  let currentCategory = ref(store.state.currentCategory)
  let categories = ref([])
  // watch(()=>props.currentCategory,
  //   (newVal)=>{
  //     currentCategory.value = newVal
  //   }
  // )
  watch(()=>props.categories,
    (newVal)=>{
      categories.value = newVal
    }
  )
  watch(()=>store.state.currentCategory,
    (newVal)=>{
      currentCategory.value = newVal
    }
  )

  function cngCategory(item){
    store.commit('renewCurrentCategory',item)
  }
  
</script>

<template>
  <div class="list-group">
       <a @click.prevent="store.commit('renewCurrentCategory',item)" 
       v-for="(item,idx) in categories" href="#" 
       :class="['list-group-item', 'list-group-item-action',{'list-group-item-warning':currentCategory==item}]">
              <!-- list-group-item-action list-group-item-warning" -->
         {{item}}
       </a>
     
      </div>

</template>
<style scoped>

</style>