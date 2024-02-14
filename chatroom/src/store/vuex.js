import {createStore} from "vuex";
import database from "./firebase.js";
import {push,ref,onValue,set} from "firebase/database";

const store = createStore({
  state(){
    return{
      count:0,
      data:{}
    }
  },
  mutations:{
    updtData(state,newVal){
      state.data = newVal
    },
    updtCount(state,newVal){
      state.count = newVal
    }

  },
  actions:{
    sendNewMsg(context,newVal){
      let talkRef = ref(database,"talk");
      let newTalkRef = push(talkRef);
      set(newTalkRef,newVal)
    },
    sendNewCount(context,newVal){
      let countRef = ref(database,"count");
      set(countRef,newVal)
    },
    onValueBase(context){
      let talkRef = ref(database,"talk");
      onValue(talkRef,(snapshot)=>{
        context.commit("updtData",snapshot.val())
      });
      let countRef = ref(database,"count");
      onValue(countRef,(snapshot)=>{
        context.commit("updtCount",snapshot.val())
      })
    },




  }
});

export default store