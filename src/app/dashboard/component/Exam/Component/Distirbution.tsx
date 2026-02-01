import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

interface SummaryTableProps {
  open: boolean;
  onClose: () => void;
}

const SummaryTable = ({ open, onClose }: SummaryTableProps) => {
  /* ================= REDUX ================= */
  const topicDistribution = useSelector(
    (state: any) => state.question.topicDistribution
  );

  const sectionSummary = useSelector(
    (state: any) => state.question.sectionSummary
  );

  /* ================= STATE ================= */
  const [activeSection, setActiveSection] = useState(0);

  /* ================= MEMO (MUST BE BEFORE RETURN) ================= */
  const sectionSummaryMap = useMemo(() => {
    return topicDistribution?.sectionSummary?.reduce((acc: any, item: any) => {
      acc[item.sectionName] = item;
      return acc;
    }, {});
  }, [sectionSummary]);

  const selectedSection = topicDistribution?.topicDistribution?.[activeSection];

  /* ================= CONDITIONAL RENDER ================= */
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0  bg-opacity-40"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-white w-[95%] max-w-7xl max-h-[85vh] overflow-y-auto rounded-lg shadow-lg p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-600">
            Question Summary
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="flex gap-6">
          {/* LEFT SECTION LIST */}
          <div className="w-72 border rounded-md p-3 space-y-2">
            {topicDistribution?.topicDistribution?.map((section: any, index: number) => {
              const summary =
                sectionSummaryMap?.[section.sectionName];

              return (
                <button
                  key={index}
                  onClick={() => setActiveSection(index)}
                  className={`w-full text-left px-3 py-3 rounded-md border transition
                    ${
                      activeSection === index
                        ? "bg-blue-50 border-blue-400"
                        : "hover:bg-gray-50"
                    }`}
                >
                  <div className="font-semibold text-sm text-gray-800">
                    {section.sectionName}
                  </div>

                  {summary && (
                    <div className="grid grid-cols-5 gap-1 mt-2 text-xs text-center">
                      <Badge label="E" value={summary.Easy} />
                      <Badge label="M" value={summary.Medium} />
                      <Badge label="H" value={summary.Hard} />
                      <Badge label="N" value={summary.Normal} />
                      <Badge label="P" value={summary.Past} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 space-y-6">
            {selectedSection?.topics?.map((topic: any, tIndex: number) => (
              <div
                key={tIndex}
                className="border rounded-md overflow-hidden"
              >
                <div className="grid grid-cols-6 bg-blue-700 text-white text-sm font-medium">
                  <div className="p-3">
                    {topic.topicName?.trim() || "No Topic"}
                  </div>
                  <div className="p-3 text-center">Easy</div>
                  <div className="p-3 text-center">Medium</div>
                  <div className="p-3 text-center">Hard</div>
                  <div className="p-3 text-center">Normal</div>
                  <div className="p-3 text-center">Passage</div>
                </div>

                {topic.rows?.length > 0 ? (
                  topic.rows.map((row: any, i: number) => (
                    <div
                      key={i}
                      className="grid grid-cols-6 border-t text-sm"
                    >
                      <div className="p-3">
                        {row.subtopicName?.trim() || "No Subtopic"}
                      </div>

                      <Cell value={row.Easy} />
                      <Cell value={row.Medium} />
                      <Cell value={row.Hard} />
                      <Cell value={row.Normal} />
                      <Cell value={row.Past ?? 0} />
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-sm text-gray-500">
                    No subtopics available
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= CELL ================= */
const Cell = ({ value }: { value: number }) => (
  <div
    className={`p-3 text-center font-semibold ${
      value > 0 ? "text-red-600" : "text-gray-400"
    }`}
  >
    {value}
  </div>
);

/* ================= BADGE ================= */
const Badge = ({ label, value }: { label: string; value: number }) => (
  <div
    className={`rounded px-1 py-[2px] font-semibold ${
      value > 0 ? "text-red-600" : "text-gray-400"
    }`}
  >
    {label}:{value}
  </div>
);

export default SummaryTable;
