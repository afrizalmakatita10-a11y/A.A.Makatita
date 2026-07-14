// ==========================================
// 1. Custom Cursor Tracker Script
// ==========================================
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

// Expand cursor on clickable elements (Buttons, Links, and Dropdowns)
const interactables = document.querySelectorAll("button, a, select");

interactables.forEach(item => {
    item.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
        cursorOutline.style.backgroundColor = "rgba(0, 229, 255, 0.1)";
    });
    
    item.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
        cursorOutline.style.backgroundColor = "transparent";
    });
});

// ==========================================
// 2. Multi-Dropdown Filtering Engine
// ==========================================
const fieldFilter = document.getElementById('field-filter');
const hardSkillFilter = document.getElementById('hard-skill-filter');
const softSkillFilter = document.getElementById('soft-skill-filter');

// DECLARED ONLY ONCE to prevent script crash
const projectCards = document.querySelectorAll('.project-card'); 

function filterProjects() {
    // Get the current selected values from all 3 dropdowns
    const fieldVal = fieldFilter ? fieldFilter.value.toLowerCase() : 'all';
    const hardVal = hardSkillFilter ? hardSkillFilter.value.toLowerCase() : 'all';
    const softVal = softSkillFilter ? softSkillFilter.value.toLowerCase() : 'all';

    projectCards.forEach(card => {
        // Read the hidden data-attributes we added to the HTML
        const cardFields = (card.getAttribute('data-field') || '').toLowerCase();
        const cardHard = (card.getAttribute('data-hardskill') || '').toLowerCase();
        const cardSoft = (card.getAttribute('data-softskill') || '').toLowerCase();

        // Check if the card matches the dropdown (or if dropdown is set to 'All')
        const matchField = fieldVal === 'all' || cardFields.includes(fieldVal);
        const matchHard = hardVal === 'all' || cardHard.includes(hardVal);
        const matchSoft = softVal === 'all' || cardSoft.includes(softVal);

        // ONLY show the project if it matches ALL active dropdown filters
        if (matchField && matchHard && matchSoft) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Listen for clicks/changes on the dropdowns
if (fieldFilter && hardSkillFilter && softSkillFilter) {
    fieldFilter.addEventListener('change', filterProjects);
    hardSkillFilter.addEventListener('change', filterProjects);
    softSkillFilter.addEventListener('change', filterProjects);
}

// ==========================================
// 3. Theme Toggle Logic
// ==========================================
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Switch the icon
        if (body.classList.contains('light-mode')) {
            themeToggle.textContent = '🌙'; // Shows Moon when in Light Mode
        } else {
            themeToggle.textContent = '☀️'; // Shows Sun when in Dark Mode
        }
    });
}
