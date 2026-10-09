document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  const mod = document.getElementById("lastModified");
  if (year) year.textContent = new Date().getFullYear();
  if (mod) mod.textContent = "Last Modified: " + document.lastModified;
});
