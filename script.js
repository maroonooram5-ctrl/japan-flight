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
        "히로시마(HIJ)",
        "오카야마(OKJ)"
    ],
    "시코쿠": [
        "다카마쓰(TAK)",
        "마쓰야마(MYJ)"
    ],
    "큐슈": [
        "후쿠오카(FUK)",
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

function searchFlight(){

    const departure=document.getElementById("departure").value;
    const arrival=airport.value;
    const depart=document.getElementById("departDate").value;
    const ret=document.getElementById("returnDate").value;
    const price=document.getElementById("price").value;

    document.getElementById("result").style.display="block";

    document.getElementById("result").innerHTML=`

<h2>검색 결과</h2>

<div class="card">

<h3>진에어</h3>

<p>${departure} → ${arrival}</p>

<p>${depart} ~ ${ret}</p>

<p class="price">179,000원</p>

</div>

<div class="card">

<h3>에어서울</h3>

<p>${departure} → ${arrival}</p>

<p>${depart} ~ ${ret}</p>

<p class="price">184,000원</p>

</div>

<div class="card">

<h3>티웨이항공</h3>

<p>${departure} → ${arrival}</p>

<p>${depart} ~ ${ret}</p>

<p class="price">193,000원</p>

</div>

`;

}
