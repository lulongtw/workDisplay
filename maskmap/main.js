let data = {};
let countySelector = document.querySelector("[name='county']");
let townSelector = document.querySelector("[name='town']");
let pharmacyWrap = document.querySelector(".pharmacyWrap");
let main = document.querySelector("main");

async function getData() {
  try {
    let temp = await axios.get(
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json"
    );

    for (let item of temp.data.features) {
      if (data[item.properties.county]) {
        if (data[item.properties.county][item.properties.town]) {
          data[item.properties.county][item.properties.town].push(item);
        } else {
          data[item.properties.county][item.properties.town] = [];
          data[item.properties.county][item.properties.town].push(item);
        }
      } else {
        data[item.properties.county] = {};
        data[item.properties.county][item.properties.town] = [];
        data[item.properties.county][item.properties.town].push(item);
      }
    }
    // console.log(data);
  } catch (error) {
    console.error("shit", error);
  }
}
window.onload = async () => {
  await getData();
  refreshCounty();
};

function refreshCounty() {
  for (let key in data) {
    countySelector.innerHTML += `
      <option value='${key}'>${key}</option>
    `;
  }
  let firstOption = countySelector.options[0];
  refreshTown(firstOption.value);
}

countySelector.onchange = (e) => {
  refreshTown(e.target.value);
};

function refreshTown(county) {
  townSelector.innerHTML = "";
  for (let key in data[county]) {
    townSelector.innerHTML += `
    <option value='${key}'>${key}</option>
    `;
  }
  let firstOption = townSelector.options[0];
  refreshWrap(firstOption.value);
}

townSelector.onchange = (e) => {
  refreshWrap(e.target.value);
};

function refreshWrap(towns) {
  pharmacyWrap.innerHTML = "";
  let currentCounty = countySelector.value;

  for (let item of data[currentCounty][towns]) {
    let table = getTable(item.properties.available);
    pharmacyWrap.innerHTML += `
      <div class="pharmacy" data-lat="${
        item.geometry.coordinates[1]
      }" data-lnt="${item.geometry.coordinates[0]}">
        <div>${item.properties.name}</div>
        <div>${item.properties.phone}</div>
        <div>${item.properties.address}</div>
        <div>${
          item.properties.mask_adult + item.properties.mask_child
        }個口罩</div>
        ${table.outerHTML}
      </div>
    `;
  }
  refreshMap(data[currentCounty][towns]);
}

function getTable(time) {
  let table = document.createElement("table");
  table.innerHTML = `
<tr>
<td></td>
<td>一</td>
<td>二</td>
<td>三</td>
<td>四</td>
<td>五</td>
<td>六</td>
<td>日</td>
</tr>
`;
  let tr;
  let ready;
  let noon = 0;

  for (let item of time) {
    if (item == "五") {
      ready = true;
    }
    if (item == "一") {
      tr = document.createElement("tr");
      let td = document.createElement("td");
      // if (noon==0){
      //   td.textContent = "上午"
      // }
      switch (true) {
        case noon == 0:
          td.textContent = "上午";
          noon++;
          break;
        case noon == 1:
          td.textContent = "中午";
          noon++;
          break;
        default:
          td.textContent = "晚上";
      }
      tr.appendChild(td);
    }
    if (item == "看" || item == "休") {
      let td = document.createElement("td");
      td.classList.add(item == "看" ? "green" : "red");
      tr.appendChild(td);
    }
    if (ready) {
      table.appendChild(tr);
      ready = false;
    }
  }

  return table;
}

pharmacyWrap.onclick = (e) => {
  let crds;
  crds = e.target.className=="pharmacy"?[e.target.dataset.lat, e.target.dataset.lnt]:getDataset(e.target)
  zoomMap(crds)
}

function getDataset(elm){
  while (elm.parentNode.className!="pharmacy"){
    elm = elm.parentNode
  }
  return [elm.parentNode.dataset.lat,elm.parentNode.dataset.lnt]
  //要return elm.parentNode 而不是elm而已  因為檢查是檢查e.parerntNode
}



async function zoomMap(crds) {
  let currentCounty = countySelector.value;
  let currentTown = townSelector.value;
  let lst = data[currentCounty][currentTown];

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  let map = new Map(document.querySelector("main"), {
    zoom: 18,
    center: { lat: Number(crds[0]), lng: Number(crds[1]) },
    mapId: "DEMO_MAP_ID",
  });

  for (let item of lst) {
    if (
      item.geometry.coordinates[1] == crds[0] &&
      item.geometry.coordinates[0] == crds[1]
    ) {
      let marker = new AdvancedMarkerView({
        map: map,
        position: {
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0],
        },
        title: item.properties.name,
      });
    } else {
      let div = document.createElement("div");
      div.style.color = "red";
      div.style.fontSize = "30px";
      div.innerHTML = '<i class="fa-solid fa-house-chimney-medical"></i>';
      let marker = new AdvancedMarkerView({
        map: map,
        position: {
          lat: item.geometry.coordinates[1],
          lng: item.geometry.coordinates[0],
        },
        title: item.properties.name,
        content: div,
      });
    }
  }
}


async function refreshMap(lst) {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  let map = new Map(document.querySelector("main"), {
    zoom: 15,
    center: {
      lat: lst[0].geometry.coordinates[1],
      lng: lst[0].geometry.coordinates[0],
    },
    mapId: "DEMO_MAP_ID",
  });
  for (let item of lst) {
    let div = document.createElement("div");
    div.style.color = "red";
    div.style.fontSize = "30px";
    div.innerHTML = '<i class="fa-solid fa-house-chimney-medical"></i>';
    let marker = new AdvancedMarkerView({
      map: map,
      position: {
        lat: item.geometry.coordinates[1],
        lng: item.geometry.coordinates[0],
      },
      title: item.properties.name,
      content: div,
    });
  }
}
