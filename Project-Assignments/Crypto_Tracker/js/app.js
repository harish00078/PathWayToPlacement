// get the shimmer container:
const shimmerContainer = document.querySelector(".shimmer-container");
// get the pagination container:
const paginationContainer = document.getElementById("pagination");
// get the pricing icons:
const sortPriceAsc = document.getElementById("sort-price-asc");
const sortPriceDesc = document.getElementById("sort-price-desc");
// get the search box:
const searchBox = document.getElementById("search-box");

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

const fetchFavouriteCoins = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

// saving the (favourite-coins) in local storage:
const saveFavouriteCoins = (favourites) => {
  localStorage.setItem("favorites", JSON.stringify(favourites));
};

const handleFavClick = (coinId) => {
  // The id is retrieved from the dataset of the element that was clicked.
  // The dataset is an object of a HTML element that contains all the data-* attributes.
  // For example, if the element was <div data-id="bitcoin">, then element.dataset.id would be "bitcoin".
  // console.log(element.dataset.id);

  let favourites = fetchFavouriteCoins();
  if (favourites.includes(coinId)) {
    favourites = favourites.filter((id) => id !== coinId);
  }

  favourites.push(coinId);
  saveFavouriteCoins(favourites);
  displayCoins(getCoinsToDisplay(coins, currentPage), currentPage);
};

// sorting functionality:
const sortCoinsByPrice = (order) => {
  if (order === "asc") {
    coins.sort((a, b) => a.current_price - b.current_price);
  } else if (order === "desc") {
    coins.sort((a, b) => b.current_price - a.current_price);
  }
  currentPage = 1;
  displayCoins(getCoinsToDisplay(coins, currentPage), currentPage);
  renderPagination(coins);
};

sortPriceAsc.addEventListener("click", () => {
  sortCoinsByPrice("asc");
});
sortPriceDesc.addEventListener("click", () => {
  sortCoinsByPrice("desc");
});

const handleSearch = () => {
  const searchQuery = searchBox.value.trim();

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  currentPage = 1;
  displayCoins(getCoinsToDisplay(filteredCoins, currentPage), currentPage);
  renderPagination(filteredCoins);
};

// search functionality:
searchBox.addEventListener("input", handleSearch);

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
  const favourites = fetchFavouriteCoins();

  const tableBody = document.getElementById("crypto-table-body");
  tableBody.innerHTML = "";
  coins.forEach((coin, index) => {
    const row = document.createElement("tr");
    const isFavourite = favourites.includes(coin.id);
    row.innerHTML = `           
                  <td>${start + index}</td>
                  <td><img width="24" height="24" src=${coin.image}alt=${
      coin.name
    }></td>
                  <td>${coin.name}</td>
                  <td>$${coin.current_price.toLocaleString()}</td>
                  <td>$${coin.total_volume.toLocaleString()}</td>
                  <td>$${coin.market_cap.toLocaleString()}</td>
                  <td><i class="fa-solid fa-star favorite-icon ${
                    isFavourite ? "favorite" : ""
                  }" data-id="${coin.id}"></i></td>
                `;
                row.addEventListener("click", () => {
                  
                  window.open(`./coin/coin.html?id=${coin.id}`,"_blank");

                })
    row.querySelector(".favorite-icon").addEventListener("click", (event) => {
      event.stopPropagation();
      handleFavClick(coin.id);
    });
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
