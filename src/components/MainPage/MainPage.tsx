import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { TCategories } from "../../consts/types";
import { ITradingInfo } from "../../consts/interfaces/TradingInfo";
import { TradingRecordTable } from "../TradingRecordTable/TradingRecordTable";
import { tradingInitData } from "../../data/tradnigRecord";

const selectedCategoryInit: TCategories = "All";

export const MainPage: React.FC = ({}): JSX.Element => {
  // Categories of "All, Buy, Sell"
  const [selectedCategory, setSelectedCategory] =
    useState<TCategories>(selectedCategoryInit);
  // Current Page number
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Datasets
  const [dummyData, setDummyData] = useState<ITradingInfo[]>(tradingInitData);
  // For buy and sell count display
  const [totalBuy, setTotalBuy] = useState<number>(0);
  const [totalSell, setTotalSell] = useState<number>(0);

  useEffect(() => {
    let buyCount = 0;
    let sellCount = 0;

    dummyData.map((item) => {
      if (item.type === "Buy") {
        buyCount++;
      } else if (item.type === "Sell") {
        sellCount++;
      }
    });

    setTotalBuy(buyCount);
    setTotalSell(sellCount);
  }, []);

  const handleCategoriesChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    category: TCategories
  ) => {
    // change category
    setSelectedCategory(category);
    // reset page number
    setCurrentPage(1);
  };

  // Page Navigation
  const nextPage = (e: React.MouseEvent<HTMLButtonElement>) =>
    setCurrentPage(currentPage + 1);
  const prevPage = (e: React.MouseEvent<HTMLButtonElement>) =>
    setCurrentPage(currentPage - 1);
  const handlePageChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => setCurrentPage(index);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center space-y-4">
      <div className="flex w-11/12 h-24 bg-white rounded-sm drop-shadow-sm justify-left items-center">
        <span className="ml-8 text-xl font-bold">Account Activity</span>
      </div>

      <div className="flex w-11/12 h-20 bg-white rounded-sm drop-shadow-sm justify-left items-center">
        <div className="flex flex-row ml-16 space-x-20">
          <div
            className={`flex flex-row space-x-2 w-32 justify-center items-center ${
              selectedCategory !== "Buy"
                ? "opacity-30 hover:opacity-100"
                : "border-b-2 border-purple-500"
            } hover:border-b-2 hover:border-purple-500 mt-3 pb-3`}
          >
            <button onClick={(e) => handleCategoriesChange(e, "Buy")}>
              Buy
            </button>
            <button
              onClick={(e) => handleCategoriesChange(e, "Buy")}
              className="w-6 h-6 rounded-full bg-cx-dark-purple text-white"
            >
              {totalBuy}
            </button>
          </div>
          <div
            className={`flex flex-row space-x-2 w-32 justify-center items-center ${
              selectedCategory !== "Sell"
                ? "opacity-30 hover:opacity-100"
                : "border-b-2 border-purple-500"
            } hover:border-b-2 hover:border-purple-500 mt-3 pb-3`}
          >
            <button onClick={(e) => handleCategoriesChange(e, "Sell")}>
              Sell
            </button>
            <button
              onClick={(e) => handleCategoriesChange(e, "Sell")}
              className="w-6 h-6 rounded-full bg-cx-red text-white"
            >
              {totalSell}
            </button>
          </div>
          <div
            className={`flex flex-row space-x-2 w-32 justify-center items-center ${
              selectedCategory !== "All"
                ? "opacity-30 hover:opacity-100"
                : "border-b-2 border-purple-500"
            } hover:border-b-2 hover:border-purple-500 mt-3 pb-3`}
          >
            <button onClick={(e) => handleCategoriesChange(e, "All")}>
              All
            </button>
          </div>
        </div>
      </div>
      <TradingRecordTable
        data={dummyData}
        category={selectedCategory}
        currentPage={currentPage}
        prevPage={prevPage}
        nextPage={nextPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
