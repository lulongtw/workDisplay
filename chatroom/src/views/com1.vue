<script setup>
import { msgRef, countRef } from "../firebase.config.js";
import { get, set, onValue ,push,ref as fbref} from "firebase/database";
import {ref as vueref,reactive, onMounted,computed} from "vue";

let name = vueref("");
let content = vueref("")
let data = reactive({});


/*
從不同函式庫import 兩個相同名字的函式  可以用 “函式 as 變數” 引入

這邊重點是await和async
await會讓主程式等非同步程式執行完畢後，再繼續執行
會用到這個是因為
我把img的計數器放到資料庫
在set資料進資料庫時，要決定圖片用哪張
所以用一個getIdx決定
但函式有可能這個會再次進資料庫拿東西，所以要await他
什麼情況會會非同步
就是主程式的data找不到相同name的時候
會執行getNewIdx
getNewIdx進資料庫
重點是get的時候不能用.then
getNewIdx的get和set都要await
我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =

然後這樣用random兩個view com圖片會不一樣
我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =我也不知道為啥= =
*/

async function add() {
  if (name.value && content.value) {
    let newMsgRef = push(msgRef);
    set(newMsgRef, {
      name: name.value,
      content: content.value,
      idx: await getIdx(name.value)
    });
  }
  content.value = "";
}


 function getIdx(name) {
  for (let key of Object.values(data)) {
    if (name === key.name) {
      return key.idx;
    }
  }
  return  getNewIdx(name);
}

async function getNewIdx() {
  const snapshot = await get(countRef);
  let ans = snapshot.val().number + 20;
  // get(countRef).then((snapshot)=>{
  //   let ans = snapshot.val().number + 1;
  // })
  
  // 要用await等他set好  再進行下一步 
  //await會阻止城市進入下一
  await set(countRef, { number: ans });

 
  return ans;
}


function checkIfEnter(e){
  if (e.key=="Enter"){
    add()
  }
}

function whitchSide(nm){
  return nm===name.value?"me":"other"
}

onMounted(()=>{
  window.addEventListener("keydown",checkIfEnter)
  get(msgRef).then((snapshot)=>{
    Object.assign(data,snapshot.val());
  });


  onValue(msgRef,(snapshot)=>{
    Object.assign(data,snapshot.val());
  });
})


  let reversedData = computed(()=>{
    return Object.values(data).reverse()
  })

  function checkLength(e){
    e.target.value = e.target.value.substring(0,20)
    
  }


</script>

<template>
  <div class="wrap">
    <div class="inputWrap">
      <div class="input-group flex-nowrap">
      <input
      @input="checkLength"
      style="text-align:left;"
        v-model="name"
        type="text"
        class="name form-control"
        placeholder="who's"
        aria-label="Username"
        aria-describedby="addon-wrapping"
      />
    </div>
    <div class="input-group mb-3">
      <input
      @input="checkLength"
        v-model="content"
        type="text"
        class="form-control"
        placeholder="speaking?"
        aria-label="Recipient's username"
        aria-describedby="button-addon2"
      />
      <button
        @click="add"
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
       send
      </button>
    </div>

    </div>
    <div class="main">
      <div v-for="key in reversedData" :class="['dialoage',whitchSide(key.name)]" >
        <!-- <img :src="'https://picsum.photos/70?random=1'+key.idx"/> -->
        <img :src="'https://picsum.photos/id/'+key.idx+'/70'"/>
        <div class="textwrap">{{key.name}} said: {{key.content}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
