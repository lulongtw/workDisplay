import "./del.css";
//使用npm要import引入路徑  不能直接在src上寫程式內部路徑
import clock from "./assets/icons_clock.png"
import pin from   "./assets/icons_pin.png"
import phone from   "./assets/icons_phone.png"
import tag from  "./assets/icons_tag.png"
import mark from "./assets/icons_down_blue.png"



let res;
let select = document.querySelector("select");
let distWrap = document.querySelector(".distWrap");
let data = {};
let navs = document.querySelectorAll(".nav");
let mainTitle = document.querySelector(".mainTitle");
let pages = document.querySelector(".pages");
let currentPage = 8;
let currentDist = "岡山區";
let prev = document.querySelector(".prev");
let next = document.querySelector(".next");
let lines = document.querySelectorAll(".line")

let img = new Image();
img.src = mark;
lines[0].appendChild(img)

// <div class="line"><img src="./assets/icons_down_blue.png"></div>

window.onload = async () => {
  try {
    res = await axios.get("https://api.kcg.gov.tw/api/service/get/9c8e1450-e833-499c-8320-29b36b7ace5c");
    res = res.data.data.XML_Head.Infos.Info;

    for (let i=0;i<res.length;i++) {

      let distName = codeToName(res[i].Zipcode);
      if (!data[distName]) {
        data[distName] = [];
        data[distName].push(res[i]);
      } else {
        data[distName].push(res[i]);
      }
    }

    refreshSelect();
    refreshMain(currentDist, currentPage);
    refreshPages(currentDist);
  } catch (error) {
    console.error("shit", error);
  }
};

function refreshSelect() {
  for (let key in data) {
    select.innerHTML += `<option value="${key}">${key}</option>`;
  }
}

select.addEventListener("change", chooseDist);

function chooseDist(e) {
  refreshMain(e.target.value, 8);
}

function refreshMain(dist, page) {
  currentDist = dist;
  currentPage = page;
  refreshPages(dist);
  mainTitle.textContent = dist;
  distWrap.innerHTML = "";
  let notFreeIdx = [];

  for (let i = page - 8; i < page && i < data[dist].length; i++) {
    let ticketInfo;
    if (
      data[dist][i].Ticketinfo == "" ||
      data[dist][i].Ticketinfo == "免費" ||
      data[dist][i].Ticketinfo == "免費入園"
    ) {
      ticketInfo = "免費";
    } else {
      ticketInfo = "點我更多";
      notFreeIdx.push({
        idx: i % 8,
        info: data[dist][i].Ticketinfo,
      });
    }
    distWrap.innerHTML += `
    <div class="view">
    <div class="pic" style="background-image:url(${data[dist][i].Picture1})">
      <div class="picName">${data[dist][i].Name}</div>
      <div class="dist">${codeToName(data[dist][i].Zipcode)}</div>
    </div>
    <div class="des">
      <div class="smallPic"><img src="${clock}"></div>
      <div class="time">${data[dist][i].Opentime}</div>
      <div class="smallPic"><img src="${pin}"></div>
      <div class="location">${data[dist][i].Add}</div>
      <div class="smallPic"><img src="${phone}"></div>
      <div class="phone">${data[dist][i].Tel}</div>
      <div class="smallPicLast"><img src="${tag}"></div>
      <div class="ticket">${ticketInfo}</div>
    </div>
  </div>
    `;
  }
  let tickets = document.querySelectorAll(".ticket");
  notFreeIdx.forEach(item=>{
    let div = document.createElement("div");
    div.textContent = item.info;
    div.classList.add("notFree");
    document.body.appendChild(div);
    tickets[item.idx].onclick = (e) => {
      div.style.display = "block";
      div.style.left = e.clientX + "px";
      div.style.top = e.pageY + "px";
    };
  })

}
window.onclick = (e) => {
  if (e.target.className != "ticket") {
    let toDel = document.querySelectorAll(".notFree");
    if (toDel) {
      toDel.forEach(item=>{
        item.style.display = "none";
      })
      // for (item of toDel) {
      //   item.style.display = "none";
      // }
    }
  }
};


navs.forEach(item=>{
  let a = item.textContent;
  item.onclick = ()=>{
    refreshMain(a, 8);
  }
})



// for (let i=0;i<navs.length;i++) {
//   let a = navs[i].textContent;
//   navs[i].onclick = () => {
//     refreshMain(a, 8);
//     //不能直接item.textContent@@ why??
//   };
// }

function refreshPages(dist) {
  pages.innerHTML = "";
  let pageAmouts = Math.ceil(data[dist].length / 8);
  for (let i = 0; i < pageAmouts; i++) {
    let span = document.createElement("span");
    span.textContent = i+1;
    // span.onclick = jumpToPage(dist,i+1);//這樣會直接執行 會無限遞迴
    span.addEventListener("click",()=>jumpToPage(dist,i+1))
    pages.appendChild(span)
    
    // pages.innerHTML += `<span onclick='jumpToPage("${dist}",${i + 1})'>${
    //   i + 1
    // }</span>`;
  }
}
function jumpToPage(dt, pg) {
  refreshMain(dt, pg * 8);
  currentPage = pg * 8;
}

prev.onclick = () => {
  currentPage -= 8;
  if (currentPage <= 8) {
    currentPage = 8;
  }
  refreshMain(currentDist, currentPage);
};
next.onclick = () => {
  currentPage += 8;
  if (currentPage / 8 > Math.ceil(data[currentDist].length / 8)) {
    currentPage = Math.ceil(data[currentDist].length / 8) * 8;
  }
  refreshMain(currentDist, currentPage);
};

function codeToName(code) {
  switch (true) {
    case code == "800":
      return "新興區";
    case code == "801":
      return "前金區";
    case code == "802":
      return "苓雅區";
    case code == "803":
      return "鹽埕區";
    case code == "804":
      return "鼓山區";
    case code == "805":
      return "旗津區";
    case code == "806":
      return "前鎮區";
    case code == "807":
      return "三民區";
    case code == "811":
      return "楠梓區";
    case code == "812":
      return "小港區";
    case code == "813":
      return "左營區";
    case code == "814":
      return "仁武區";
    case code == "815":
      return "大社區";
    case code == "817":
      return "東沙群島";
    case code == "819":
      return "南沙群島";
    case code == "820":
      return "岡山區";
    case code == "821":
      return "路竹區";
    case code == "822":
      return "阿蓮區";
    case code == "823":
      return "田寮區";
    case code == "824":
      return "燕巢區";
    case code == "825":
      return "橋頭區";
    case code == "826":
      return "梓官區";
    case code == "827":
      return "彌陀區";
    case code == "828":
      return "永安區";
    case code == "829":
      return "湖內區";
    case code == "830":
      return "鳳山區";
    case code == "831":
      return "大寮區";
    case code == "832":
      return "林園區";
    case code == "833":
      return "鳥松區";
    case code == "840":
      return "大樹區";
    case code == "842":
      return "旗山區";
    case code == "843":
      return "美濃區";
    case code == "844":
      return "六龜區";
    case code == "845":
      return "內門區";
    case code == "846":
      return "杉林區";
    case code == "847":
      return "甲仙區";
    case code == "848":
      return "桃源區";
    case code == "849":
      return "那瑪夏區";
    case code == "851":
      return "茂林區";
    case code == "852":
      return "茄萣區";
    default:
      console.log(code);
  }
}
