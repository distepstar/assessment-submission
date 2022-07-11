import React from "react";
import { ITradingInfo } from "../../consts/interfaces/TradingInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

export interface IProps {
  data: ITradingInfo;
}

export const TradingCard: React.FC<IProps> = ({ data }): JSX.Element => {
  const formatter = new Intl.NumberFormat("en-CA", {
    currency: "CAD",
    style: "currency",
  });

  const parsedAvgPrice = parseFloat(data.averagePrice).toFixed(1);
  const parsedOrderPrice = parseFloat(data.orderPrice).toFixed(2);
  const formattedAvgPrice = formatter.format(parseFloat(parsedAvgPrice));
  const formattedOrderPrice = formatter.format(parseFloat(parsedOrderPrice));

  const downloadRecordToJson = (e: React.MouseEvent<HTMLButtonElement>) => {
    const jsonString = `data:text/json'charset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${data.coinName}-${data.date}-data.json`;
    link.click();
  };

  const handleConfirmTrading = (e: React.MouseEvent<HTMLButtonElement>) => {
    window.confirm("Confirm the trade?");
  };

  return (
    <div className="flex w-11/12 h-40 bg-white rounded-md drop-shadow-sm justify-left items-center space-x-20 ">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-left items-center space-x-20">
          <div className="grid grid-row-2 gap-1 ml-8 text-left">
            <span className="text-xl font-bold">{data.coinName}</span>
            <span className="text-sm text-gray-600">{data.date}</span>
          </div>

          {data.type === "Sell" ? (
            <span className="flex w-20 h-10 bg-rose-200 text-rose-400 justify-center items-center rounded-md">
              Sell
            </span>
          ) : (
            <span className="flex w-20 h-10 bg-green-200 text-green-400 justify-center items-center rounded-md">
              Buy
            </span>
          )}
        </div>

        <div className="flex justify-left items-center space-x-8">
          <div className="grid grid-row-2 gap-1 ml-8 text-left text-sm">
            <span className="text-gray-500 w-40">Average Price (CAD)</span>
            <span>{formattedAvgPrice}</span>
          </div>
          <div className="grid grid-row-2 gap-1 ml-8 text-center text-sm">
            <span className="text-gray-500 w-40">Order Price (CAD)</span>
            <span>{formattedOrderPrice}</span>
          </div>
          <div className="grid grid-row-2 gap-1 ml-8 text-center text-sm">
            <span className="text-gray-500 w-40">Executed Amount (BTC)</span>
            <span>{data.executedAmount}</span>
          </div>
          <div className="grid grid-row-2 gap-1 ml-8 text-right text-sm">
            <span className="text-gray-500 w-40">Order Amount (BTC)</span>
            <span>{data.orderAmount}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full items-center space-x-4 pr-6">
        <div className="inline-block border-2 rounded-sm h-32 border-purple-300"></div>
        <div className="grid grid-row-2 gap-1 ml-8 text-center text-sm">
          <button className="text-gray-500" onClick={downloadRecordToJson}>
            <FontAwesomeIcon
              className="text-cx-dark-purple w-8 h-8"
              icon={faDownload}
            />
          </button>
          <button
            className="text-cx-dark-purple"
            onClick={handleConfirmTrading}
          >
            Trade Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};
