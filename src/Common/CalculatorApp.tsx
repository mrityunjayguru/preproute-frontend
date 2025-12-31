import { X } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";

// Utility for binary calculations
const performCalculation = (prev, next, op) => {
  const p = parseFloat(prev);
  const n = parseFloat(next);
  if (isNaN(p) || isNaN(n)) return next;

  switch (op) {
    case "+": return (p + n).toString();
    case "-": return (p - n).toString();
    case "*": return (p * n).toString();
    case "/": return n === 0 ? "Error: Div by Zero" : (p / n).toString();
    default: return next;
  }
};

const CalcButton = React.memo(({ label, className, onClick, isMemoryActive }) => (
  <button
    onClick={onClick}
    disabled={label === "MR" && !isMemoryActive}
    className={`flex items-center justify-center p-3 text-xl font-medium 
      rounded-md transition duration-150 ease-in-out shadow-sm border 
      ${className}
      ${(label === "MR" && !isMemoryActive)
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-200 active:scale-[0.98]"}`}
  >
    {label}
  </button>
));

const CalculatorApp = ({ onClose, initialPosition }) => {

  // -------------------- DRAG LOGIC --------------------
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
const [position, setPosition] = useState(initialPosition);


  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  });

  // -----------------------------------------------------

  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [memoryValue, setMemoryValue] = useState(0);

  const isMemoryActive = memoryValue !== 0;

  const clearCalculator = useCallback(() => {
    setDisplayValue("0");
    setOperator(null);
    setPreviousValue(null);
    setWaitingForSecondOperand(false);
  }, []);

  const toggleSign = useCallback(() => {
    const value = parseFloat(displayValue);
    setDisplayValue((value * -1).toString());
  }, [displayValue]);

  const handleBackspace = useCallback(() => {
    if (displayValue.startsWith("Error") || waitingForSecondOperand) return;
    if (displayValue.length > 1 && displayValue !== "0") {
      setDisplayValue(displayValue.slice(0, -1));
    } else {
      setDisplayValue("0");
    }
  }, [displayValue, waitingForSecondOperand]);

  const handleSquareRoot = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value < 0) {
      setDisplayValue("Error: Invalid Input");
      setWaitingForSecondOperand(true);
      return;
    }
    setDisplayValue(Math.sqrt(value).toString());
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  const handleReciprocal = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value === 0) {
      setDisplayValue("Error: Div by Zero");
      setWaitingForSecondOperand(true);
      return;
    }
    setDisplayValue((1 / value).toString());
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  const inputPercent = useCallback(() => {
    const value = parseFloat(displayValue);
    if (value === 0) return;
    setDisplayValue((value / 100).toString());
    setWaitingForSecondOperand(true);
  }, [displayValue]);

  const handleMemory = useCallback(
    (action) => {
      const currentValue = parseFloat(displayValue);
      switch (action) {
        case "MC": return setMemoryValue(0);
        case "MR":
          if (isMemoryActive) {
            setDisplayValue(memoryValue.toString());
            setWaitingForSecondOperand(false);
          }
          break;
        case "MS": setMemoryValue(currentValue); setWaitingForSecondOperand(true); break;
        case "M+": setMemoryValue((prev) => prev + currentValue); setWaitingForSecondOperand(true); break;
        case "M-": setMemoryValue((prev) => prev - currentValue); setWaitingForSecondOperand(true); break;
        default: break;
      }
    },
    [displayValue, isMemoryActive, memoryValue]
  );

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

  const handleEquals = useCallback(() => {
    if (previousValue == null || operator == null || waitingForSecondOperand) return;
    const result = performCalculation(previousValue, displayValue, operator);
    setDisplayValue(result);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  }, [displayValue, operator, previousValue, waitingForSecondOperand]);

  const buttons = [
    { label: "MC", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleMemory("MC") },
    { label: "MR", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleMemory("MR"), isMemoryActive },
    { label: "MS", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleMemory("MS") },
    { label: "M+", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleMemory("M+") },
    { label: "M-", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleMemory("M-") },

    { label: "←", className: "bg-red-500 text-white font-bold cursor-pointer", action: handleBackspace },
    { label: "C", className: "bg-red-500 text-white font-bold cursor-pointer", action: clearCalculator },
    { label: "±", className: "bg-red-500 text-white font-bold cursor-pointer", action: toggleSign },
    { label: "√", className: "bg-gray-300 text-gray-700 cursor-pointer", action: handleSquareRoot },
    { label: "%", className: "bg-gray-300 text-gray-700 cursor-pointer", action: inputPercent },

    { label: "7", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(7) },
    { label: "8", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(8) },
    { label: "9", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(9) },
    { label: "/", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleOperator("/") },
    { label: "1/x", className: "bg-gray-300 text-gray-700 cursor-pointer", action: handleReciprocal },

    { label: "4", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(4) },
    { label: "5", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(5) },
    { label: "6", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(6) },
    { label: "*", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleOperator("*") },
    { label: "=", className: "bg-green-600 text-white font-bold row-span-2 cursor-pointer", action: handleEquals },

    { label: "1", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(1) },
    { label: "2", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(2) },
    { label: "3", className: "bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(3) },
    { label: "-", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleOperator("-") },

    { label: "0", className: "col-span-2 bg-white text-gray-900 font-bold cursor-pointer", action: () => inputDigit(0) },
    { label: ".", className: "bg-white text-gray-900 font-bold cursor-pointer", action: inputDecimal },
    { label: "+", className: "bg-gray-300 text-gray-700 cursor-pointer", action: () => handleOperator("+") },
  ];

  return (
    <div
      className="fixed font-inter"
      style={{
        top: position.y,
        left: position.x,
        zIndex: 9999,
      }}
    >
      <div className="w-full max-w-[450px] font-poppins bg-white shadow-xl border border-gray-300 rounded-lg overflow-hidden">

        {/* HEADER (DRAG HANDLE) */}
        <div
          onMouseDown={handleMouseDown}
          className="flex justify-between items-center bg-[#FF5635] text-white p-2 cursor-move select-none"
        >
          <h1 className="text-sm font-medium">Calculator</h1>
          <div className="flex items-center space-x-2">
            {isMemoryActive && (
              <div className="w-5 h-5 text-xs font-bold flex items-center justify-center rounded-sm bg-white text-blue-600">
                M
              </div>
            )}
            <div
              onClick={onClose}
              className="w-6 h-6 text-sm flex items-center justify-center rounded-sm bg-red-600 hover:bg-red-700 cursor-pointer"
            >
            <X/>
            </div>
          </div>
        </div>

        {/* DISPLAY */}
        <div className="p-4 bg-gray-200 border-b border-gray-300 font-poppins">
          <div className="text-gray-500 text-xs h-3 text-right font-mono">
            {isMemoryActive ? "Memory Active" : ""}
          </div>
          <div className="text-gray-900 text-4xl font-light tracking-wide text-right overflow-hidden">
            {displayValue.length > 15
              ? parseFloat(displayValue).toExponential(3)
              : displayValue}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="p-4 grid grid-cols-5 gap-1.5 font-poppins">
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
