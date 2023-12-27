import React, { useEffect, useState } from "react";
import { CoinObjectArray } from "./CoinsTable";
import PaginationComponent from "../PaginationComponent";

type CoinsProps = {
  page: number;
  search: string;
  coins: CoinObjectArray;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ page, coins, search, setPage }: CoinsProps) => {
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search),
    );
  };

  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    const total = (handleSearch().length / 10).toFixed(0);
    setTotalPages(parseInt(total));
    if (parseInt(total) > 0) setPage(1);
  }, [search]);
  const pageNumArr: number[] = [];

  for (let i: number = 1; i <= totalPages; i++) {
    pageNumArr.push(i);
  }
  return (
    <PaginationComponent
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      pageNumArr={pageNumArr}
    />
  );
};

export default Pagination;
