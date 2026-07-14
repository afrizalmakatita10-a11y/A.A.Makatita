// Custom Cursor Tracker Script
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Direct mapping for the dot
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Slight delay animation for the outline to make it feel smooth
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Expand cursor on clickable elements
const links = document.querySelectorAll("button, a, .tab");

links.forEach(link => {
    link.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
    });
    
    link.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// Tab Filtering Logic
const tabs = document.querySelectorAll('.tab');
const projectCards = document.querySelectorAll('.project-card');

// Multi-Dropdown Filtering Logic
const fieldFilter = document.getElementById('field-filter');
const hardSkillFilter = document.getElementById('hard-skill-filter');
const softSkillFilter = document.getElementById('soft-skill-filter');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects() {
    const fieldVal = fieldFilter.value.toLowerCase();
    const hardVal = hardSkillFilter.value.toLowerCase();
    const softVal = softSkillFilter.value.toLowerCase();

    projectCards.forEach(card => {
        // Grab the hidden data attributes we added to the HTML
        const cardFields = (card.getAttribute('data-field') || '').toLowerCase();
        const cardHard = (card.getAttribute('data-hardskill') || '').toLowerCase();
        const cardSoft = (card.getAttribute('data-softskill') || '').toLowerCase();

        // Check if the card matches the dropdown (or if dropdown is set to 'all')
        const matchField = fieldVal === 'all' || cardFields.includes(fieldVal);
        const matchHard = hardVal === 'all' || cardHard.includes(hardVal);
        const matchSoft = softVal === 'all' || cardSoft.includes(softVal);

        // If it matches ALL active dropdowns, show it. Otherwise, hide it.
        if (matchField && matchHard && matchSoft) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Listen for changes on any of the three dropdowns
if (fieldFilter && hardSkillFilter && softSkillFilter) {
    fieldFilter.addEventListener('change', filterProjects);
    hardSkillFilter.addEventListener('change', filterProjects);
    softSkillFilter.addEventListener('change', filterProjects);
}

// Theme Toggle Logic
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Switch the icon
    if (body.classList.contains('light-mode')) {
        themeToggle.textContent = '🌙'; // Shows Moon when in Light Mode
    } else {
        themeToggle.textContent = '☀️'; // Shows Sun when in Dark Mode
    }
});
