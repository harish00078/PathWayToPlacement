// get the shimmer container:
const shimmerContainer = document.querySelector(".shimmer-container");
// get the pagination container:
const paginationContainer = document.getElementById("pagination");

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

const fetchFavouriteCoins = () =>{
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

// saving the (favourite-coins) in local storage:
const saveFavouriteCoins = (favourites) => {
  localStorage.setItem("favorites", JSON.stringify(favourites));
  
}

const handleFavClick = (element) => {
  console.log(coinId);
  const favourites = [];
  favourites.push(coinId);
  console.log("favourites:", favourites);
  // save the (favourite-coins) in local storage:
  saveFavouriteCoins(favourites);


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

const displayCoins = (coins, currentPage) => {
  const start = (currentPage - 1) * itemsPerPage + 1;
  const tableBody = document.getElementById("crypto-table-body");
  tableBody.innerHTML = "";
  coins.forEach((coin, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `           
                <td>${start + index}</td>
                <td><img width="24" height="24" src=${coin.image}alt=${
      coin.name
    }></td>
                <td>${coin.name}</td>
                <td>$${coin.current_price}</td>
                <td>$${coin.total_volume}</td>
                <td>$${coin.market_cap}</td>
                <td><i class="fa-regular fa-star favourite-icon" data-id="${
                  coin.id
                }"onClick=handleFavClick(this)></i></td>
              `;
    // row.querySelector(".favourite-icon").addEventListener("click", (event) => {
    //   event.stopPropagation();
    //   handleFavClick(coin.id);
      
    // });
    tableBody.appendChild(row);
  });
};

// creating pagination:
// IMP = we did not using pagination api-data in this application:we are using the simple api-data:so that's why here we are trying to create pagination by ourselves.
const renderPagination = (coins) => {
  const totalPages = Math.ceil(coins.length / itemsPerPage);
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    // adding the text-content with in the button:
    pageBtn.textContent = i;
    pageBtn.classList.add("page-button");
    if (i === currentPage) {
      pageBtn.classList.add("active");
    }
    // allow click over the button:
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      displayCoins(getCoinsToDisplay(coins, currentPage), currentPage);
      updatePaginationButtons();
    });
    paginationContainer.appendChild(pageBtn);
  }
};
const updatePaginationButtons = () => {
  const pageBtn = document.querySelectorAll(".page-button");
  pageBtn.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
};

// showing the data:
document.addEventListener("DOMContentLoaded", async () => {
  try {
    showShimmer();
    coins = await fetchCoins();
    displayCoins(getCoinsToDisplay(coins, currentPage), currentPage);
    renderPagination(coins);
    hideShimmer();
    console.log("coins:", coins);
  } catch (error) {
    console.log(error);
    hideShimmer();
  }
});
