import React from "react";

interface PriceTagProps {
  startingPrice: number;
  expectedPrice?: number;
  className?: string;
}

export default function PriceTag({ startingPrice, expectedPrice, className = "" }: PriceTagProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <div className="text-lg font-semibold text-gray-900">
        €{startingPrice.toLocaleString()}
      </div>
      {expectedPrice && (
        <div className="text-sm text-gray-600">
          Expected: €{expectedPrice.toLocaleString()}
        </div>
      )}
    </div>
  );
}
