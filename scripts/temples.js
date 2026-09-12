// ---------- Footer: dynamic year and last-modified date ----------
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ---------- Hamburger menu toggle (mobile navigation) ----------
const menuToggle = document.getElementById('menu_toggle');
const primaryNav = document.getElementById('primary_nav');

menuToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('nav_open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.innerHTML = isOpen
        ? '<span aria-hidden="true">&#10005;</span>'
        : '<span aria-hidden="true">&#9776;</span>';
});

// Close the menu automatically if the viewport grows into the large view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 700 && primaryNav.classList.contains('nav_open')) {
        primaryNav.classList.remove('nav_open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '<span aria-hidden="true">&#9776;</span>';
    }
});