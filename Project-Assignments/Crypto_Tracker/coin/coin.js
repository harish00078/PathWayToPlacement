const coinContainer = document.getElementById("coin-container");
const coinImage = document.getElementById("coin-image");
const coinName = document.getElementById("coin-name");
const coinDescription = document.getElementById("coin-description");
const shimmerContainer = document.querySelector(".shimmer-container");
const coinRank = document.getElementById("coin-rank");
const coinPrice = document.getElementById("coin-price");
const coinMarketCap = document.getElementById("coin-market-cap");

const chartSection = document.getElementById("chart-section");
const ctx = document.getElementById("coinChart");
const buttonContainer = document.querySelectorAll(".button-container button");

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
    labels: ['Red','Yellow','Blue'],
    datasets: [
      {
        label: "Price (USD)",
        data: [],
        borderWidth: 1,
        borderColor: 'rgb(75, 192, 192)', // Color needs to be in quotes
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

// Fetching and updating chart data:
const fetchChartData = async (days) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`,
      options
    );
    const chartData = await response.json();
    updateChart(chartData.prices);
  } catch (error) {
    console.log("Error while fetching chart data", error);
  }
};

const updateChart = (prices) => {
  const data = prices.map((price) => price[1]);
  const labels = prices.map((price) => {
    let date = new Date(price[0]);
    return date.toLocaleDateString();
  });
  coinChart.data.labels = labels;
  coinChart.data.datasets[0].data = data;
  coinChart.update(); // Update the chart with new data
};

// Event listeners for buttons
buttonContainer.forEach((button) => {
  button.addEventListener("click", (event) => {
    const days = event.target.id === "24h" ? 1 : event.target.id === "30d" ? 30 : 90;
    fetchChartData(days);
  });
});

// Show the data on page load
document.addEventListener("DOMContentLoaded", async () => {
  shimmerContainer.style.display = "flex"; // Show shimmer while data is being fetched
  await fetchCoinsData();
  
  // Check if the button with ID "24" exists before trying to click it
  const button24 = document.getElementById("24h");
  if (button24) {
    button24.click(); // Trigger the click event on the button with ID "24"
  } else {
    console.error('Button with ID "24" not found.');
  }
});
