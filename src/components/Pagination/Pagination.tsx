import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  currentPage: number;
  pageSize: number;
  prevPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextPage: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handlePageChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => void;
}

export const Pagination: React.FC<IProps> = ({
  currentPage,
  pageSize,
  prevPage,
  nextPage,
  handlePageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= pageSize; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage > 1) {
      prevPage(e);
    }
  };

  const handleNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentPage < pageNumbers.length) {
      nextPage(e);
    }
  };

  return (
    <div className="flex items-center space-x-1 pb-8">
      {/* // Previous Page Button */}
      <button
        className="rounded-full w-6 bg-white hover:bg-gray-300"
        key="pagination-tab-prev"
        onClick={handlePrevPage}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* // Buttons of pages*/}
      {pageNumbers.map((number) => {
        return (
          <button
            className={`rounded-full w-8 h-8 bg-white hover:bg-gray-300 ${
              number === currentPage ? "bg-gray-300" : ""
            }`}
            key={`pagination-tab-${number}`}
            onClick={(e) => handlePageChange(e, number)}
          >
            {number}
          </button>
        );
      })}
      {/* // Next Page Button*/}
      <button
        className="rounded-full w-6 bg-white hover:bg-gray-300"
        key="pagination-tab-next"
        onClick={handleNextPage}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
