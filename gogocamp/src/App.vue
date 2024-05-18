<script setup>
import com from "./com.vue";
import otherWork from "./otherWork.vue";
import cssWork from "./cssWork.vue";
</script>

<template>
  <com
    :title="'自我介紹'"
    :content="`陳俊嘉，男，<br>
    中正大學傳播系畢業<br>
  在影視幕後工作10年後<br>
  轉職軟體工程師成為下一個工作的理想目標`"
  ></com>

  <com
    :title="`css切版練習`"
    :content="`
    內容包含freecodecamp與六角的切版作業
    `"
  ><template #product><cssWork></cssWork></template></com>

  <com
    :title="`js與vue相關練習`"
    :content="`內容包含六角課程以及彭彭YT練習`"
  ><template #product><otherWork></otherWork></template></com>



  <com
    :title="`到目前為止的程式心得`"
    :content="`
  寫程式就是在解決一連串的問題，<br>
  而且結果會以一種很實際，不含糊，沒有餘地的方式給出相對於原因的回饋<br>
  相較於其他環境中，充滿各種不同變數，跑來影響自己努力的結果<br>
  我很喜歡程式給我說一得一，說二得二的感覺<br>
  `"
  ></com>



  <com
    :title="`其他小事`"
    :content="`<br>
最近習慣兩天做一次運動，運動完就去圖書館學習程式，<br>
每次運動完收操時會重複一段話：<br>
我 陳俊嘉 高雄人，<br>
未來一年內要轉職為電腦工程師。<br>`"
  ></com>
</template>
