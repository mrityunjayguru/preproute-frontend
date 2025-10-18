import { Button } from "@/components/ui/button";

interface NumericalKeypadProps {
  value: string;
  onKeyPress: (key: string) => void;
}
export const NumericalKeypad: React.FC<NumericalKeypadProps> = ({ value, onKeyPress }) => {
  const keys = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["Clear All", "0", "⌫"],
  ];

  return (
    <div className="max-w-xs mt-2">
      <input
        type="text"
        value={value}
        className="w-full h-10 mb-4 rounded-lg border border-gray-300 px-3 text-right text-lg font-mono focus:ring-2 focus:ring-red-500"
        placeholder="Enter answer"
      />
      <div className="grid grid-cols-3 gap-2">
        {keys.flat().map((key) => (
          <Button
            key={key}
            variant={["Clear All", "⌫"].includes(key) ? "secondary" : "outline"}
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        ))}
      </div>
    </div>
  );
};