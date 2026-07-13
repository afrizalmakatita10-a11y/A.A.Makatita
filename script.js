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

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        const filterValue = tab.getAttribute('data-filter');

        projectCards.forEach(card => {
            // If the filter is 'all', show everything
            if (filterValue === 'all') {
                card.style.display = 'block';
            } else {
                // Check if the card's data-category includes the filter value
                const categories = card.getAttribute('data-category').split(' ');
                if (categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    });
});

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
