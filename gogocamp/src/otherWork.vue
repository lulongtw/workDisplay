<script setup>
import { ref, onMounted } from 'vue';

let hrefLink = ["BMI/newBMI.html", "chatRoomDist/dist/index.html", "maskmap/index.html", "svgpainter.html", "tictactoe.html", "travel/del.html", "fegoShopDist/index.html"];
let picLink = ["BMIPic.png", "chatRoomPic.png", "maskMapPic.png", "painterPic.png", "tictactoePic.png", "travelPic.png", "fegoShopDist.png"];
let gitLink = ["tree/main/BMI", "tree/main/chatroom", "tree/main/maskmap", "blob/main/svgpainter.html", "blob/main/tictactoe.html", "tree/main/travel", "tree/main/fegoShop"];
let title = ["BMI記錄器", "聊天室", "口罩地圖", "向量繪圖", "井字遊戲", "旅遊景點", "肥狗商城"];
let des = ["localStorage紀錄資料", "vuex串接firebase資料庫", "串接googlemapAPI", "svg繪圖", "使用redux與react", "串接高市政府API", '電商網頁'];

let loadingStates = ref(new Array(picLink.length).fill(true));

onMounted(() => {
  picLink.forEach((pic, index) => {
    let img = new Image();
    img.src = `https://lulongtw.github.io/workDisplay/snapshot/${pic}`;
    img.onload = () => {
      loadingStates.value[index] = false;
    };
  });
});
</script>
<template>
  <div class="workWrap">
    <a v-for="(item, key) in picLink" :key="key"
       :href="`https://lulongtw.github.io/workDisplay/${hrefLink[key]}`"
       target="_blank"
       class="item"
    >
      <div v-if="loadingStates[key]" class="spinner"></div>
      <div v-else :style="`background-image: url('https://lulongtw.github.io/workDisplay/snapshot/${item}');background-size:cover;background-position:center`" class="image"></div>
      <a class="description" :href="`https://github.com/lulongtw/workDisplay/${gitLink[key]}`" target="_blank">
        <div class="text">{{ title[key] }}</div>
        <div class="text">&lt;{{ des[key] }}/&gt;</div>
      </a>
    </a>
  </div>
</template>
<style>
.workWrap {
  margin-top: 30px;
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
  position: relative;
  overflow: hidden;
}

.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.spinner::after {
  content: " ";
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  border-top-color: #000;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
 to {transform: rotate(360deg)}
}

.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.description {
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: rgba(217, 217, 217, 0.7);
  position: absolute;
  bottom: -100px;
  width: 100%;
  text-align: center;
  transition: bottom 0.3s;
}

.item:hover .description {
  bottom: 0;
}

.description:hover .text {
  font-weight: 800;
  color: rgb(127, 104, 0);
}

a {
  color: inherit;
  text-decoration: none;
}

@media (max-width: 1200px) {
  .item {
    width: 45%;
  }
  .workWrap {
    gap: 30px;
  }
}

@media (max-width: 1000px) {
  .item {
    width: 80%;
  }
}
</style>

