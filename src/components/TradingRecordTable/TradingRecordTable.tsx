import React, { useEffect, useState } from "react";
import { TCategories } from "../../consts/types";
import { TradingCard } from "../TradingCard/TradingCard";
import { ITradingInfo } from "../../consts/interfaces/TradingInfo";
import { Pagination } from "../Pagination/Pagination";

interface IProps {
  data: ITradingInfo[];
  category: TCategories;
  currentPage: number;
  prevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
}

interface PaginatedList {
  data: ITradingInfo[];
  type: TCategories;
  pageNum: number;
}

export const TradingRecordTable: React.FC<IProps> = ({
  data,
  category,
  currentPage,
  prevPage,
  nextPage,
  handlePageChange,
}): JSX.Element => {
  const [pageSize, setPageSize] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState<ITradingInfo[]>();

  // Pagination table configuration
  const totalItemPerPage: number = 3;

  const lastPage: number = currentPage * totalItemPerPage;
  const firstPage: number = lastPage - totalItemPerPage;

  useEffect(() => {
    let temp = data;

    if (category === "All") {
      setCurrentItem(temp.slice(firstPage, lastPage));
    }

    if (category === "Sell") {
      temp = data.filter((e) => e.type === "Sell");
      console.log(temp);
      setCurrentItem(temp.slice(firstPage, lastPage));
    }

    if (category === "Buy") {
      temp = data.filter((e) => e.type === "Buy");
      console.log(temp);
      setCurrentItem(temp.slice(firstPage, lastPage));
    }

    if (temp.length > 0) {
      // Calculate the pages for the pagination table
      if (temp.length / totalItemPerPage >= 1) {
        setPageSize(Math.ceil(temp.length / totalItemPerPage));
      }
    }
  }, [category, currentPage]);

  return (
    <div className="flex flex-col w-full h-full justify-center items-center space-y-4">
      {currentItem?.map((item, index) => {
        if (item.type === category) {
          return <TradingCard key={`trading-record-${index}`} data={item} />;
        }
        if (category === "All") {
          return <TradingCard key={`trading-record-${index}`} data={item} />;
        }
      })}
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        nextPage={nextPage}
        prevPage={prevPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
