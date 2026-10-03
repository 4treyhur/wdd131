// Reads the query string produced by the GET form submission on form.html,
// renders a human-readable confirmation, and tracks a running review count
// in localStorage (loaded earlier on the page from scripts/products.js).

function findProductName(id) {
  const product = products.find((p) => p.id === id);
  return product ? product.name : id;
}

function formatRating(value) {
  const num = Number(value);
  if (!num) return "Not rated";
  return `${"★".repeat(num)}${"☆".repeat(5 - num)} (${num} of 5)`;
}

function formatDate(value) {
  if (!value) return "Not provided";
  // Parse as a local date (not UTC) so the displayed day matches what was picked.
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatFeatures(params) {
  const features = params.getAll("features");
  return features.length ? features.join(", ") : "None selected";
}

function renderConfirmation(params) {
  const intro = document.getElementById("confirmationIntro");
  const list = document.getElementById("confirmationList");
  if (!list || !intro) return;

  const hasSubmission = [...params.keys()].length > 0;

  if (!hasSubmission) {
    intro.textContent =
      "No review data was found. Please fill out the review form first.";
    return;
  }

  intro.textContent = "Thanks! Here's what you submitted:";

  const entries = [
    ["Product", findProductName(params.get("productName"))],
    ["Overall Rating", formatRating(params.get("rating"))],
    ["Date of Installation", formatDate(params.get("installDate"))],
    ["Useful Features", formatFeatures(params)],
    ["Written Review", params.get("review") || "No written review provided"],
    ["Submitted By", params.get("userName") || "Anonymous"],
  ];

  entries.forEach(([term, description]) => {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = description;
    list.append(dt, dd);
  });
}

function updateReviewCount(hasSubmission) {
  const countEl = document.getElementById("reviewCount");
  if (!countEl) return;

  let count = Number(localStorage.getItem("reviewCount")) || 0;

  // Only increment when the page was reached via a real form submission
  // (i.e. a query string is present), not on a bare visit to review.html.
  if (hasSubmission) {
    count += 1;
    localStorage.setItem("reviewCount", String(count));
  }

  countEl.textContent = count;
}

const params = new URLSearchParams(window.location.search);
const hasSubmission = [...params.keys()].length > 0;

renderConfirmation(params);
updateReviewCount(hasSubmission);