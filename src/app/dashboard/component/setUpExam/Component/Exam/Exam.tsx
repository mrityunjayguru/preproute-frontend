import React from 'react';
import ExamForm from './ExamForm';
import ExamTable from './ExamTable';

const CreateExamPage: React.FC<{ data?: any }> = ({ data }) => {
  // console.log(data,"datadatadatadata")
  return (
    <div className="flex-1 bg-[#ffffff]">
      <ExamForm data={data} />
      <ExamTable data={data} />
    </div>
  );
};

export default CreateExamPage;
