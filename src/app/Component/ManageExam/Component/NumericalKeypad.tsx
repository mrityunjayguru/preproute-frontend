import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";

interface NumericalKeypadProps {
  value: string;
  onKeyPress: (key: string) => void;
}
export const NumericalKeypad: React.FC<NumericalKeypadProps> = ({ value, onKeyPress }) => {
  const keys = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["Clear", "0", "⌫"],
  ];

  return (
    <div className="mt-3 ">
      <div className="w-fit">
        <input
          type="text"
          value={value}
          readOnly
          className="max-w-4xl h-10 mb-4 rounded border border-[#E2E8F0] px-4 text-right text-lg font-poppins bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        // placeholder="Enter answer"
        />
        <div className="grid grid-cols-3 gap-2 max-w-xs bg-[#F9FAFC] border border-[#F3F4F6] p-2">
          {keys.flat().map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key === "Clear" ? "Clear All" : key)}
              className={`h-10 rounded-[8px] border font-medium font-poppins transition-colors ${["Clear", "⌫"].includes(key)
                ? "bg-gradient-to-t from-[#F0F9FF] to-white border border-[#C8DCFE]"
                : "bg-gradient-to-t from-[#F0F9FF] to-white border border-[#C8DCFE] "
                }`}
            >
              {key === "⌫" ? (
                <span className="flex justify-center items-center">
                  <Delete />
                </span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};