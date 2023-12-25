import React, { useEffect, useState } from "react";
import { CoinObjectArray } from "./CoinsTable";
import { toASCII } from "punycode";

type Props = {
  page: number;
  search: string;
  coins: CoinObjectArray;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({ page, coins, search, setPage }: Props) => {
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
  }, [search]);
  const pageNumArr: number[] = [];

  for (let i: number = 1; i <= totalPages; i++) {
    pageNumArr.push(i);
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex h-8 items-center -space-x-px text-sm">
        <li>
          <span className=" ms-0 flex h-8 cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </li>

        {pageNumArr.map((num) => {
          return (
            <li>
              <span className=" flex h-8 cursor-pointer items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {num}
              </span>
            </li>
          );
        })}

        <li>
          <span className=" flex h-8 cursor-pointer items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
