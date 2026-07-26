const airports = {
    "간사이": [
        "오사카(KIX)",
        "고베(UKB)"
    ],
    "간토": [
        "도쿄(나리타 NRT)",
        "도쿄(하네다 HND)"
    ],
    "주부": [
        "나고야(NGO)"
    ],
    "홋카이도": [
        "삿포로(CTS)"
    ],
    "주고쿠": [
        "히로시마(HIJ)"
    ],
    "시코쿠": [
        "다카마쓰(TAK)",
        "마쓰야마(MYJ)"
    ],
    "큐슈": [
        "후쿠오카(FUK)",
        "기타큐슈(KKJ)",
        "가고시마(KOJ)",
        "미야자키(KMI)",
        "오이타(OIT)",
        "구마모토(KMJ)",
        "나가사키(NGS)"
    ],
    "오키나와": [
        "나하(OKA)"
    ]
};
const openJawMap = {

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

region.addEventListener("change",updateAirport);

updateAirport();
const tripType = document.getElementById("tripType");
const returnAirportBox = document.getElementById("returnAirportBox");
const returnAirport = document.getElementById("returnAirport");

function updateReturnAirport(){

    returnAirport.innerHTML = "";

    airports[region.value].forEach(function(name){

        const option = document.createElement("option");
        option.textContent = name;
        returnAirport.appendChild(option);

    });

}

tripType.addEventListener("change", function(){

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
    const flights = [
    {
        airline:"진에어",
        price:179000,
        url:"https://www.jinair.com"
    },
    {
        airline:"에어서울",
        price:184000,
        url:"https://flyairseoul.com"
    },
    {
        airline:"티웨이항공",
        price:193000,
        url:"https://www.twayair.com"
    },
    {
        airline:"제주항공",
        price:214000,
        url:"https://www.jejuair.net"
    },
    {
    airline:"에어로케이",
    price:201000,
    url:"https://www.aerok.com"
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

<p>출발 : ${departure}</p>

<p>도착 : ${arrival}</p>

<p>귀국 : ${returnAirportValue}</p>

<p>${depart} ~ ${ret}</p>

<div class="price">${f.price.toLocaleString()}원</div>

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
