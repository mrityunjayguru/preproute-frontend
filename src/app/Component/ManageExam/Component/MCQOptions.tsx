interface Option {
  _id: string;
  text: string;
  isCorrect?: boolean;
}
interface MCQOptionsProps {
  options: Option[];
  selected: string | null;
  setSelected: (value: string) => void;
}
export const MCQOptions: React.FC<MCQOptionsProps> = ({ options, selected, setSelected }) => (
  <div className="space-y-3">
    {options.map((opt, idx) => (
      <div
        key={opt._id}
        onClick={() => setSelected(opt._id)}
        className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
          selected === opt._id
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:bg-gray-50"
        }`}
      >
        <span className="w-6 h-6 flex items-center justify-center mr-3 border-2 rounded-full font-bold text-gray-500">
          {String.fromCharCode(65 + idx)}
        </span>
        <span>{opt.text}</span>
      </div>
    ))}
  </div>
);