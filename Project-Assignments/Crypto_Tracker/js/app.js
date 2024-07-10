// get the shimmer container:
const shimmerContainer = document.querySelector(".shimmer-container");
// get the pagination container:
const paginationContainer = document.getElementById("pagination-container");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
  },
};
let coins = [];
let itemsPerPage = 15;
let currentPage = 1;

// fetching the data from api:
const fetchCoins = async () => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      options
    );
    console.log(response);
    const coinsData = await response.json();
    console.log("coinsData:", coinsData);
    return coinsData;
  } catch (error) {
    console.error("Error while fetching coins", error);
  }
};

const handleFavClick = (coinId) => {

};

// => function for shimmer:
// show shimmer function:
const showShimmer = () => {
  shimmerContainer.style.display = "flex";
};
// hide shimmer function:
const hideShimmer = () => {
  shimmerContainer.style.display = "none";
};

const getCoinsToDisplay = (coins, page) => {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return coins.slice(start, end);
};

const displayCoins = (coins) => {
  const tableBody = document.getElementById("crypto-table-body");
  tableBody.innerHTML = "";
  coins.forEach((coin, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `           
                <td>${index + 1}</td>
                <td><img width="24" height="24" src=${coin.image}alt=${
      coin.name
    }></td>
                <td>${coin.name}</td>
                <td>$${coin.current_price}</td>
                <td>$${coin.total_volume}</td>
                <td>$${coin.market_cap}</td>
                <td><i class="fa-regular fa-star favourite-icon" data-id="${
                  coin.id
                }"></i></td>
              `;
    row.querySelector(".favourite-icon").addEventListener("click", (event) => {
      event.stopPropagation();
      handleFavClick(coin.id);
      // event.target.classList.toggle("fa-star");
      // event.target.classList.toggle("fa-");
    });
    tableBody.appendChild(row);
  });
};

// creating pagination:
// IMP = we did not using pagination api-data in this application:we are using the simple api-data:so that's why here we are trying to create pagination by ourselves.
const renderPagination = (coins) => {
  const totalPage = math.ceil(coins.length / itemsPerPage);
  paginationContainer.innerHTML = "";
  for(let i = 1; i<=totalPage; i++){
    
  }
}


// showing the data:
document.addEventListener("DOMContentLoaded", async () => {
  try {
    showShimmer();
    coins = await fetchCoins();
    displayCoins(getCoinsToDisplay(coins, currentPage));
    hideShimmer();
    console.log("coins:", coins);
  } catch (error) {
    console.log(error);
    hideShimmer();
  }
});
