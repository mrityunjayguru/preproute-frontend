import React, { useState, useCallback } from "react";

// ✅ Utility: Binary calculations
const performCalculation = (prev, next, op) => {
  const p = parseFloat(prev);
  const n = parseFloat(next);
  if (isNaN(p) || isNaN(n)) return next;

  switch (op) {
    case "+":
      return (p + n).toString();
    case "-":
      return (p - n).toString();
    case "*":
      return (p * n).toString();
    case "/":
      if (n === 0) return "Error: Div by Zero";
      return (p / n).toString();
    default:
      return next;
  }
};

// ✅ Reusable button component
const CalcButton = React.memo(({ label, className, onClick, isMemoryActive }) => (
  <button
    onClick={onClick}
    disabled={label === "MR" && !isMemoryActive}
    className={`
      flex items-center justify-center p-3 text-xl font-medium 
      rounded-md transition duration-150 ease-in-out shadow-sm border 
      ${className}
      ${(label === "MR" && !isMemoryActive)
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-200 active:scale-[0.98]"}
    `}
  >
    {label}
  </button>
));

const CalculatorApp = ({onClose}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memoryValue, setMemoryValue] = useState(0);

  const isMemoryActive = memoryValue !== 0;

  // ✅ Clear
  const clearCalculator = useCallback(() => {
    setDisplayValue("0");
    setOperator(null);
    setPreviousValue(null);
    setWaitingForSecondOperand(false);
  }, []);

  // ✅ Toggle sign
  const toggleSign = useCallback(() => {
    const value = parseFloat(displayValue);
    const newValue = (value * -1).toString();
    setDisplayValue(newValue);
  }, [displayValue]);

  // ✅ Backspace
  const handleBackspace = useCallback(() => {
    if (displayValue.startsWith("Error") || waitingForSecondOperand) return;
    if (displayValue.length > 1 && displayValue !== "0") {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  }, [displayValue, waitingForSecondOperand]);

  // ✅ Square root
  const handleSquareRoot = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value < 0) {
      setDisplayValue("Error: Invalid Input");
      setWaitingForSecondOperand(true);
      return;
    }
    const result = Math.sqrt(value).toString();
    setDisplayValue(result);
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  // ✅ Reciprocal
  const handleReciprocal = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value === 0) {
      setDisplayValue("Error: Div by Zero");
      setWaitingForSecondOperand(true);
      return;
    }
    const result = (1 / value).toString();
    setDisplayValue(result);
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  // ✅ Percentage
  const inputPercent = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value === 0) return;
    const newValue = (value / 100).toString();
    setDisplayValue(newValue);
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  // ✅ Memory Operations
  const handleMemory = useCallback(
    (action) => {
      const currentValue = parseFloat(displayValue);
      switch (action) {
        case "MC":
          setMemoryValue(0);
          break;
        case "MR":
          if (isMemoryActive) {
            setDisplayValue(memoryValue.toString());
            setWaitingForSecondOperand(false);
          }
          break;
        case "MS":
          setMemoryValue(currentValue);
          setWaitingForSecondOperand(true);
          break;
        case "M+":
          setMemoryValue((prev) => prev + currentValue);
          setWaitingForSecondOperand(true);
          break;
        case "M-":
          setMemoryValue((prev) => prev - currentValue);
          setWaitingForSecondOperand(true);
          break;
        default:
          break;
      }
    },
    [displayValue, isMemoryActive, memoryValue]
  );

  // ✅ Digit input
  const inputDigit = useCallback(
    (digit) => {
      if (displayValue.startsWith("Error")) clearCalculator();
      if (waitingForSecondOperand) {
        setDisplayValue(String(digit));
        setWaitingForSecondOperand(false);
      } else {
        setDisplayValue(displayValue === "0" ? String(digit) : displayValue + digit);
      }
    },
    [displayValue, waitingForSecondOperand, clearCalculator]
  );

  // ✅ Decimal input
  const inputDecimal = useCallback(() => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes(".")) {
      setDisplayValue(displayValue + ".");
    }
  }, [displayValue, waitingForSecondOperand]);

  // ✅ Operator handling
  const handleOperator = useCallback(
    (nextOperator) => {
      const inputValue = parseFloat(displayValue);

      if (previousValue == null) {
        setPreviousValue(inputValue);
        setOperator(nextOperator);
        setWaitingForSecondOperand(true);
        return;
      }

      if (waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
      }

      const result = performCalculation(previousValue, displayValue, operator);
      if (result.startsWith("Error")) {
        setDisplayValue(result);
        setPreviousValue(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
      } else {
        setDisplayValue(result);
        setPreviousValue(parseFloat(result));
        setOperator(nextOperator);
        setWaitingForSecondOperand(true);
      }
    },
    [displayValue, operator, previousValue, waitingForSecondOperand]
  );

  // ✅ Equals
  const handleEquals = useCallback(() => {
    if (previousValue == null || operator == null || waitingForSecondOperand)
      return;
    const result = performCalculation(previousValue, displayValue, operator);
    setDisplayValue(result);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  }, [displayValue, operator, previousValue, waitingForSecondOperand]);

  // ✅ Button configuration
  const buttons = [
    // Memory Row
    { label: "MC", className: "bg-gray-300 text-gray-700", action: () => handleMemory("MC") },
    { label: "MR", className: "bg-gray-300 text-gray-700", action: () => handleMemory("MR"), isMemoryActive },
    { label: "MS", className: "bg-gray-300 text-gray-700", action: () => handleMemory("MS") },
    { label: "M+", className: "bg-gray-300 text-gray-700", action: () => handleMemory("M+") },
    { label: "M-", className: "bg-gray-300 text-gray-700", action: () => handleMemory("M-") },

    // Utility Row
    { label: "←", className: "bg-red-500 text-white font-bold", action: handleBackspace },
    { label: "C", className: "bg-red-500 text-white font-bold", action: clearCalculator },
    { label: "±", className: "bg-red-500 text-white font-bold", action: toggleSign },
    { label: "√", className: "bg-gray-300 text-gray-700", action: handleSquareRoot },
    { label: "%", className: "bg-gray-300 text-gray-700", action: inputPercent },

    // 7 8 9 / 1/x
    { label: "7", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(7) },
    { label: "8", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(8) },
    { label: "9", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(9) },
    { label: "/", className: "bg-gray-300 text-gray-700", action: () => handleOperator("/") },
    { label: "1/x", className: "bg-gray-300 text-gray-700", action: handleReciprocal },

    // 4 5 6 * =
    { label: "4", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(4) },
    { label: "5", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(5) },
    { label: "6", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(6) },
    { label: "*", className: "bg-gray-300 text-gray-700", action: () => handleOperator("*") },
    { label: "=", className: "bg-green-600 text-white font-bold row-span-2", action: handleEquals },

    // 1 2 3 -
    { label: "1", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(1) },
    { label: "2", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(2) },
    { label: "3", className: "bg-white text-gray-900 font-bold", action: () => inputDigit(3) },
    { label: "-", className: "bg-gray-300 text-gray-700", action: () => handleOperator("-") },

    // 0 . +
    { label: "0", className: "col-span-2 bg-white text-gray-900 font-bold", action: () => inputDigit(0) },
    { label: ".", className: "bg-white text-gray-900 font-bold", action: inputDecimal },
    { label: "+", className: "bg-gray-300 text-gray-700", action: () => handleOperator("+") },
  ];

  return (
    <div className=" bg-gray-100 flex items-center justify-center  font-inter">
      <div className="w-full max-w-[450px] bg-white shadow-xl border border-gray-300 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#FF5635] text-white p-2">
          <h1 className="text-sm font-semibold">Calculator</h1>
          <div className="flex items-center space-x-2">
            {isMemoryActive && (
              <div className="w-5 h-5 text-xs font-bold flex items-center justify-center rounded-sm bg-white text-blue-600">
                M
              </div>
            )}
            <div onClick={onClose} className="w-6 h-6 text-sm flex items-center justify-center rounded-sm bg-red-600 hover:bg-red-700 cursor-pointer transition duration-100">
              ×
            </div>
          </div>
        </div>

        {/* Display */}
        <div className="p-4 bg-gray-200 border-b border-gray-300">
          <div className="text-gray-500 text-xs h-3 text-right font-mono">
            {isMemoryActive ? "Memory Active" : ""}
          </div>
          <div className="text-gray-900 text-4xl font-light tracking-wide text-right overflow-hidden">
            {displayValue.length > 15
              ? parseFloat(displayValue).toExponential(3)
              : displayValue}
          </div>
        </div>

        {/* Buttons */}
        <div className="p-4 grid grid-cols-5 gap-1.5">
          {buttons.map((btn) => (
            <CalcButton
              key={btn.label}
              label={btn.label}
              className={btn.className}
              onClick={btn.action}
              isMemoryActive={btn.isMemoryActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
