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
