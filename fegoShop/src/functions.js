import axios from "axios";
import {Modal} from "bootstrap";
import store from "@/store/store.js";


let headAPI = import.meta.env.VITE_headAPI;
let myAPI = import.meta.env.VITE_myAPI;

function noCatch(asFn){
  return asFn.catch(err=>{
    console.log('shit',err)
  })
}
function getUrl(url){
  let ans = headAPI + url;
  ans = ans.replace('/:api_path',myAPI);
  return ans
}

async function getData(url,method,toSend){
  let urll = getUrl(url)
  store.commit('toggleIsLoading')
  let res = await noCatch(axios[method](urll,toSend));
  // console.log(res)
  if (res.data.message){
    let stamp = new Date().getTime()
    // console.log({'message':res.data.message,'stamp':stamp})
    store.commit('renewMessages',{'message':res.data.message,'stamp':stamp})
  }
  store.commit('toggleIsLoading')
  return res
}

function showModal(id){
  let target = document.querySelector(id);
  let modalDOM = Modal.getOrCreateInstance(target);
  modalDOM.show()
}
function hideModal(id){
  let target = document.querySelector(id);
  let modalDOM = Modal.getOrCreateInstance(target);
  modalDOM.hide()
}



export {getData,getUrl,showModal,hideModal}
