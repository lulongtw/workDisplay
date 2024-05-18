<script setup>
  import {useRouter} from "vue-router";
  import {Modal} from "bootstrap";

  import {hideModal} from "@/functions.js"
  let router = useRouter()

  function goSeller(){
    hideModal('#GoToSellerModal')
    router.push('/sellerMain')
  }
</script>
<template>  
  <div class="modal fade" id="GoToSellerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        要去哪邊
      </div>
      <div class="modal-footer">
        <button @click="router.push('/buyerShop')" type="button" class="btn btn-secondary" data-bs-dismiss="modal">超商首頁</button>
        <button @click="goSeller" type="button" class="btn btn-primary" data-bs-dismiss="modal">登入後台</button>
      </div>
    </div>
  </div>
</div>


</template>
<style scoped>

</style>