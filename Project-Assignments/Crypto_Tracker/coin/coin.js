const coinContainer = document.getElementById("coin-container");
const coinImage = document.getElementById("coin-image");
const coinName = document.getElementById("coin-name");
const coinDescription = document.getElementById("coin-description");
const shimmerContainer = document.getElementById("shimmer-container");
const coinRank = document.getElementById("coin-rank");
const coinPrice = document.getElementById("coin-price");
const coinMarketCap = document.getElementById("coin-market-cap");

const chartSection = document.getElementById("chart-section");
const chartContainer = document.getElementById("coinChart");
const button24 = document.getElementById("24");
const button30d = document.getElementById("30d");
const button3m = document.getElementById("3m");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
  },
};

// get the coin-id from url-params:
const urlParam = new URLSearchParams(window.location.search);
const coinId = urlParam.get("id");

// fetching the coin-data:
const fetchCoinsData = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}`,
      options
    );
    const coinData = await response.json();
    displayCoinsData(coinData);
  } catch (error) {
    console.log("Error while fetching coins data", error);
  }
};

const displayCoinsData = (coinData) => {
  coinImage.src = coinData.image.large;
  coinImage.alt = coinData.name;
  coinDescription.textContent = coinData.description.en.split(".")[0];
  coinRank.textContent = coinData.market_cap_rank;
  coinName.textContent = coinData.name;
};

// showing the data:
document.addEventListener("DOMContentLoaded", async () => {
  await fetchCoinsData();
});
