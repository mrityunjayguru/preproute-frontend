import React from "react";

// Simple Card component
interface CardProps {
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-xl border border-none bg-[#F7F7F5] ${className}`}>
    {children}
  </div>
);

// Simple CardContent component
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <div className={`p-6 ${className}`}>{children}</div>;

const CardPage = () => {
  return (
    <div className="min-h-screen bg-[#fff] my-10 flex items-center justify-center p-6 font-sans">
      <div className="max-w-6xl w-full space-y-10">
        {/* Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <Card className="min-h-60" />

          <div className="md:col-span-1 lg:col-span-2 flex items-center">
            <div>
              <h2 className="text-2xl font-semibold textorange mb-2">
                Personalized Learning Paths
              </h2>
              <p className="text-[#000000] leading-relaxed">
                Tailored study plans that adapt to your strengths and weaknesses,
                helping you focus where it matters most.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 lg:col-span-2 flex items-center order-2 md:order-1">
            <div>
              <h2 className="text-2xl font-semibold textorange mb-2">
                Comprehensive Practice
              </h2>
              <p className="text-[#000000] leading-relaxed">
                Full-length mocks, sectional tests, and topic-wise quizzes to
                simulate real exam conditions and track progress.
              </p>
            </div>
          </div>

          <Card className="min-h-60 order-1 md:order-2" />
        </div>

        {/* Section 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <Card className="min-h-60" />

          <div className="md:col-span-1 lg:col-span-2 flex items-center">
            <div>
              <h2 className="text-2xl font-semibold textorange mb-2">
                Expert-Curated Content
              </h2>
              <p className="text-[#000000] leading-relaxed">
                High-quality material and strategies crafted by experienced
                educators and exam mentors.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 lg:col-span-2 flex items-center order-2 md:order-1">
            <div>
              <h2 className="text-2xl font-semibold textorange mb-2">
                Comprehensive Practice
              </h2>
              <p className="text-[#000000] leading-relaxed">
                Full-length mocks, sectional tests, and topic-wise quizzes to
                simulate real exam conditions and track progress.
              </p>
            </div>
          </div>

          <Card className="min-h-60 order-1 md:order-2" />
        </div>
      </div>
    </div>
  );
};

export default CardPage;
