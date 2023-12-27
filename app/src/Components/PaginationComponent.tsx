import React from "react";

type Props = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumArr: number[];
  totalPages: number;
};
const PaginationComponent = ({
  page,
  setPage,
  pageNumArr,
  totalPages,
}: Props) => {
  return (
    <nav className=" scale-110" aria-label="Page navigation example">
      <ul className="flex h-8 items-center -space-x-px text-sm">
        <li>
          <span
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className=" ms-0 flex h-8 cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </span>
        </li>

        {pageNumArr.map((num) => {
          return (
            <li key={num}>
              <span
                onClick={() => setPage(num)}
                className={` flex h-8 cursor-pointer items-center justify-center border border-gray-300  px-3 leading-tight text-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700   dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white  ${
                  page === num ? "bg-gray-600" : "bg-gray-800"
                }`}
              >
                {num}
              </span>
            </li>
          );
        })}

        <li>
          <span
            onClick={() => {
              if (page < totalPages) setPage(page + 1);
            }}
            className=" flex h-8 cursor-pointer items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-100 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
          >
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
