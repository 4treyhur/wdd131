// Share Your Recipe: saves submissions in localStorage (array of objects)
const STORAGE_KEY = "saboresRecipes";

function loadRecipes() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return [];
  }
}

function saveRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (e) {
    /* storage unavailable: the page still works without saving */
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipe-form");
  const msg = document.getElementById("form-message");
  const list = document.getElementById("saved-list");
  const empty = document.getElementById("saved-empty");
  if (!form) return;

  let recipes = loadRecipes();

  function render() {
    list.innerHTML = recipes
      .map(
        (r) =>
          `<li><span><strong>${r.recipe}</strong> · ${r.region} · ${r.type} <small>(${r.name}, ${r.date})</small></span> <button type="button" class="link-btn" data-id="${r.id}">Remove</button></li>`
      )
      .join("");
    empty.hidden = recipes.length > 0;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const clean = (s) => s.replace(/[<>&"]/g, "");
    const entry = {
      id: Date.now(),
      name: clean(form.elements["name"].value.trim()),
      recipe: clean(form.elements["recipe"].value.trim()),
      region: clean(form.elements["region"].value),
      type: form.elements["type"].value,
      date: new Date().toLocaleDateString("en-US"),
    };
    recipes.push(entry);
    saveRecipes(recipes);
    render();
    msg.hidden = false;
    msg.textContent = `¡Gracias, ${entry.name}! Your recipe "${entry.recipe}" was received and saved in this browser.`;
    form.reset();
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  list.addEventListener("click", (e) => {
    const id = Number(e.target.dataset.id);
    if (!id) return;
    recipes = recipes.filter((r) => r.id !== id);
    saveRecipes(recipes);
    render();
  });

  render();
});
