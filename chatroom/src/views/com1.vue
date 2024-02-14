<script setup>
  import inputCom from "../components/inputCom.vue";
  import nameCom from  "../components/nameCom.vue";
  import roomCom from  "../components/roomCom.vue";

  let name = "com1"
</script>

<template>
  <nameCom :here="name"></nameCom>
  <inputCom ></inputCom>
  <roomCom></roomCom>
</template>