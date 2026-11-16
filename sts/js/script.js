document.addEventListener("DOMContentLoaded", function () {
    const socialToggle = document.getElementById("socialToggle");
    const socialMenu = document.querySelector(".floating-social-menu");

    if (socialToggle && socialMenu) {
        const setMenuState = function (isOpen) {
            socialMenu.classList.toggle("active", isOpen);
            socialToggle.setAttribute("aria-expanded", String(isOpen));
        };

        socialToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            setMenuState(!socialMenu.classList.contains("active"));
        });

        document.addEventListener("click", function (event) {
            if (!socialMenu.contains(event.target)) setMenuState(false);
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") setMenuState(false);
        });
    }

    // Route the existing quote form to the business inbox using FormSubmit.
    // FormSubmit requires the recipient to confirm its activation email once.
    const contactForm = document.getElementById("corporateContactForm");
    if (contactForm) {
        contactForm.action = "https://formsubmit.co/ajax/Simpletechservices01@gmail.com";
        if (!contactForm.querySelector('input[name="_subject"]')) {
            const subject = document.createElement("input");
            subject.type = "hidden";
            subject.name = "_subject";
            subject.value = "New website enquiry - Simple Tech Services";
            contactForm.appendChild(subject);
        }
    }
});


document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("mobileMenuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) return;

    const navLinks = mainNav.querySelectorAll("a");

    function setActiveLink(link) {
        navLinks.forEach(function (item) {
            item.classList.remove("active-link");
        });

        if (link) {
            link.classList.add("active-link");
        }
    }

    function closeMobileMenu() {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }

    // Open and close menu
    menuToggle.addEventListener("click", function () {
        const isOpen = mainNav.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Highlight selected navigation link
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            setActiveLink(this);
            closeMobileMenu();
        });
    });

    // Restore active link when the page loads
    const currentHash = window.location.hash;

    if (currentHash === "#contact") {
        setActiveLink(mainNav.querySelector('a[href="index.html#contact"]'));
    } else if (currentHash === "#why-choose-us") {
        setActiveLink(mainNav.querySelector('a[href="index.html#why-choose-us"]'));
    } else {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        const matchingLink = Array.from(navLinks).find(function (link) {
            const linkUrl = new URL(link.href, window.location.href);
            return linkUrl.pathname.split("/").pop() === currentPage &&
                   !linkUrl.hash;
        });

        setActiveLink(matchingLink);
    }

});

