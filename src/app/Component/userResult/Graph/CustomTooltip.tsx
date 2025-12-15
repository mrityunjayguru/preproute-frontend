export const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  const attemptedPercent =
    data.total > 0
      ? Math.round((data.attempted / data.total) * 100)
      : 0;

  const successPercent =
    data.attempted > 0
      ? Math.round((data.correct / data.attempted) * 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-[220px] border">
      <h3 className="font-semibold text-gray-800 text-lg mb-3">
        {data.name} Section
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Total</span>
          <span className="font-medium">{data.total}</span>
        </div>

        <div className="flex justify-between bg-gray-100 px-3 py-1 rounded-md">
          <span className="text-gray-600">
            Attempted <span className="text-xs">({attemptedPercent}%)</span>
          </span>
          <span className="font-medium">{data.attempted}</span>
        </div>

        <div className="flex justify-between bg-blue-50 px-3 py-1 rounded-md">
          <span className="text-blue-600">
            Success <span className="text-xs">({successPercent}%)</span>
          </span>
          <span className="font-medium">{data.correct}</span>
        </div>
      </div>

      <div className="flex justify-between text-xs mt-4 pt-3 border-t">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
          Correct {data.correct}
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full" />
          Wrong {data.wrong}
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-gray-300 rounded-full" />
          Missed {data.missed}
        </div>
      </div>
    </div>
  );
};
