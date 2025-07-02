import React from "react";

const Card = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-lg ${className}`}>
      {title && <h2 className="text-cyan-400 text-xl font-semibold mb-4">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;
