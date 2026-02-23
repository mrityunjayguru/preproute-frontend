export const capitalizeWords = (text?: string) =>
  text
    ? text
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

  export   const formatMinutesSeconds = (totalSeconds: number): string => {
  if (!totalSeconds || totalSeconds <= 0) return "0.00";

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}.${seconds.toString().padStart(2, "0")}`;
};