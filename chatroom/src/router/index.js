import {createRouter,createWebHistory} from "vue-router";
import com1 from "../views/com1.vue";
import com2 from "../views/com2.vue";

const router = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:"/com1",
      components:{
        view:com1
      }
    },
    {
      path:"/com2",
      components:{
        view:com2
      }
    }
  ]
});

export default router