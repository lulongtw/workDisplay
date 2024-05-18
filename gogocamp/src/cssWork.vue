<script setup>
  import {onMounted} from "vue";
  let hrefLink = ["rws.html","balancesheet.html","scroll.html","magzine.html","myprofolio.html",'vueCssDist/index.html']
  let picLink = ["RWSPic.png",'balansheetPic.png','jstechPic.png','magzinPic.png','prepolioPic.png','vueCss.png']
  let gitLink = ["blob/main/rws.html","blob/main/balancesheet.html","blob/main/scroll.html","blob/main/magzine.html","blob/main/myprofolio.html","tree/main/vueCss"]
  

</script>

<template>
  <div class="workWrap">
    <a v-for="(item,key) in picLink" :key="key"
      :href="`https://lulongtw.github.io/workDisplay/${hrefLink[key]}`"
      target="_blank"
      class="item"
      :style="`background-image: url('https://lulongtw.github.io/workDisplay/snapshot/${item}');`"
    >
    <a class="description" :href="`https://github.com/lulongtw/workDisplay/${gitLink[key]}`" target="_blank">
      <div class="text">{{'切版練習'+key}}</div>
      <div class="text">&lt;{{'切版練習'+key+'gitlink'}}/&gt;</div>
    </a>
  </a>
  </div>
</template>

<style>
.workWrap {
  margin-top:30px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
  background: linear-gradient(180deg, rgb(217, 217, 217) 0%, transparent 100%);
  justify-content: center;
  border-radius: 10px;

}
.item {
  width: 30%;
  height: 300px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: green;
  position: relative;
  overflow:hidden;
}
.description{
  padding:10px 30px;
  box-sizing:border-box;
  background-color: rgba(217,217,217,0.7);
  position:absolute;
  bottom:-100px;
  width:100%;
  text-align: center;
  transition: bottom 0.3s;
}

.item:hover .description{
  bottom:0;
}

.description:hover .text{
  font-weight: 800;
  color:rgb(127, 104, 0)
}
a{
  color:inherit;
  text-decoration: none;
}
@media (max-width:1200px){
  .item{
    width:45%;
  }
  .workWrap{
    gap:30px;
  }
}
@media(max-width:1000px){
  .item{
    width:80%;
  }
}

</style>
