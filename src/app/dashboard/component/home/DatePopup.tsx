"use client";

import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (date: Date | null) => void;
}

export default function DatePopup({ isOpen, onClose, onSelect }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  if (!isOpen) return null;

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleSelectDate = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date);
  };

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[350px]">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="px-2 text-lg">◀</button>
          <h2 className="font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={handleNextMonth} className="px-2 text-lg">▶</button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 text-center font-medium text-sm mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isSelected =
              selectedDate &&
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === currentMonth &&
              selectedDate.getFullYear() === currentYear;

            return (
              <div
                key={day}
                onClick={() => handleSelectDate(day)}
                className={`cursor-pointer p-2 rounded-md hover:bg-blue-100
                  ${isSelected ? "bg-blue-600 text-white" : ""}
                `}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onSelect(selectedDate);
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
