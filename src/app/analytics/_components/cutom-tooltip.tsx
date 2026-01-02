import React from "react";

interface Props {
  children: React.ReactNode;
}

const CustomAverageTooltip: React.FC<Props> = ({ children }) => {
  return (
    <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2">
      <div className="bg-white rounded-xl shadow-lg px-4 py-3 min-w-[140px] border">
        <p className="text-sm font-medium text-black font-poppins mb-1">
          Average
        </p>

        <div className="flex items-center justify-center gap-1 text-lg font-semibold">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomAverageTooltip;
