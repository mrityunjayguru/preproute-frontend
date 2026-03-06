export const exportUsersToCSV = (users: any[]) => {
  if (!users || !users.length) return;

  // 🔹 Flatten object (basic nested support)
  const flattenObject = (obj: any, parent = "", res: any = {}) => {
    for (let key in obj) {
      const propName = parent ? `${parent}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        flattenObject(obj[key], propName, res);
      } else {
        res[propName] = Array.isArray(obj[key])
          ? JSON.stringify(obj[key])
          : obj[key];
      }
    }
    return res;
  };

  const flattenedData = users.map((user) => flattenObject(user));

  // 🔹 Get Headers
  const headers = Object.keys(flattenedData[0]);

  // 🔹 Convert to CSV
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(","));

  // Add rows
  for (const row of flattenedData) {
    const values = headers.map((header) => {
      const escaped = (`${row[header] ?? ""}`).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  const csvString = csvRows.join("\n");

  // 🔹 Create File Name with Current Date & Time
  const now = new Date();
  const formattedDate = now
    .toISOString()
    .replace(/T/, "_")
    .replace(/:/g, "-")
    .split(".")[0];

  const fileName = `users_${formattedDate}.csv`;

  // 🔹 Download File
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
};