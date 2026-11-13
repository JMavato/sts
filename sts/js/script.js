document.addEventListener("DOMContentLoaded", function () {
    const socialToggle = document.getElementById("socialToggle");
    const socialMenu = document.querySelector(".floating-social-menu");

    if (!socialToggle || !socialMenu) {
        return;
    }

    const setMenuState = function (isOpen) {
        socialMenu.classList.toggle("active", isOpen);
        socialToggle.setAttribute("aria-expanded", String(isOpen));
    };

    socialToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        const isOpen = !socialMenu.classList.contains("active");
        setMenuState(isOpen);
    });

    document.addEventListener("click", function (event) {
        if (!socialMenu.contains(event.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            setMenuState(false);
        }
    });
});
