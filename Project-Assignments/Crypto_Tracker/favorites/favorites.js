
// Get the shimmer container:
const shimmerContainer = document.querySelector(".shimmer-container");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
  },
};

// Show shimmer function:
const showShimmer = () => {
  shimmerContainer.style.display = "flex";
};

// Hide shimmer function:
const hideShimmer = () => {
  shimmerContainer.style.display = "none";
};

// Save favorite coins to local storage:
const saveFavouriteCoins = (favourites) => {
  localStorage.setItem("favorites", JSON.stringify(favourites));
};

// Get favorite coins from local storage:
const getFavouriteCoins = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// Remove favorite coins from local storage:
const removeFavCoins = (coinId) => {
  let favourites = getFavouriteCoins();
  if (favourites.includes(coinId)) {
    favourites = favourites.filter((id) => id !== coinId);
  }
  saveFavouriteCoins(favourites);
  updateFavoriteCoins();
};

// Fetch data from API:
const fetchFavoriteCoins = async (coinsIds) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsIds.join(",")}`,
      options
    );
    const coinsData = await response.json();
    return coinsData;
  } catch (error) {
    console.error("Error while fetching coins", error);
  }
};

// Display favorite coins:
const displayFavoriteCoins = (favCoins) => {
  const tableBody = document.getElementById("favorite-table-body");
  tableBody.innerHTML = "";

  favCoins.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img width="24" height="24" src=${coin.image} alt=${coin.name}></td>
      <td>${coin.name}</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>$${coin.total_volume.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td>
        <i class="fa-solid fa-trash remove-icon" data-id="${coin.id}"></i>
      </td>
    `;

    // Open coin details in new tab
    row.addEventListener("click", () => {
      window.open(`../coin/coin.html?id=${coin.id}`, "_blank");
    });

    // Remove favorite coin
    row.querySelector(".remove-icon").addEventListener("click", (event) => {
      event.stopPropagation();
      removeFavCoins(coin.id);
    });

    tableBody.appendChild(row);
  });
};

// Update favorite coins
const updateFavoriteCoins = async () => {
  showShimmer();
  const favorites = getFavouriteCoins();
  if (favorites.length > 0) {
    const favoriteCoins = await fetchFavoriteCoins(favorites);
    displayFavoriteCoins(favoriteCoins);
  } else {
    const noFavMsg = document.getElementById("no-favorites");
    noFavMsg.style.display = "block";
  }
  hideShimmer();
};

// Show data on page load
document.addEventListener("DOMContentLoaded", updateFavoriteCoins);
