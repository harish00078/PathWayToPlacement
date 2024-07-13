// get the shimmer container:
const shimmerContainer = document.querySelector(".shimmer-container");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
  },
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

// saving the (favourite-coins) in local storage:
// const saveFavouriteCoins = (favourites) => {
//     localStorage.setItem("favorites", JSON.stringify(favourites));
//   };
  

// get favorite coins from local storage:
const getFavouriteCoins = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};


// remove favorite coins from local storage:
// const removeFavCoins = (coinId) => {

//     let favourites = getFavouriteCoins();
//     if (favourites.includes(coinId)) {
//       favourites = favourites.filter((id) => id !== coinId);
//     }

//     favourites.push(coinId);
//     saveFavouriteCoins(favourites);
//     displayFavoriteCoins(favourites);
  
// };

// fetching the data from api:
const fetchFavoriteCoins = async (coinsIds) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinsIds.join(
        ","
      )}`,
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

const displayFavoriteCoins = (favCoins) => {
  const tableBody = document.getElementById("favorite-table-body");
  tableBody.innerHTML = "";

  favCoins.forEach((coin, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
     <td>${index + 1}</td>
                  <td><img width="24" height="24" src=${coin.image}alt=${
      coin.name
    }></td>
                  <td>${coin.name}</td>
                  <td>$${coin.current_price.toLocaleString()}</td>
                  <td>$${coin.total_volume.toLocaleString()}</td>
                  <td>$${coin.market_cap.toLocaleString()}</td>
                  <td>
                    <i class="fa-solid fa-trash remove-icon" data-id="${
                      coin.id
                    }"></i>
                  </td>
                   
                 
    `;
    row.querySelector(".remove-icon").addEventListener("click", (event) => {
      event.stopPropagation();
      removeFavCoins(coin.id);
    });
    tableBody.appendChild(row);
  });
};

// showing the data:
document.addEventListener("DOMContentLoaded", async () => {
  try {
    showShimmer();
    // get favorite coins from local storage:
    const favorites = getFavouriteCoins();
    if (favorites.length > 0) {
      const favoriteCoins = await fetchFavoriteCoins(favorites);
      displayFavoriteCoins(favoriteCoins);
    } else {
      const noFavMsg = document.getElementById("no-favorites");
      noFavMsg.style.display = "block";
    }

    hideShimmer();
  } catch (error) {
    console.log(error);
    hideShimmer();
  }
});
