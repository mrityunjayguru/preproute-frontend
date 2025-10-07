export const QuoteComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 p-6 md:p-8 text-center md:text-left">
      {/* Opening Quote */}
      <span className="text-5xl md:text-6xl font-bold textorange">
        ❝
      </span>

      {/* Quote Text */}
      <div className="flex-1 max-w-xl flex flex-col justify-center">
        <p className="text-lg md:text-xl text-[#000000] leading-relaxed font-semibold">
          Exams are not just a test of knowledge, but of preparation —{" "}
          <span className="textorange">
            practice today to conquer tomorrow.
          </span>
        </p>
      </div>

      {/* Closing Quote */}
      <span className="text-5xl md:text-6xl font-bold textorange -mt-2 md:-mt-4">
        ❞
      </span>
    </div>
  );
};
