import React from "react";

const StockSection = () => {
  const stocks = [
    { name: "Dog Food", price: "$25", change: "+2%" },
    { name: "Cat Accessories", price: "$15", change: "-1%" },
    { name: "Hen Feed", price: "$10", change: "+3%" },
    { name: "Pet Toys", price: "$8", change: "-0.5%" },
  ];

  return (
    <div className="w-full bg-gray-100 py-10">
      <h2 className="text-center text-3xl font-bold mb-6">
        Current Moving Stocks
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stocks.map((stock, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <h3 className="text-lg font-bold mb-2">{stock.name}</h3>
            <p className="text-sm text-gray-600">Price: {stock.price}</p>
            <p
              className={`text-sm font-medium mt-2 ${
                stock.change.startsWith("+") ? "text-green-500" : "text-red-500"
              }`}
            >
              Change: {stock.change}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockSection;
