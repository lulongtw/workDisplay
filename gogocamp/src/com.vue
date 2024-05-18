<script setup>
import { onMounted, ref } from "vue";

let props = defineProps({
  title: String,
  content: String,
});

let wrap = ref(null);
let titleCom = ref(null);
let contentCom = ref(null);

onMounted(() => {
  if (wrap.value) {
    let observer1 = new IntersectionObserver(
      (entries)=>{
        entries.forEach(entry=>{
          if (entry.isIntersecting){
            entry.target.style.opacity = 1;
          }
        })
      },
      { threshold: 0.1 }
    );
    observer1.observe(wrap.value);
  }

  if (titleCom.value&&contentCom.value){
    let observer2 = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.style.left = "0px";
          entry.target.style.opacity = 1;
        }
      })
    },{
      threshold:0.2
    }) ;
    observer2.observe(titleCom.value);
    observer2.observe(contentCom.value)
  }

  let wraps = document.querySelectorAll(".wrap");
  for (let i=0;i<wraps.length;i+=2){
    wraps[i].style.backgroundColor = "rgb(217, 217, 217)"
  }
});

</script>

<template>
  <div ref="wrap" class="wrap">
    <div ref="titleCom" class="title" v-html="props.title">
    </div>
    
    <div ref="contentCom" class="content" v-html="props.content">
      
    </div>
    <div class="show">
      <slot name="product"></slot>
    </div>

  </div>
</template>

<style>
* {
  padding: 0;
  margin: 0;
}
.wrap {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 100px 50px;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}
.title {
  text-align: center;
  font-size: 30px;
  font-weight: 800;

}
.show{
  width:100%;
}
.content {

  width: 100%;
  margin: 0 auto;
  margin-top: 5%;
  text-align:center

}
.title,.content{
  position: relative;
  left:50px;
  opacity: 0;
  transition: left 0.7s,opacity 0.7s;
}
@media(max-width:700px){
  .wrap{
    padding: 100px 20px;
  }
  .content{
    width:90%;
  }
}
</style>
