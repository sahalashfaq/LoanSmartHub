
// Open mobile menu
function openMobileMenu() {
    document.getElementById("mobileMenu").classList.add("open-menu");
}

// Close mobile menu
function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("open-menu");
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    if (!mobileMenu.contains(event.target) && !event.target.closest('.hamburger-icon')) {
        closeMobileMenu();
    }
});