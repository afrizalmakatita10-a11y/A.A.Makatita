// ==========================================
// Multi-Dropdown Filtering Engine
// ==========================================
const fieldFilter = document.getElementById('field-filter');
const hardSkillFilter = document.getElementById('hard-skill-filter');
const softSkillFilter = document.getElementById('soft-skill-filter');

const projectCards = document.querySelectorAll('.project-card'); 

function filterProjects() {
    const fieldVal = fieldFilter ? fieldFilter.value.toLowerCase() : 'all';
    const hardVal = hardSkillFilter ? hardSkillFilter.value.toLowerCase() : 'all';
    const softVal = softSkillFilter ? softSkillFilter.value.toLowerCase() : 'all';

    projectCards.forEach(card => {
        const cardFields = (card.getAttribute('data-field') || '').toLowerCase();
        const cardHard = (card.getAttribute('data-hardskill') || '').toLowerCase();
        const cardSoft = (card.getAttribute('data-softskill') || '').toLowerCase();

        const matchField = fieldVal === 'all' || cardFields.includes(fieldVal);
        const matchHard = hardVal === 'all' || cardHard.includes(hardVal);
        const matchSoft = softVal === 'all' || cardSoft.includes(softVal);

        if (matchField && matchHard && matchSoft) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

if (fieldFilter && hardSkillFilter && softSkillFilter) {
    fieldFilter.addEventListener('change', filterProjects);
    hardSkillFilter.addEventListener('change', filterProjects);
    softSkillFilter.addEventListener('change', filterProjects);
}

// ==========================================
// Lightbox / Image Modal Engine
// ==========================================
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.querySelector(".close-modal");
const thumbnails = document.querySelectorAll(".clickable-thumbnail");

// Membuka modal saat thumbnail diklik
thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
        modal.style.display = "block";
        modalImg.src = this.src; 
    });
});

// Menutup modal saat tombol 'X' diklik
if (closeModal) {
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });
}

// Menutup modal otomatis jika area luar gambar diklik
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
