const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';

 const options = {
   method: "GET",
   headers: {
     accept: "application/json",
     "x-cg-demo-api-key": "CG-bTUWVZGY95RCTnRdid3bdM79",
   },
 };
const coins = [];

 const fetchCoins = async () => {
    try {
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error while fetching coins',error);
    }
 }
 window.onload = fetchCoins();

