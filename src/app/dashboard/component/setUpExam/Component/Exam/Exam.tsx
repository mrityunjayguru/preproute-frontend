import React from 'react';
import ExamForm from './ExamForm';
import ExamTable from './ExamTable';

const CreateExamPage: React.FC = () => {
  return (
    <div className="flex-1 bg-[#ffffff]">
      <ExamForm />
      <ExamTable />
    </div>
  );
};

export default CreateExamPage;
