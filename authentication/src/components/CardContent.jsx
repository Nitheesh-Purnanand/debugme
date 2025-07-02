import React from "react";

const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`text-white text-sm ${className}`}>
      {children}
    </div>
  );
};

export default CardContent;
