// =============================
// 일본 최저 항공권 검색
// Part 1 / 6
// =============================

const REGIONS = {
    "홋카이도": [
        { code: "CTS", name: "삿포로" }
    ],

    "간토": [
        { code: "NRT", name: "도쿄(나리타)" },
        { code: "IBR", name: "이바라키" }
    ],

    "주부": [
        { code: "NGO", name: "나고야" },
        { code: "FSZ", name: "시즈오카" }
    ],

    "간사이": [
        { code: "KIX", name: "오사카(간사이)" },
        { code: "UKB", name: "고베" }
    ],

    "주고쿠": [
        { code: "HIJ", name: "히로시마" },
        { code: "YGJ", name: "요나고" }
    ],

    "시코쿠": [
        { code: "TAK", name: "다카마쓰" },
        { code: "MYJ", name: "마쓰야마" },
        { code: "TKS", name: "도쿠시마" }
    ],

    "큐슈": [
        { code: "FUK", name: "후쿠오카" },
        { code: "KKJ", name: "기타큐슈" },
        { code: "HSG", name: "사가" },
        { code: "KMJ", name: "구마모토" },
        { code: "OIT", name: "오이타" },
        { code: "KOJ", name: "가고시마" }
    ],

    "오키나와": [
        { code: "OKA", name: "나하" }
    ]
};

const OPEN_JAW = {

    NRT: ["IBR"],
    IBR: ["NRT"],

    NGO: ["FSZ", "KIX"],
    FSZ: ["NGO", "NRT", "IBR", "KIX"],

    KIX: ["UKB", "NGO", "FSZ"],
    UKB: ["KIX"],

    HIJ: ["YGJ", "TAK"],
    YGJ: ["HIJ"],

    TAK: ["MYJ", "TKS", "HIJ"],
    MYJ: ["TAK", "TKS"],
    TKS: ["TAK", "MYJ"],

    FUK: ["KKJ", "HSG", "KMJ", "OIT", "KOJ"],
    KKJ: ["FUK", "HSG", "KMJ", "OIT", "KOJ"],
    HSG: ["FUK", "KKJ", "KMJ", "OIT", "KOJ"],
    KMJ: ["FUK", "KKJ", "HSG", "OIT", "KOJ"],
    OIT: ["FUK", "KKJ", "HSG", "KMJ", "KOJ"],
    KOJ: ["FUK", "KKJ", "HSG", "KMJ", "OIT"]

};

const AIRLINES = [
    "제주항공",
    "진에어",
    "티웨이항공",
    "에어부산",
    "이스타항공",
    "에어서울"
];

const departureSelect = document.getElementById("departure");
const regionSelect = document.getElementById("region");
const airportSelect = document.getElementById("airport");
const tripTypeSelect = document.getElementById("tripType");
const returnAirportBox = document.getElementById("returnAirportBox");
const returnAirportSelect = document.getElementById("returnAirport");
const departDate = document.getElementById("departDate");
const returnDate = document.getElementById("returnDate");
const priceSelect = document.getElementById("price");
const resultBox = document.getElementById("results");
const searchBtn = document.getElementById("searchBtn");

function airportLabel(code) {

    for (const region in REGIONS) {

        for (const airport of REGIONS[region]) {

            if (airport.code === code) {
                return `${airport.code} (${airport.name})`;
            }

        }

    }

    return code;
}
// =============================
// Part 2 / 6
// =============================

function populateAirport() {

    airportSelect.innerHTML = "";

    if (regionSelect.value === "ALL") {

        const option = document.createElement("option");
        option.value = "ALL";
        option.textContent = "전체";
        airportSelect.appendChild(option);

        Object.values(REGIONS).forEach(list => {

            list.forEach(airport => {

                const op = document.createElement("option");
                op.value = airport.code;
                op.textContent = airportLabel(airport.code);

                airportSelect.appendChild(op);

            });

        });

    } else {

        REGIONS[regionSelect.value].forEach(airport => {

            const op = document.createElement("option");

            op.value = airport.code;
            op.textContent = airportLabel(airport.code);

            airportSelect.appendChild(op);

        });

    }

    populateReturnAirport();

}

function populateReturnAirport() {

    returnAirportSelect.innerHTML = "";

    if (tripTypeSelect.value === "round") {

        returnAirportBox.style.display = "none";
        return;

    }

    returnAirportBox.style.display = "block";

    const departureAirport = airportSelect.value;

    if (departureAirport === "ALL") {

        const option = document.createElement("option");

        option.value = "ALL";
        option.textContent = "자동 선택";

        returnAirportSelect.appendChild(option);

        return;

    }

    const available = OPEN_JAW[departureAirport] || [];

    if (available.length === 0) {

        const option = document.createElement("option");

        option.textContent = "오픈조 없음";
        option.value = departureAirport;

        returnAirportSelect.appendChild(option);

        return;

    }

    available.forEach(code => {

        const option = document.createElement("option");

        option.value = code;
        option.textContent = airportLabel(code);

        returnAirportSelect.appendChild(option);

    });

}

regionSelect.addEventListener("change", populateAirport);

airportSelect.addEventListener("change", populateReturnAirport);

tripTypeSelect.addEventListener("change", populateReturnAirport);
// =============================
// Part 3 / 6
// =============================

function randomPrice() {

    return Math.floor(Math.random() * 180000) + 120000;

}

function randomTime() {

    return (Math.random() * 2 + 1.5).toFixed(1);

}

function createResult(destination, isOpenJaw = false, returnAirport = null) {

    return {

        airline: AIRLINES[Math.floor(Math.random() * AIRLINES.length)],

        departure: departureSelect.value,

        arrival: destination,

        returnAirport: returnAirport ?? destination,

        type: isOpenJaw ? "오픈조" : "왕복",

        time: randomTime(),

        price: randomPrice()

    };

}

function searchFlights() {

    if (!departDate.value || !returnDate.value) {

        alert("출발일과 귀국일을 선택하세요.");

        return;

    }

    if (departDate.value > returnDate.value) {

        alert("귀국일은 출발일 이후여야 합니다.");

        return;

    }

    let results = [];

    const destination = airportSelect.value;

    if (destination === "ALL") {

        Object.values(REGIONS).forEach(region => {

            region.forEach(airport => {

                results.push(createResult(airport.code));

                if (tripTypeSelect.value === "openjaw") {

                    (OPEN_JAW[airport.code] || []).forEach(open => {

                        results.push(createResult(airport.code, true, open));

                    });

                }

            });

        });

    } else {

        results.push(createResult(destination));

        if (tripTypeSelect.value === "openjaw") {

            (OPEN_JAW[destination] || []).forEach(open => {

                results.push(createResult(destination, true, open));

            });

        }

    }

    const limit = Number(priceSelect.value);

    results = results.filter(item => item.price <= limit);

    results.sort((a, b) => a.price - b.price);

    renderResults(results);

}
// =============================
// Part 4 / 6
// =============================

function renderResults(results) {

    resultBox.innerHTML = "";

    if (results.length === 0) {

        resultBox.innerHTML = `
            <div class="empty">
                검색 결과가 없습니다.
            </div>
        `;

        return;
    }

    results.forEach(item => {

        const card = document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <div class="card-top">

                <div>

                    <div class="airline">
                        ${item.airline}
                    </div>

                    <span class="badge">
                        ${item.type}
                    </span>

                </div>

                <div class="price">
                    ${item.price.toLocaleString()}원
                </div>

            </div>

            <div class="route">

                ${item.departure}
                →
                ${item.arrival}

                ${item.type === "오픈조"
                    ? ` / ${item.returnAirport} → ${item.departure}`
                    : ` / ${item.arrival} → ${item.departure}`}

            </div>

            <div class="info">

                비행시간 : 약 ${item.time}시간<br>

                실제 결제금액 기준<br>

                국내 LCC

            </div>

        `;

        resultBox.appendChild(card);

    });

}

searchBtn.addEventListener("click", searchFlights);
// =============================
// Part 5 / 6
// =============================

function initialize() {

    // 기본값
    regionSelect.value = "ALL";

    populateAirport();

    if (tripTypeSelect.value === "openjaw") {
        returnAirportBox.style.display = "block";
        populateReturnAirport();
    } else {
        returnAirportBox.style.display = "none";
    }

}

function setToday() {

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(today.getMonth() + 1).padStart(2, "0");

    const dd = String(today.getDate()).padStart(2, "0");

    const start = `${yyyy}-${mm}-${dd}`;

    departDate.min = start;
    returnDate.min = start;

}

departDate.addEventListener("change", () => {

    returnDate.min = departDate.value;

    if (returnDate.value && returnDate.value < departDate.value) {
        returnDate.value = "";
    }

});

initialize();

setToday();
