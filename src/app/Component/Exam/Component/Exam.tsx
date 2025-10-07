import React, { useState } from 'react';

// --- Utility Components (Mimicking shadcn/ui) ---

// Lock Icon (lucide-react style)
const LockIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// Chevron Down Icon (lucide-react style)
const ChevronDownIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

// Button Component (Mimicking shadcn/ui Button)
type ButtonProps = {
  variant?: 'default' | 'secondary' | 'primary' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ variant = 'default', size = 'default', className = '', children, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  const variantStyles = {
    default: 'bg-gray-900 text-gray-50 hover:bg-gray-900/90', // Black
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200', // Light Gray
    primary: 'bg-red-600 text-white hover:bg-red-700', // Red for Syllabus
    outline: 'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900', // Outline
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component (Mimicking shadcn/ui Card)
type CardProps = {
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
};

const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Mock Data ---

const mockExams = [
  { name: 'Warm Up', status: 'Free', isLocked: false, description: 'Unattempted' },
  { name: 'One', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Two', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Three', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Four', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Five', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Six', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Seven', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Eight', status: 'Locked', isLocked: true, description: 'Unattempted' },
  { name: 'Nine', status: 'Locked', isLocked: true, description: 'Unattempted' },
];

// --- Main Components ---

const MockExamCard = ( exam:any ) => {
  return (
    <Card className={`p-6 flex flex-col h-full ${exam.isLocked ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
            Mock Exam
          </span>
          <h3 className={`text-xl font-bold mt-1 ${exam.isLocked ? 'text-gray-400' : 'text-gray-800'}`}>
            {exam.name}
          </h3>
          {exam.status === 'Free' && (
             <span className="text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                Free
            </span>
          )}
        </div>
        {exam.isLocked && <LockIcon className="mt-1" />}
      </div>

      <p className={`text-sm mt-auto ${exam.isLocked ? 'text-gray-400' : 'text-gray-500'}`}>
        {exam.description}
      </p>

      {!exam.isLocked && (
        <Button variant="secondary" className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 self-start">
          Start
        </Button>
      )}
    </Card>
  );
};



const UserExam = () => {
  return (
    // Outer container for padding and background color
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Main Content Area */}
      <main className="container mx-auto px-6 md:px-12 py-10">
        
        {/* Course Title and Description */}
        <div className="mb-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            IPMAT Indore: Mock
          </h1>
          <p className="text-base text-gray-600 leading-relaxed">
            The Prep Route mock tests are carefully designed to mirror the question style, difficulty level, and time pressure of the actual exam. Read this document to learn more.
          </p>
        </div>

        {/* Mock Exam Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockExams.map((exam, index) => (
            <MockExamCard key={index} exam={exam} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserExam;
