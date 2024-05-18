<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup";

  import SanTiModal from "@/modal/SanTiModal.vue"


  let data = ref({});
  let toSon = ref();
  let revData = computed(()=>{
    return Object.values(data.value).reverse()
  })

  watch(()=>store.state.sellerProductList,
    (newVal)=>{
      //console.log(newVal);
      data.value = newVal
    }
  )

  onMounted(()=>{
    let url = `/api/:api_path/admin/products/all`;
    let method = 'get'
    store.dispatch('getSellerProductList',{url,method})
  })

  function modalEmerge(act,item){
    toSon.value = {act,item};
    let target = document.querySelector("#SanTiModal");
    let modalDOM = Modal.getOrCreateInstance(target);
    modalDOM.show()
  }
</script>

<template>
  
  <SanTiModal :payload="toSon"></SanTiModal>
  <button @click="modalEmerge('add',{})" type="button" class="btn btn-primary">建立產品</button>
  <table>
    <thead>
      <tr>
        <th>名字</th>
        <th>分類</th>
        <th>描述</th>
        <th>價錢</th>
        <th>啟用狀態</th>
        <th>動作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,idx) in revData" :key="idx">
        <td>{{item.title}}</td>
        <td>{{item.category}}</td>
        <td>{{item.content}}</td>
        <td>{{item.price}}</td>
        <td>{{item.is_enabled?'啟用':'未啟用'}}</td>
        <td>
          <div>
            <button @click="modalEmerge('edit',item)" type="button" class="btn btn-success"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
            edit
          </button>
          <button @click="modalEmerge('del',item)" type="button" class="btn btn-danger"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .25rem; --bs-btn-font-size: .75rem;">
            del
          </button>
          </div>

        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
  table{
    width:100%;
    border-collapse: collapse;
    border:1px solid gray;
    text-align: center;
  }
  th,td{
    border:1px solid gray;
    padding:5px 8px;
  }
  tr>td:last-of-type>div{
    display: flex;
    gap:10px;
  }

</style>