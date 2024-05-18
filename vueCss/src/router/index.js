import {createRouter,createWebHistory} from "vue-router";
import HomeView from "../view/HomeView.vue";//引入roter跟組件
import AboutView from "../view/AboutView.vue";//引入roter跟組件

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    /*
    (createWebHistory意思是為router提供網頁導航的方式
    vue有提拱兩種導航方式
    一種是像a標籤一樣透過#的Hash模式
    一種就是這個 像網頁/一樣的history模式

    還有透過BASE.URL提供網頁的起始點？？
    想像baseUrl提供目前網頁位址，而RouterLink會到處連來連去
    baseUrl提供像首頁一樣的定位點  應該是吧???
    import.meta.env.BASE_URL: 这是Vite构建工具提供的一个特殊变量，
    用于获取项目的基本URL。基本URL是你的应用程序在服务器上的根路径。
    例如，如果你的应用程序部署在 https://example.com/my-app/，
    那么基本URL就是 /my-app/
    )
    */ 
    routes:[  //導入routes
        {
            path:"/",
            name:"home",
            component:HomeView
        },
        {
            path:"/about",
            name:"about",
            component:AboutView
        }
    ]
})

export default router