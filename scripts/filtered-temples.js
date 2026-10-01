// ---------- Footer: dynamic year and last-modified date ----------
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// ---------- Hamburger menu toggle (mobile navigation) ----------
const menuToggle = document.getElementById('menu_toggle');
const primaryNav = document.getElementById('primary_nav');

function closeMobileNav() {
    primaryNav.classList.remove('nav_open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<span aria-hidden="true">&#9776;</span>';
}

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
        closeMobileNav();
    }
});

// ---------- Temple data ----------
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Per\u00fa",
        location: "Lima, Per\u00fa",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 143969,
        imageUrl:
            "https://newsroom.churchofjesuschrist.org/media/640x480/St-George-Utah-Temple4.jpg"
    },
    {
        templeName: "Logan Utah",
        location: "Logan, Utah, United States",
        dedicated: "1884, May, 17",
        area: 119619,
        imageUrl:
            "https://newsroom.churchofjesuschrist.org/media/640x480/Logan-Utah-Temple1.jpg"
    },
    {
        templeName: "Colonia Ju\u00e1rez Chihuahua M\u00e9xico",
        location: "Colonia Ju\u00e1rez, Chihuahua, M\u00e9xico",
        dedicated: "1999, March, 6",
        area: 6800,
        imageUrl:
            "https://newsroom.churchofjesuschrist.org/media/640x480/Colonia-Juarez-Chihuahua-Mexico-Temple.jpg"
    },
    {
        templeName: "Villahermosa M\u00e9xico",
        location: "Villahermosa, Tabasco, M\u00e9xico",
        dedicated: "2000, May, 21",
        area: 10700,
        imageUrl:
            "https://newsroom.churchofjesuschrist.org/media/640x480/villahermosamexico_large.jpg"
    },
    {
        templeName: "Rexburg Idaho",
        location: "Rexburg, Idaho, United States",
        dedicated: "2008, February, 10",
        area: 57504,
        imageUrl:
            "https://newsroom.churchofjesuschrist.org/media/640x480/Rexburg-Idaho-Temple3.jpg"
    }
];

// ---------- Rendering ----------
const pageHeading = document.getElementById('page_heading');
const cardsContainer = document.getElementById('temple_cards');

// "dedicated" strings look like "2005, August, 7" — the year is everything
// before the first comma.
function getDedicationYear(dedicated) {
    return parseInt(dedicated.split(',')[0], 10);
}

function formatArea(area) {
    return `${area.toLocaleString('en-US')} sq ft`;
}

function renderTemples(list) {
    cardsContainer.innerHTML = '';

    list.forEach(temple => {
        const card = document.createElement('figure');
        card.className = 'temple_card';

        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.alt = `${temple.templeName} Temple`;
        img.loading = 'lazy';
        card.appendChild(img);

        const caption = document.createElement('figcaption');
        caption.innerHTML = `
            <h2>${temple.templeName}</h2>
            <p class="temple_location">${temple.location}</p>
            <p class="temple_detail"><strong>Dedicated:</strong> ${temple.dedicated}</p>
            <p class="temple_detail"><strong>Area:</strong> ${formatArea(temple.area)}</p>
        `;
        card.appendChild(caption);

        cardsContainer.appendChild(card);
    });
}

// ---------- Filtering ----------
const filters = {
    home: temples => temples,
    old: temples => temples.filter(temple => getDedicationYear(temple.dedicated) < 1900),
    new: temples => temples.filter(temple => getDedicationYear(temple.dedicated) > 2000),
    large: temples => temples.filter(temple => temple.area > 90000),
    small: temples => temples.filter(temple => temple.area < 10000)
};

const navLinks = document.querySelectorAll('#primary_nav a');

navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const filterKey = link.dataset.filter;
        renderTemples(filters[filterKey](temples));

        pageHeading.textContent = link.textContent;

        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');

        if (primaryNav.classList.contains('nav_open')) {
            closeMobileNav();
        }
    });
});

// ---------- Initial render: show every temple on page load ----------
renderTemples(filters.home(temples));