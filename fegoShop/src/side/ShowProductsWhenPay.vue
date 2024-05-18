<script setup>
  import {ref,watch,computed,onMounted,inject,provide} from "vue";
  import store from "@/store/store.js";
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";
  import {showModal,hideModal,getData} from "@/functions.js";
  import * as yup from "yup"

  let props = defineProps(['data']);

  let data = ref({});

  watch(()=>props.data,
    (newVal)=>{
      data.value = newVal
    }
  )
</script>

<template>
  <div class="modal fade" id="ShowProductsWhenPay" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">購買明細</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <table>
          <thead>
            <tr>
              <td>名字</td>
              <td>圖片</td>
              <td>單價</td>
              <td>數量</td>
              <td>總價</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,idx) in data">
              <td>{{item.product.title}}</td>
              <td><img :src="`${item.product.imageUrl}`" alt=""></td>
              <td>{{item.product.price}}</td>
              <td>{{item.qty}}</td>
              <td>{{item.final_total}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>
<style scoped>
  table{
    width:100%;
    border-collapse:collapse;
    border:1px solid black;
  }
  td,th{
    border:1px solid black;
    padding:5px 8px;
  }
  img{
    width:100px;
    object-fit:contain;
  }
</style>