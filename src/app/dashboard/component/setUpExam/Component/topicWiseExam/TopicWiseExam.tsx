import React from 'react';
import ExamForm from './ExamForm';
import ExamTable from './ExamTable';

const TopicWiseExam: React.FC<{ data?: any }> = ({ data }) => {
  return (
    <div className="flex-1 bg-[#ffffff]">
      <ExamForm data={data} />
      <ExamTable data={data} />
    </div>
  );
};

export default TopicWiseExam;
