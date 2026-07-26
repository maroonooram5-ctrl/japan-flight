const airports = {
  "간사이": ["KIX", "ITM", "UKB"],
  "간토": ["NRT", "HND"],
  "주부": ["NGO", "FSZ"],
  "홋카이도": ["CTS", "HKD"],
  "주고쿠": ["HIJ", "YGJ"],
  "시코쿠": ["TAK", "MYJ", "TKS"],
  "큐슈": ["FUK", "KKJ", "KMJ", "KOJ"],
  "오키나와": ["OKA"]
};

function searchFlight() {
    document.getElementById("result").style.display = "block";
}
const region = document.getElementById("region");
const airport = document.getElementById("airport");

function updateAirport() {
    airport.innerHTML = "";

    airports[region.value].forEach(code => {
        const option = document.createElement("option");
        option.textContent = code;
        option.value = code;
        airport.appendChild(option);
    });
}

region.addEventListener("change", updateAirport);

updateAirport();
