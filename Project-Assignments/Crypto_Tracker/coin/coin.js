// coin-page container section:
const coinContainer = document.getElementById("coin-container");
const coinImage = document.getElementById("coin-image");
const coinName = document.getElementById("coin-name");
const coinDescription = document.getElementById("coin-description");
const shimmerContainer = document.querySelector(".shimmer-container");
const coinRank = document.getElementById("coin-rank");
const coinPrice = document.getElementById("coin-price");
const coinMarketCap = document.getElementById("coin-market-cap");
// coin-page chart section:
const chartSection = document.getElementById("chart-section");
const ctx = document.getElementById("coinChart");
const buttonContainer = document.querySelector(".button-container button");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
  },
};

// Get the coin-id from url-params:
const urlParam = new URLSearchParams(window.location.search);
const coinId = urlParam.get("id");

// Fetching the coin-data:
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
  coinPrice.textContent = `$${coinData.market_data.current_price.usd.toLocaleString()}`;
  coinMarketCap.textContent = `$${coinData.market_data.market_cap.usd.toLocaleString()}`;

  // Hide shimmer and show coin container
  shimmerContainer.style.display = "none";
  coinContainer.style.display = "block";
};

// Display chart:
const coinChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Price (USD)",
        data: [],
        borderWidth: 1,
        borderColor: "eebc1d",
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
// fetching the chart-data:
const fetchChartData = async (days) => {
  try {
     const response = await fetch( `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,options);
     const charData = await response.json();
     console.log("charData:", charData);
     updateChart(charData.prices);

  } catch (error) {
    console.log("error while fetching chart data", error);
  }
};
const updateChart = (prices) => {
  const data = prices.map((price) => price[1]);
  const labels = price.map((price) => {
    let data =  new Date(price[0]);
    return data.toLocaleDateString();
  });
};

buttonContainer.forEach((button) => {
  button.addEventListener("click", (event) => {
    const days = event.target.id === "24h" ? 1 : event.target.id === "30d" ? 30 : 90;
    fetchChartData(days);
  })
});

// Show the data:
document.addEventListener("DOMContentLoaded", async () => {
  shimmerContainer.style.display = "flex"; // Show shimmer while data is being fetched
  await fetchCoinsData();
});
