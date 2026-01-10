export const capitalizeWords = (text?: string) =>
  text
    ? text
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";