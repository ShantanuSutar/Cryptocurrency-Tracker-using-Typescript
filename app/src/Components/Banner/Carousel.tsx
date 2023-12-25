import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../../Context/CryptoContext";
import { TrendingCoins } from "../../Config/api";
import axios from "axios";

const temp: DataArray = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 3628161,
    market_cap: 71221231445604,
    market_cap_rank: 1,
    fully_diluted_valuation: 76384215139365,
    total_volume: 1479400300956,
    high_24h: 3656609,
    low_24h: 3557329,
    price_change_24h: -28448.726585851517,
    price_change_percentage_24h: -0.77801,
    market_cap_change_24h: -231235275924.42188,
    market_cap_change_percentage_24h: -0.32362,
    circulating_supply: 19580562,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 5128383,
    ath_change_percentage: -29.20545,
    ath_date: "2021-11-10T14:24:11.849Z",
    atl: 3993.42,
    atl_change_percentage: 90814.95521,
    atl_date: "2013-07-05T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:13.103Z",
    price_change_percentage_24h_in_currency: -0.7780083664948443,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image:
      "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
    current_price: 189907,
    market_cap: 22873718706492,
    market_cap_rank: 2,
    fully_diluted_valuation: 22873718706492,
    total_volume: 934782595245,
    high_24h: 192132,
    low_24h: 187388,
    price_change_24h: -2225.0129354773962,
    price_change_percentage_24h: -1.15806,
    market_cap_change_24h: -164486655307.8125,
    market_cap_change_percentage_24h: -0.71397,
    circulating_supply: 120183925.361112,
    total_supply: 120183925.361112,
    max_supply: null,
    ath: 362338,
    ath_change_percentage: -47.47106,
    ath_date: "2021-11-10T14:24:19.604Z",
    atl: 28.13,
    atl_change_percentage: 676487.85447,
    atl_date: "2015-10-20T00:00:00.000Z",
    roi: {
      times: 68.97012202635267,
      currency: "btc",
      percentage: 6897.012202635267,
    },
    last_updated: "2023-12-25T14:16:13.525Z",
    price_change_percentage_24h_in_currency: -1.1580643545912597,
  },
  {
    id: "ripple",
    symbol: "xrp",
    name: "XRP",
    image:
      "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
    current_price: 53.05,
    market_cap: 2871334520640,
    market_cap_rank: 6,
    fully_diluted_valuation: 5310261083481,
    total_volume: 139690647867,
    high_24h: 53.82,
    low_24h: 50.65,
    price_change_24h: 1.19,
    price_change_percentage_24h: 2.28538,
    market_cap_change_24h: 69573976564,
    market_cap_change_percentage_24h: 2.48322,
    circulating_supply: 54065019376,
    total_supply: 99988129668,
    max_supply: 100000000000,
    ath: 215.1,
    ath_change_percentage: -75.31214,
    ath_date: "2018-01-07T00:00:00.000Z",
    atl: 0.159343,
    atl_change_percentage: 33227.29689,
    atl_date: "2013-08-16T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:19.815Z",
    price_change_percentage_24h_in_currency: 2.2853840935752068,
  },
  {
    id: "solana",
    symbol: "sol",
    name: "Solana",
    image:
      "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
    current_price: 9534.55,
    market_cap: 4091615799062,
    market_cap_rank: 4,
    fully_diluted_valuation: 5413244440677,
    total_volume: 364166488607,
    high_24h: 9716.08,
    low_24h: 9066.83,
    price_change_24h: 132.92,
    price_change_percentage_24h: 1.41378,
    market_cap_change_24h: 84730140692,
    market_cap_change_percentage_24h: 2.11461,
    circulating_supply: 427472240.192986,
    total_supply: 565549612.038063,
    max_supply: null,
    ath: 19286.66,
    ath_change_percentage: -50.58098,
    ath_date: "2021-11-06T21:54:35.825Z",
    atl: 38.03,
    atl_change_percentage: 24965.35799,
    atl_date: "2020-05-11T19:35:23.449Z",
    roi: null,
    last_updated: "2023-12-25T14:16:23.297Z",
    price_change_percentage_24h_in_currency: 1.4137774997932055,
  },
  {
    id: "binancecoin",
    symbol: "bnb",
    name: "BNB",
    image:
      "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
    current_price: 22170,
    market_cap: 3416737026206,
    market_cap_rank: 5,
    fully_diluted_valuation: 3416737026206,
    total_volume: 55271464935,
    high_24h: 22568,
    low_24h: 21813,
    price_change_24h: -355.97392388974185,
    price_change_percentage_24h: -1.58031,
    market_cap_change_24h: -43553129768.103516,
    market_cap_change_percentage_24h: -1.25866,
    circulating_supply: 153856150,
    total_supply: 153856150,
    max_supply: 200000000,
    ath: 50351,
    ath_change_percentage: -55.94767,
    ath_date: "2021-05-10T07:24:17.097Z",
    atl: 2.58,
    atl_change_percentage: 858044.44712,
    atl_date: "2017-10-19T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:21.877Z",
    price_change_percentage_24h_in_currency: -1.580307495902087,
  },
  {
    id: "dogecoin",
    symbol: "doge",
    name: "Dogecoin",
    image:
      "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
    current_price: 7.79,
    market_cap: 1110681453291,
    market_cap_rank: 11,
    fully_diluted_valuation: 1110680361176,
    total_volume: 46363717618,
    high_24h: 7.9,
    low_24h: 7.59,
    price_change_24h: -0.10867669829059957,
    price_change_percentage_24h: -1.3763,
    market_cap_change_24h: -12547691019.226807,
    market_cap_change_percentage_24h: -1.11711,
    circulating_supply: 142380066383.705,
    total_supply: 142379926383.705,
    max_supply: null,
    ath: 53.62,
    ath_change_percentage: -85.46968,
    ath_date: "2021-05-08T05:08:23.458Z",
    atl: 0.00552883,
    atl_change_percentage: 140812.70673,
    atl_date: "2015-05-06T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:14.708Z",
    price_change_percentage_24h_in_currency: -1.3763034534205274,
  },
  {
    id: "cardano",
    symbol: "ada",
    name: "Cardano",
    image:
      "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
    current_price: 50.98,
    market_cap: 1789829253483,
    market_cap_rank: 8,
    fully_diluted_valuation: 2299653883932,
    total_volume: 55400874231,
    high_24h: 51.8,
    low_24h: 49.19,
    price_change_24h: -0.8163529278469142,
    price_change_percentage_24h: -1.57606,
    market_cap_change_24h: -18533046294.779297,
    market_cap_change_percentage_24h: -1.02485,
    circulating_supply: 35023668983.182,
    total_supply: 45000000000,
    max_supply: 45000000000,
    ath: 225.26,
    ath_change_percentage: -77.32714,
    ath_date: "2021-09-02T06:00:10.474Z",
    atl: 1.38,
    atl_change_percentage: 3613.3046,
    atl_date: "2017-11-02T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:15.279Z",
    price_change_percentage_24h_in_currency: -1.5760594226852775,
  },
  {
    id: "chainlink",
    symbol: "link",
    name: "Chainlink",
    image:
      "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
    current_price: 1281.41,
    market_cap: 715195990751,
    market_cap_rank: 14,
    fully_diluted_valuation: 1284360290385,
    total_volume: 45190386878,
    high_24h: 1324.89,
    low_24h: 1262.19,
    price_change_24h: -42.44948182231815,
    price_change_percentage_24h: -3.2065,
    market_cap_change_24h: -19941913257.441406,
    market_cap_change_percentage_24h: -2.71268,
    circulating_supply: 556849971.2305644,
    total_supply: 1000000000,
    max_supply: 1000000000,
    ath: 3862.15,
    ath_change_percentage: -66.83119,
    ath_date: "2021-05-10T00:13:57.214Z",
    atl: 9.55,
    atl_change_percentage: 13318.61561,
    atl_date: "2017-11-29T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:17.231Z",
    price_change_percentage_24h_in_currency: -3.2065005379401024,
  },
  {
    id: "polkadot",
    symbol: "dot",
    name: "Polkadot",
    image:
      "https://assets.coingecko.com/coins/images/12171/large/polkadot.png?1696512008",
    current_price: 758.28,
    market_cap: 994810808375,
    market_cap_rank: 12,
    fully_diluted_valuation: 1056223494661,
    total_volume: 75484657208,
    high_24h: 776.9,
    low_24h: 711.9,
    price_change_24h: 8.4,
    price_change_percentage_24h: 1.12073,
    market_cap_change_24h: 3179144022,
    market_cap_change_percentage_24h: 0.3206,
    circulating_supply: 1311277505.91252,
    total_supply: 1392226640.58929,
    max_supply: null,
    ath: 4095.22,
    ath_change_percentage: -81.45441,
    ath_date: "2021-11-04T14:10:09.301Z",
    atl: 202.26,
    atl_change_percentage: 275.50357,
    atl_date: "2020-08-19T03:44:11.556Z",
    roi: null,
    last_updated: "2023-12-25T14:16:14.693Z",
    price_change_percentage_24h_in_currency: 1.120729262856022,
  },
  {
    id: "stellar",
    symbol: "xlm",
    name: "Stellar",
    image:
      "https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png?1696501482",
    current_price: 10.75,
    market_cap: 304158220114,
    market_cap_rank: 26,
    fully_diluted_valuation: 538540975320,
    total_volume: 8049919733,
    high_24h: 10.92,
    low_24h: 10.36,
    price_change_24h: 0.100938,
    price_change_percentage_24h: 0.94769,
    market_cap_change_24h: 3390180386,
    market_cap_change_percentage_24h: 1.12717,
    circulating_supply: 28240106606.2718,
    total_supply: 50001787060.6294,
    max_supply: 50001787060.6294,
    ath: 58.01,
    ath_change_percentage: -81.40593,
    ath_date: "2021-05-16T09:48:45.220Z",
    atl: 0.02966141,
    atl_change_percentage: 36263.37793,
    atl_date: "2015-03-05T00:00:00.000Z",
    roi: null,
    last_updated: "2023-12-25T14:16:17.925Z",
    price_change_percentage_24h_in_currency: 0.9476868251684402,
  },
];

type DataObject = {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number | string;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number | null;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: null | {
    currency: string;
    percentage: number;
    times: number;
  };
  symbol: string;
  total_supply: number;
  total_volume: number;
};

type DataArray = DataObject[];

export const numberWithCommas = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const Carousel = () => {
  const { currency } = useContext(CryptoContext);
  const [data, setData] = useState<DataArray>([]);
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setData(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(data);

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const { symbol } = useContext(CryptoContext);
  return (
    <div className="slider">
      <div className="slide-track">
        {data.map((item) => {
          // console.log(item.image);
          const percentColor: string =
            item.price_change_percentage_24h > 0 ? "green" : "red";
          return (
            <div
              key={item.id}
              className=" slide relative flex flex-col items-center"
            >
              <img src={item?.image} alt={item?.name} height="50" width="100" />
              <div className="mt-3 text-center text-white">
                <p className=" flex gap-2 text-sm font-semibold">
                  <span className=" tracking-wide">
                    {item?.symbol.toUpperCase()}
                  </span>
                  <span
                    className={`${
                      percentColor === "green"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {item?.price_change_percentage_24h}
                  </span>
                </p>
                <p className=" text-lg font-semibold">
                  {symbol} {numberWithCommas(item?.current_price as string)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
