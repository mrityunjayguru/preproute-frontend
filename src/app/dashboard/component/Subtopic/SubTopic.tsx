import React, { useState } from "react";

function SubTopic() {
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [errors, setErrors] = useState<any>({});

  // Example topics (you can fetch from API)
  const topics = ["Mathematics", "Physics", "Chemistry", "Biology"];

  const handleSubmit = (e:any) => {
    e.preventDefault();

    let newErrors:any = {};
    if (!topic) newErrors.topic = "Please select a topic";
    if (!subtopic.trim()) newErrors.subtopic = "Subtopic name is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert(`✅ Submitted\nTopic: ${topic}\nSubtopic: ${subtopic}`);
      // call API here
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Add Subtopic</h2>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {/* Topic Dropdown */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">-- Select Topic --</option>
            {topics.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.topic && <p className="text-red-500 text-sm">{errors.topic}</p>}
        </div>

        {/* Subtopic Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Subtopic Name</label>
          <input
            type="text"
            placeholder="Enter subtopic name"
            value={subtopic}
            onChange={(e) => setSubtopic(e.target.value)}
            className="w-full border border-[#EBEBEB] rounded px-3 py-2 text-sm font-medium text-[#585859] focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.subtopic && (
            <p className="text-red-500 text-sm">{errors.subtopic}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubTopic;
