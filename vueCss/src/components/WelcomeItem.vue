<script setup>

</script>

<template>
    <div class="items">
        <div class="pic">
            <slot name="icon"></slot>
        </div>
        <div class="title">
            <slot name="title"></slot>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<style scoped>
    .items{
        display:grid;
        grid-template-columns:70px 1fr;
        grid-template-rows:50px 1fr;    
        align-items: center;  
    }
    .pic{
        text-align: center;
        grid-column:1;
        grid-row:1;
        
    }
    .title{
        line-height:50px;
        grid-column: 2;
        grid-row:1;

    }
    .content{
        grid-column:2;
        grid-row:2;
   
    }
</style>