document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recipe-form");
  const msg = document.getElementById("form-message");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const recipe = form.elements["recipe"].value.trim();
    msg.hidden = false;
    msg.textContent = `¡Gracias, ${name}! Your recipe "${recipe}" was received (demo form: nothing is stored yet).`;
    form.reset();
    msg.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
