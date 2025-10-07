import React from 'react';

// --- Icon Components (Simulating Lucide/Font Awesome) ---

const LockIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={`text-red-500 ${className}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// --- Component: Topic Row ---

type Topic = {
  name: string;
  status: string;
};

const TopicRow = ({ topic }: { topic: Topic }) => {
  const isLocked = topic.status === 'Locked';
  const actionText = topic.status === 'Resume' ? 'Resume' : 'Start Practice';

  return (
    <div className="flex items-center justify-between py-3 px-4 border-b border-gray-100 last:border-b-0">
      
      {/* Topic Name */}
      <p className="flex-1 text-gray-700 font-medium">
        {topic.name}
      </p>

      {/* Status */}
      <p className="w-32 text-right text-gray-500 text-sm">
        {topic.status === 'Locked' ? 'Unattempted' : topic.status}
      </p>

      {/* Action */}
      <div className="w-32 flex justify-end">
        {isLocked ? (
          <LockIcon />
        ) : (
          <button className="text-red-600 hover:text-red-700 font-semibold text-sm transition-colors">
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

// --- Component: Topic Category Card ---

type Category = {
  title: string;
  topics: Topic[];
};

const TopicCategory = ({ category }: { category: Category }) => (
  <div className="mb-8 rounded-xl bg-white shadow-md border border-gray-100 overflow-hidden">
    
    {/* Category Header */}
    <div className="px-4 py-3 border-b border-gray-100">
      <h2 className="text-xl font-bold text-red-600">
        {category.title}
      </h2>
    </div>

    {/* List Headers (hidden on mobile for space) */}
    <div className="hidden sm:flex items-center justify-between py-2 px-4 bg-gray-50 text-xs font-semibold text-gray-500 border-b border-gray-200">
        <p className="flex-1">Topic</p>
        <p className="w-32 text-right">Status</p>
        <p className="w-32 text-right">Action</p>
    </div>

    {/* Topic List */}
    <div className="divide-y divide-gray-50">
      {category.topics.map((topic, index) => (
        <TopicRow key={index} topic={topic} />
      ))}
    </div>
  </div>
);

// --- Main App Component ---

const TopPratices = () => {
  // Mock Data Structure
  const mockData = [
    {
      title: "Arithmetic",
      topics: [
        { name: "Time & Work", status: "Resume" },
        { name: "Mean, Median & Mode", status: "Unattempted" },
        { name: "Time, Speed and Distance", status: "Locked" },
      ],
    },
    {
      title: "Geometry",
      topics: [
        { name: "Trigonometry", status: "Locked" },
        { name: "Solids", status: "Unattempted" },
        { name: "Polygons", status: "Locked" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Practice Modules</h1>
        
        {mockData.map((category, index) => (
          <TopicCategory key={index} category={category} />
        ))}
        
      </div>
    </div>
  );
};

export default TopPratices;
