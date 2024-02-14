let height = document.querySelector("#height");
let weight = document.querySelector("#weight");
let seeResult = document.querySelector(".seeresult");
let result = document.querySelector(".result")
let button = document.querySelector(".button");
let recordWrap = document.querySelector(".recordwrap");
let delall = document.querySelector(".delall")
let data = JSON.parse(localStorage.getItem("work")) || [];



window.onload = function () {
	refreshMain(data);
  window.addEventListener("keydown", (e)=>{
		if (e.key=="Enter"){
			getInfo(data)
		}
	});
};

seeResult.addEventListener("click", getInfo);

button.addEventListener("click",restore);

weight.onfocus = function(e){
	e.target.type="number";
}
height.onfocus = function(e){
	e.target.type="number"
}

recordWrap.addEventListener("click",delSingle);

delall.addEventListener("click",delAll);


function restore(){
	seeResult.style.display = "block";
	result.style.display = "none";
	height.value = "";
	weight.value = "";
}

function getInfo() {
  if (checked()) {
    let bmi = getBMI(height, weight);
    let text = getRemarkandColor(bmi)[0];
    let time = getTime();
		let color = getRemarkandColor(bmi)[1];
    let newdata = { 
			remark: text,
			bmi:bmi,
			weight:weight.value,
			height:height.value,
			date:time,
			color:color
		};
		data.push(newdata);
		refreshResult(newdata);
		refreshMain(data);
		toLocal(data);
  }
}


function checked(){
	let h_value = parseInt(height.value);//要另立變數，否則在height.value時 第三個if判斷會被污染
	let w_value = parseInt(weight.value);
	if (!h_value || h_value>300 || h_value<=0){
		height.type="text"//每次都忘
		height.value = "他媽給我"
		if (h_value>300 || h_value<=0){
			height.value = "姚明也沒超過300"
		}
	}
	if (!w_value || w_value>300 || w_value<=0){	
		weight.type="text"
		weight.value = "認真輸入"
		if (w_value>300 || w_value<=0){
			weight.value = "過300你認真?"
		}
	}
	if (h_value&&w_value){
		return true;
	}else{
		return false;
	}
}

function getBMI(h,w){
	h = parseInt(h.value);
	w = parseInt(w.value);
	let bmi = (w/((h*0.01)**2)).toFixed(2);
	return bmi
}
function getRemarkandColor(bmi){
	switch (true){
		case bmi <=18:
			return ["過輕","var(--blue)"]
		case bmi >18 && bmi <=25:
			return ["理想","var(--green)"]
		case bmi>25 && bmi <=30:
			return ["過重","var(--o1)"]
		case bmi>30 && bmi <=35:
			return ["輕度肥胖","var(--o2)"]
		case bmi>35 && bmi <=40:
			return ["中度肥胖","var(--o3)"]
		case bmi >40 :
			return ["嚴重優秀","var(--o4)"]
		}
}
function getTime(){
	let date = new Date();
	let day = date.getDate();
	let month = date.getMonth()+1;
	let year = date.getFullYear();
	return [day,month,year]
}


function refreshResult(newdata){
	seeResult.style.display = "none";
	result.style.display = "flex";
	let digit = document.querySelector(".digit");
	let text = document.querySelector(".text");
	digit.textContent = newdata.bmi;
	text.textContent = newdata.remark;
	result.style.borderColor = newdata.color;
	result.style.color = newdata.color;
	button.style.backgroundColor = newdata.color;
}

function refreshMain(data){
	recordWrap.innerHTML = ""
	for (let i=0;i<data.length;i++){
		recordWrap.innerHTML+= `
			<div class="record" style="border-color:${data[i].color}">
				<div class="remark">${data[i].remark}</div>
				<div class="bmi"><span>BMI</span>${data[i].bmi}</div>
				<div class="weight"><span>weight</span>${data[i].weight}KG</div>
				<div class="height"><span>height</span>${data[i].height}CM</div>
				<div class="date">${data[i].date[0]}-${data[i].date[1]}-${data[i].date[2]}</div>
				<div class="del" data-idx="${i}">X</div>
			</div>
		`
	}
	
}
function toLocal(data){
	let localData = JSON.stringify(data);
	localStorage.setItem("work",localData);
}

function delSingle(e){
	if (e.target.className=="del"){
		let idx = e.target.dataset.idx;
		data.splice(idx,1);
		refreshMain(data);
		toLocal(data)
	}

}

function delAll(){
	let response = confirm("刪除全部，你確?");
	if (response){
		data = [];
		refreshMain(data);
		toLocal(data)
	}

}