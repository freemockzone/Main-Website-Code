document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mainNav = document.getElementById('main-nav');

    // Toggle mobile navigation menu
    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Toggle aria-expanded attribute for accessibility
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Handle dropdowns for mobile (click to toggle)
    const dropdownToggles = document.querySelectorAll('nav .group > a');
    dropdownToggles.forEach(toggle => {
        // Prevent default navigation for main dropdown links
        toggle.addEventListener('click', (event) => {
            // Only prevent default if it's a dropdown toggle, not a direct link
            if (toggle.parentElement.classList.contains('group')) {
                event.preventDefault();
                // Close other open dropdowns at the same level
                dropdownToggles.forEach(otherToggle => {
                    if (otherToggle !== toggle && otherToggle.parentElement.classList.contains('active')) {
                        otherToggle.parentElement.classList.remove('active');
                    }
                });
                // Toggle the current dropdown
                toggle.parentElement.classList.toggle('active');
            }
        });
    });

    // Handle nested dropdowns (e.g., GS Prelims subjects) for mobile
    const nestedDropdownToggles = document.querySelectorAll('nav .group-submenu > a');
    nestedDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation for nested dropdown links
            // Close other open nested dropdowns at the same level
            nestedDropdownToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.parentElement.classList.contains('active')) {
                    otherToggle.parentElement.classList.remove('active');
                }
            });
            // Toggle the current nested dropdown
            toggle.parentElement.classList.toggle('active');
        });
    });

    // Close mobile menu and dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (mainNav && !mainNav.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            mainNav.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }

        // Close all dropdowns if click is outside any dropdown
        dropdownToggles.forEach(toggle => {
            if (!toggle.parentElement.contains(event.target)) {
                toggle.parentElement.classList.remove('active');
            }
        });
        nestedDropdownToggles.forEach(toggle => {
            if (!toggle.parentElement.contains(event.target)) {
                toggle.parentElement.classList.remove('active');
            }
        });
    });

    // Close dropdowns when a link inside them is clicked (for mobile)
    const allNavLinks = document.querySelectorAll('nav a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            // If the mobile menu is open, close it
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
            // Close all dropdowns
            dropdownToggles.forEach(toggle => toggle.parentElement.classList.remove('active'));
            nestedDropdownToggles.forEach(toggle => toggle.parentElement.classList.remove('active'));
        });
    });
});
