import React, { useContext } from "react";
import { CoinObj } from "../../Pages/SingleCoinPage";
import { numberWithCommas } from "../Banner/Carousel";
import { CryptoContext } from "../../Context/CryptoContext";
type Props = {
  coin: CoinObj;
};

function getFirstSentence(paragraph: string) {
  // Use a regular expression to match the first sentence
  var match = paragraph?.match(/^.*?[.!?](?:\s|$)/);

  // If a match is found, return the first sentence; otherwise, return the entire paragraph
  return match ? match[0].trim() : paragraph;
}

const Description = ({ coin }: Props) => {
  const { currency, symbol } = useContext(CryptoContext);

  return (
    <div className=" flex min-w-[30%] max-w-[30%]  flex-col gap-5 border-r border-r-gray-400 px-6 py-4 text-gray-300">
      <img
        className=" mx-auto"
        height={160}
        width={160}
        src={coin?.image?.large}
        alt=""
      />
      <h1 className=" mx-auto mt-4 text-4xl font-bold text-white">
        {coin.name}
      </h1>
      <p className="word-spacing">{getFirstSentence(coin?.description?.en)}</p>
      <div className="  flex flex-col gap-5 text-xl">
        <span className=" flex  items-baseline gap-5">
          <span className=" text-2xl font-bold text-white">Rank:</span>{" "}
          {coin.market_cap_rank}
        </span>
        <span className=" flex  items-baseline gap-5">
          <span className=" text-2xl font-bold text-white">Current Price:</span>
          {symbol}
          {"     "}

          {currency === "INR"
            ? coin?.market_data?.current_price?.inr
              ? numberWithCommas(
                  coin?.market_data?.current_price?.inr?.toString(),
                )
              : ""
            : coin.market_data.current_price.usd
              ? numberWithCommas(
                  coin?.market_data?.current_price?.usd?.toString(),
                )
              : ""}
          {}
        </span>
        <span className=" flex  items-baseline gap-5">
          <span className=" text-2xl font-bold text-white">Market Cap:</span>{" "}
          {symbol}
          {"     "}
          {currency === "INR"
            ? coin?.market_data?.market_cap?.inr
              ? numberWithCommas(coin?.market_data?.market_cap?.inr?.toString())
              : ""
            : coin?.market_data?.market_cap?.usd
              ? numberWithCommas(coin?.market_data?.market_cap?.usd?.toString())
              : ""}
        </span>
      </div>
    </div>
  );
};

export default Description;
