<script setup>
  import {RouterLink,RouterView} from "vue-router";

</script>

<template>
  <div class="wrap">
    <RouterLink to="/com1">com1</RouterLink>
    <br>
    <RouterLink to="/com2">com2</RouterLink>
    <hr>
    <RouterView name="view" v-slot="{Component}">
      <KeepAlive>
        <component :is="Component"></component>
      </KeepAlive>
    </RouterView>
  </div>

</template>