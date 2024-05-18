<script setup>
    defineProps({
        msg:{
            type:String,
            required:true
        }
    })
</script>

<template>
    <div class="heaad">
        <div class="props">{{msg}}</div>
        <div>You’ve successfully created a project with 
            <a href="https://vitejs.dev/" target="_blank">Vite</a>
          + <a href="https://vitejs.dev/" target="_blank">Vue 3</a>.
        </div>
    </div>
</template>

<style scoped>
    a{
        color:green;
    }
    .props{
        font-size: 3rem;
        color:greenyellow;
        font-weight:800;
 
    }
    .heaad{
        text-align: center;
       
    }
</style>