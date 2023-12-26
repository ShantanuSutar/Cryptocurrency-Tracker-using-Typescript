import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SingleCoin } from "../Config/api";
import Chart from "../Components/SingleCoinPage/Chart";
import Description from "../Components/SingleCoinPage/Description";

const temp: CoinObj = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  description: {
    en: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.",
  },
  image: {
    large:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
  },
  market_cap_rank: 1,
  market_data: {
    current_price: {
      inr: 3548890,
      usd: 42671,
    },
    market_cap: {
      inr: 69526703993123,
      usd: 835924754707,
    },
  },
};

export type CoinObj = {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    large: string;
  };
  market_cap_rank: number;
  market_data: {
    current_price: {
      inr: number;
      usd: number;
    };
    market_cap: {
      inr: number;
      usd: number;
    };
  };
};

const SingleCoinPage: React.FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [coin, setCoin] = useState<CoinObj>(temp);
  const fetchCoinInfo = async () => {
    setLoading(true);
    try {
      if (id) {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
        console.log(coin);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchCoinInfo();
  // }, []);

  if (loading)
    return (
      <div className=" mt-10  flex items-center justify-center">
        <h1 className=" text-4xl">Loading . . .</h1>
      </div>
    );

  return (
    <div className=" mt-8 flex">
      <Description coin={coin} />
      <Chart />
    </div>
  );
};

export default SingleCoinPage;
