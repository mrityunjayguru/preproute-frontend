if (typeof window !== "undefined") {
  // Disable copy
  document.addEventListener("copy", (e) => e.preventDefault());

  // Disable cut
  document.addEventListener("cut", (e) => e.preventDefault());

  // Disable paste
  document.addEventListener("paste", (e) => e.preventDefault());

  // Disable right-click
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Disable text selection
  document.addEventListener("selectstart", (e) => e.preventDefault());
}
