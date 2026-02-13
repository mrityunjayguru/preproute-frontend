export const PRICING_DATA = {
    ipmat: {
        plans: [
            {
                id: "basic",
                title: "Basic",
                price: "1999",
                buttonClass: "bg-[#ECE6FA] text-[#8B5CF6]",
                inputClass: "border-gray-200",
                highlight: false,
            },
            {
                id: "pro",
                title: "Pro",
                price: "2999",
                buttonClass: "bg-[#FF5635] text-white",
                inputClass: "border-[#FF5635]",
                highlight: true,
            },
            {
                id: "elite",
                title: "Elite",
                price: "3999",
                buttonClass: "bg-[#FACC15] text-black",
                inputClass: "border-[#FACC15]",
                highlight: false,
            },
        ],
        sections: [
            {
                title: "Mocks",
                rows: [
                    { label: "Indore", values: ["5", "15", "25"] },
                    { label: "Rohtak", values: ["5", "15", "25"] },
                    { label: "JIPMAT", values: ["5", "15", "25"] },
                    { label: "NPAT", values: ["2", "5", "10"] },
                    { label: "SET", values: ["2", "5", "10"] },
                    { label: "IIMDBE", values: ["-", "5", "10"] },
                    { label: "St.Xavier's", values: ["-", "5", "10"] },
                ],
            },
            {
                title: "Features",
                rows: [
                    { label: "Past Year Paper (PYQs)", values: [false, true, true], isFeature: true },
                    { label: "Sectional Test", values: [false, true, true], isFeature: true },
                    { label: "Topic-wise Test", values: [false, true, true], isFeature: true },
                    { label: "Daily Practice", values: [false, true, true], isFeature: true },
                    { label: "Community Access", values: [false, false, true], isFeature: true },
                    { label: "Interview Prep Support", values: [false, false, true], isFeature: true },
                ],
            },
        ],
    },
    cuet: {
        plans: [
            {
                id: "basic",
                title: "Basic",
                price: "999",
                buttonClass: "bg-[#ECE6FA] text-[#8B5CF6]",
                inputClass: "border-gray-200",
                highlight: false,
            },
            {
                id: "pro",
                title: "Pro",
                price: "1999",
                buttonClass: "bg-[#FF5635] text-white",
                inputClass: "border-[#FF5635]",
                highlight: true,
            },
            {
                id: "elite",
                title: "Elite",
                price: "2999",
                buttonClass: "bg-[#FACC15] text-black",
                inputClass: "border-[#FACC15]",
                highlight: false,
            },
        ],
        sections: [
            {
                title: "Mocks",
                rows: [
                    { label: "Full Length Mocks", values: ["5", "10", "15"] },
                    { label: "Sectional Tests", values: ["10", "20", "30"] }
                ],
            },
            {
                title: "Features",
                rows: [
                    { label: "Past Year Paper (PYQs)", values: [false, true, true], isFeature: true },
                    { label: "Topic-wise Test", values: [false, true, true], isFeature: true },
                ]
            }
        ],
    },
};
