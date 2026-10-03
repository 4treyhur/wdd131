// Populates the Product Name select element using the `products` array
// (loaded earlier on the page from scripts/products.js).
// Per the assignment spec: option text = product.name, option value = product.id.
function populateProductOptions() {
  const select = document.getElementById("productName");
  if (!select) return;

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    select.appendChild(option);
  });
}

populateProductOptions();