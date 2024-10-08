//Toggle Burger Menu
function toggleBurgerMenu() {
    const nav = document.querySelector(".header-right");
    nav.classList.toggle("active");
}

// Function to update content based on selected language
function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    })
}

// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`i18n/${lang}.json`);
    return response.json();
}

// Function to change language
async function changeLanguage(lang) {
    await setLanguagePreference(lang);

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
}

// Function to fetch and display JSON data
async function loadShows() {
    const response = await fetch('content/events.json'); // Path to your JSON file
    const shows = await response.json();

    const showsList = document.getElementById('shows-list');

    // Iterate over the shows and create HTML elements for each
    shows.forEach(show => {
        const showElement = document.createElement('li');
        showElement.classList.add('show-item');

        // Using template literals to create a more structured layout
        showElement.innerHTML = `
            <div class="show-details">
                <div class="show-title">
                    <h3>${show.event}</h3>
                </div>
                <div class="show-info">
                    <p><strong>Date:</strong> ${show.date}</p>
                    <p><strong>Time:</strong> ${show.time}</p>
                </div>
                <div class="show-venue">
                    <p><strong>Venue:</strong> ${show.venue}</p>
                </div>
                <div class="show-links">
                    <a href="${show.ticketLink}" class="button" target="_blank">Get Tickets</a>
                    <a href="${show.locationLink}" class="button" target="_blank">View Location</a>
                </div>
            </div>
        `;

        showsList.appendChild(showElement);
    });
}

// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

document.addEventListener('DOMContentLoaded', loadShows)

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("burger-menu").addEventListener("click", function() {
        const nav = document.querySelector(".header-right");
        nav.classList.toggle("active");
    });
});