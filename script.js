const airports = {
    "전체": [
        "CTS(삿포로)",
        "NRT(도쿄)",
        "IBR(이바라키)",
        "NGO(나고야)",
        "FSZ(시즈오카)",
        "KIX(오사카)",
        "UKB(고베)",
        "HIJ(히로시마)",
        "YGJ(요나고)",
        "TAK(다카마쓰)",
        "MYJ(마쓰야마)",
        "TKS(도쿠시마)",
        "FUK(후쿠오카)",
        "KKJ(기타큐슈)",
        "HSG(사가)",
        "KMJ(구마모토)",
        "OIT(오이타)",
        "KOJ(가고시마)",
        "OKA(나하)"
    ],

    "홋카이도": [
        "CTS(삿포로)"
    ],

    "간토": [
        "NRT(도쿄)",
        "IBR(이바라키)"
    ],

    "주부": [
        "NGO(나고야)",
        "FSZ(시즈오카)"
    ],

    "간사이": [
        "KIX(오사카)",
        "UKB(고베)"
    ],

    "주고쿠": [
        "HIJ(히로시마)",
        "YGJ(요나고)"
    ],

    "시코쿠": [
        "TAK(다카마쓰)",
        "MYJ(마쓰야마)",
        "TKS(도쿠시마)"
    ],

    "큐슈": [
        "FUK(후쿠오카)",
        "KKJ(기타큐슈)",
        "HSG(사가)",
        "KMJ(구마모토)",
        "OIT(오이타)",
        "KOJ(가고시마)"
    ],

    "오키나와": [
        "OKA(나하)"
    ]
};
const openJawMap = {

    // 간토
    "NRT(도쿄)": ["NRT(도쿄)", "IBR(이바라키)"],
    "IBR(이바라키)": ["IBR(이바라키)", "NRT(도쿄)"],

    // 주부
    "NGO(나고야)": ["NGO(나고야)", "FSZ(시즈오카)", "KIX(오사카)"],
    "FSZ(시즈오카)": ["FSZ(시즈오카)", "NGO(나고야)", "NRT(도쿄)", "IBR(이바라키)", "KIX(오사카)"],

    // 간사이
    "KIX(오사카)": ["KIX(오사카)", "UKB(고베)", "NGO(나고야)", "FSZ(시즈오카)"],
    "UKB(고베)": ["UKB(고베)", "KIX(오사카)"],

    // 주고쿠
    "HIJ(히로시마)": ["HIJ(히로시마)", "YGJ(요나고)", "TAK(다카마쓰)"],
    "YGJ(요나고)": ["YGJ(요나고)", "HIJ(히로시마)"],

    // 시코쿠
    "TAK(다카마쓰)": ["TAK(다카마쓰)", "MYJ(마쓰야마)", "TKS(도쿠시마)", "HIJ(히로시마)"],
    "MYJ(마쓰야마)": ["MYJ(마쓰야마)", "TAK(다카마쓰)", "TKS(도쿠시마)"],
    "TKS(도쿠시마)": ["TKS(도쿠시마)", "TAK(다카마쓰)", "MYJ(마쓰야마)"],

    // 큐슈
    "FUK(후쿠오카)": ["FUK(후쿠오카)", "KKJ(기타큐슈)", "HSG(사가)", "KMJ(구마모토)", "OIT(오이타)", "KOJ(가고시마)"],
    "KKJ(기타큐슈)": ["KKJ(기타큐슈)", "FUK(후쿠오카)", "HSG(사가)", "KMJ(구마모토)", "OIT(오이타)", "KOJ(가고시마)"],
    "HSG(사가)": ["HSG(사가)", "FUK(후쿠오카)", "KKJ(기타큐슈)", "KMJ(구마모토)", "OIT(오이타)", "KOJ(가고시마)"],
    "KMJ(구마모토)": ["KMJ(구마모토)", "FUK(후쿠오카)", "KKJ(기타큐슈)", "HSG(사가)", "OIT(오이타)", "KOJ(가고시마)"],
    "OIT(오이타)": ["OIT(오이타)", "FUK(후쿠오카)", "KKJ(기타큐슈)", "HSG(사가)", "KMJ(구마모토)", "KOJ(가고시마)"],
    "KOJ(가고시마)": ["KOJ(가고시마)", "FUK(후쿠오카)", "KKJ(기타큐슈)", "HSG(사가)", "KMJ(구마모토)", "OIT(오이타)"],

    // 홋카이도
    "CTS(삿포로)": ["CTS(삿포로)"],

    // 오키나와
    "OKA(나하)": ["OKA(나하)"]

};
const region = document.getElementById("region");
const airport = document.getElementById("airport");

function updateAirport(){

    airport.innerHTML="";

    airports[region.value].forEach(function(name){

        const option=document.createElement("option");
        option.textContent=name;
        airport.appendChild(option);

    });

}

region.addEventListener("change", function(){

    updateAirport();
airport.addEventListener("change", function(){

    if(tripType.value==="오픈조"){
        updateReturnAirport();
    }

});
    if(tripType.value==="오픈조"){
        updateReturnAirport();
    }

});
updateAirport();
const tripType = document.getElementById("tripType");
const returnAirportBox = document.getElementById("returnAirportBox");
const returnAirport = document.getElementById("returnAirport");
const returnRegion = document.getElementById("returnRegion");
function updateReturnAirport(){

    returnAirport.innerHTML = "";

    airports[returnRegion.value].forEach(function(name){

        const option = document.createElement("option");
        option.textContent = name;
        returnAirport.appendChild(option);

    });

}

tripType.addEventListener("change", function(){
returnRegion.addEventListener("change", function () {
    updateReturnAirport();
});
    if(tripType.value==="오픈조"){

        returnAirportBox.style.display="block";
        updateReturnAirport();

    }else{

        returnAirportBox.style.display="none";

    }

});
function searchFlight() {

    const departure = document.getElementById("departure").value;
    const arrival = airport.value;
    const returnAirportValue = document.getElementById("returnAirport")?.value || arrival;
    const depart = document.getElementById("departDate").value;
    const ret = document.getElementById("returnDate").value;
    const priceFilter = document.getElementById("price").value;
    if(depart===""){
        alert("출국일을 선택하세요.");
        return;
    }

    if(ret===""){
        alert("귀국일을 선택하세요.");
        return;
    }

    if(new Date(ret) < new Date(depart)){
        alert("귀국일은 출국일 이후여야 합니다.");
        return;
    }
    const result = document.getElementById("result");
result.style.display = "block";
    const flights = [

    {
        airline: "에어로케이",
        price: 201000,
        time: "2시간 00분",
        url: "https://www.aerok.com"
    },

    {
        airline: "제주항공",
        price: 214000,
        time: "2시간 05분",
        url: "https://www.jejuair.net"
    },

    {
        airline: "진에어",
        price: 219000,
        time: "2시간 10분",
        url: "https://www.jinair.com"
    },

    {
        airline: "티웨이항공",
        price: 226000,
        time: "2시간 10분",
        url: "https://www.twayair.com"
    },

    {
        airline: "이스타항공",
        price: 232000,
        time: "2시간 15분",
        url: "https://www.eastarjet.com"
    },

    {
        airline: "에어서울",
        price: 239000,
        time: "2시간 10분",
        url: "https://www.flyairseoul.com"
    },

    {
        airline: "에어부산",
        price: 243000,
        time: "2시간 15분",
        url: "https://www.airbusan.com"
    }

];

    let result = flights;

    if(priceFilter==="20만원 이하"){
        result = flights.filter(f=>f.price<=200000);
    }

    if(priceFilter==="30만원 이하"){
        result = flights.filter(f=>f.price<=300000);
    }

    let html="<h2>검색 결과</h2>";

    if(result.length===0){

        html+="<div class='card'><h3>검색 결과가 없습니다.</h3></div>";

    }else{

        result.sort((a,b)=>a.price-b.price);

result.forEach((f,index)=>{

    html+=`

<div class="card">

${index===0 ? '<div class="badge">🏷️ 최저가</div>' : ''}

<div class="airline">✈️ ${f.airline}</div>
<p>비행시간 : ${f.time}</p>

<p>여정 : ${tripType.value==="왕복" ? "왕복" : "오픈조"}</p>

<p>출발 : ${departure}</p>

<p>도착 : ${arrival}</p>

<p>귀국 : ${returnAirportValue}</p>

<p>일정 : ${depart} ~ ${ret}</p>

<div class="price">
    실제 결제금액 : ${f.price.toLocaleString()}원
</div>
<div class="booking">
    <a href="${f.url}" target="_blank">예약하러 가기</a>
</div>
<div class="booking">
    <a href="${f.url}" target="_blank">
        공식 홈페이지 예약
    </a>
</div>

</div>

`;

});
    }

    document.getElementById("result").style.display="block";
    document.getElementById("result").innerHTML=html;

}
