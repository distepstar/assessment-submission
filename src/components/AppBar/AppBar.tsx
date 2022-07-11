import React from "react";
import AppLogo from "../../resources/images/Logo_full_VirgoCX.png";

// AppBar
export const AppBar: React.FC = ({}): JSX.Element => {
  return (
    <div className="flex w-full h-20 bg-cx-dark-purple items-center">
      <span key="app-bar-container" className="ml-8">
        <img src={AppLogo} />
      </span>
    </div>
  );
};
