import { Check, Minus } from "lucide-react";
import React from "react";

interface PricingTableProps {
    data: {
        plans: any[];
        sections: any[];
    };
}

export default function PricingTable({ data }: PricingTableProps) {
    if (!data) return null;

    // Helper to get classes for a plan cell (header or body)
    const getPlanColumnClass = (
        plan: any,
        isHeader = false,
        isLastRow = false,
    ) => {
        const baseClass = plan.highlight ? "bg-[#F5F7FA] relative z-10" : "";
        const borderClass =
            plan.highlight || isHeader ? "border-none" : "border-b border-gray-50";

        let roundedClass = "";
        if (plan.highlight) {
            if (isHeader) roundedClass = "rounded-t-2xl";
            if (isLastRow) roundedClass = "rounded-b-2xl";
        }

        return `${baseClass} ${borderClass} ${roundedClass}`.trim();
    };

    return (
        <div className="w-full mx-auto flex justify-center items-center py-6 sm:py-10 bg-white overflow-x-auto max-w-5xl">
            <table className="w-full border-collapse bg-white text-[#333333] text-sm sm:text-base">
                <thead>
                    <tr>
                        <th className="w-[25%] p-4 bg-white"></th>
                        {data.plans.map((plan: any, pIdx: number) => (
                            <th
                                key={pIdx}
                                className={`w-[25%] align-bottom pb-4 ${getPlanColumnClass(plan, true)}`}
                            >
                                <div className="flex flex-col justify-end items-center gap-1 px-4">
                                    <h3
                                        className={`text-lg sm:text-xl font-bold ${plan.highlight ? "text-[#FF5635]" : "text-[#FF5635]"}`}
                                    >
                                        {plan.title}
                                    </h3>
                                    <p className="text-2xl sm:text-3xl font-bold text-black">
                                        ₹ {plan.price}
                                    </p>

                                    <div className="mt-3 mb-2 w-full">
                                        <button
                                            className={`w-full py-2.5 rounded-full text-sm font-semibold transition-all ${plan.buttonClass}`}
                                        >
                                            Get Started
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 mb-4 w-full">
                                        <div className="flex flex-col w-full gap-1">
                                            <p className="text-[10px] text-gray-400 text-left pl-1 font-normal">
                                                Got a coupon
                                            </p>
                                            <div className="flex gap-1 h-8">
                                                <input
                                                    className={`border rounded-md px-2 py-1 text-xs w-full focus:outline-none ${plan.inputClass}`}
                                                />
                                                <button
                                                    className={`text-xs px-3 py-1 border rounded-md font-medium ${plan.highlight ? "bg-[#FF5635] text-white border-[#FF5635]" : "bg-[#F2F2F2] text-black border-gray-200"}`}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.sections.map((section: any, sIdx: number) => (
                        <React.Fragment key={sIdx}>
                            {/* Section Title Row */}
                            <tr>
                                <td className="px-4 py-4 font-medium text-[#FF5635] text-left">
                                    {section.title}
                                </td>
                                {data.plans.map((plan: any, pIdx: number) => (
                                    <td key={pIdx} className={getPlanColumnClass(plan)}></td>
                                ))}
                            </tr>

                            {/* Section Rows */}
                            {section.rows.map((row: any, rIdx: number) => {
                                const isLastGlobalRow =
                                    sIdx === data.sections.length - 1 &&
                                    rIdx === section.rows.length - 1;

                                return (
                                    <tr key={rIdx}>
                                        <td className="px-4 py-4 border-b border-gray-100 text-[#333333] font-medium text-left bg-white h-[57px]">
                                            {row.label}
                                        </td>
                                        {data.plans.map((plan: any, pIdx: number) => {
                                            const value = row.values[pIdx];
                                            const isFeature = row.isFeature;

                                            return (
                                                <td
                                                    key={pIdx}
                                                    className={`h-[57px] align-middle ${getPlanColumnClass(plan, false, isLastGlobalRow)}`}
                                                >
                                                    <div className="flex justify-center items-center">
                                                        {isFeature ? (
                                                            value ? (
                                                                <div className="bg-[#22C55E] rounded-full p-0.5">
                                                                    <Check
                                                                        className="w-4 h-4 text-white"
                                                                        strokeWidth={3}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <Minus className="w-4 h-4 text-gray-300" />
                                                            )
                                                        ) : (
                                                            <span
                                                                className={`font-semibold ${plan.highlight ? "text-[#FF5635]" : "text-[#333333]"}`}
                                                            >
                                                                {value}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </React.Fragment>
                    ))}
                    {/* Optional: Add a spacer row at bottom if needed for rounded corners visualization or padding */}
                    <tr>
                        <td></td>
                        {data.plans.map((plan: any, pIdx: number) => (
                            <td
                                key={pIdx}
                                className={
                                    plan.highlight ? "h-4 bg-[#FFECDF] rounded-b-2xl" : ""
                                }
                            ></td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
