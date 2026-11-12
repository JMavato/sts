document.addEventListener("DOMContentLoaded", function () {

    const promotions = [
        {
            title: "Apple MacBook Air Core i5r",
            description: "Get your MacBook Air at a special promotional price.",
            image: "shop-image/applemacbook-air.jpg",
            oldPrice: 1300,
            newPrice: 1000,
            saving: 300,
            startDate: "2026-11-06",
            endDate: "2026-12-06",
            whatsappMessage: "Hello, I am interested in the MacBook Air promotion."
        },
        {
            title: "CCTV Installation Special Offer",
            description: "Secure your home or business with our CCTV installation service.",
            image: "shop-image/topocamera.jpeg",
            oldPrice: 800,
            newPrice: 600,
            saving: 200,
            startDate: "2026-11-10",
            endDate: "2026-11-30",
            whatsappMessage: "Hello, I am interested in the CCTV installation promotion."
        }
    ];

    const popup = document.getElementById("promotionPopup");
    const closeButton = document.getElementById("closePromotion");
    const banner = document.querySelector(".homepage-promotion");

    const popupElements = {
        title: document.getElementById("promotionTitle"),
        description: document.getElementById("promotionDescription"),
        image: document.getElementById("promotionImage"),
        oldPrice: document.getElementById("promotionOldPrice"),
        newPrice: document.getElementById("promotionNewPrice"),
        saving: document.getElementById("promotionSaving"),
        timer: document.getElementById("promotionTimer"),
        whatsapp: document.getElementById("promotionWhatsApp")
    };

    const bannerElements = {
        title: document.getElementById("bannerTitle"),
        description: document.getElementById("bannerDescription"),
        image: document.getElementById("bannerImage"),
        oldPrice: document.getElementById("bannerOldPrice"),
        newPrice: document.getElementById("bannerNewPrice"),
        saving: document.getElementById("bannerSaving"),
        timer: document.getElementById("bannerTimer"),
        whatsapp: document.getElementById("bannerWhatsApp")
    };

    const dismissalKey = "promotionDismissedUntil";
    let activePromotions = [];
    let currentIndex = 0;
    let currentPromotion = null;

    function getToday() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function getActivePromotions() {
        const today = getToday();

        return promotions.filter(promo =>
            today >= promo.startDate && today <= promo.endDate
        );
    }

    function formatPrice(price) {
        return "K" + Number(price).toLocaleString("en-PG", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getExpiryDate(promo) {
        return new Date(promo.endDate + "T23:59:59");
    }

    function getCountdown(promo) {
        const difference = getExpiryDate(promo).getTime() - Date.now();

        if (difference <= 0) return "Offer expired";

        const days = Math.floor(difference / 86400000);
        const hours = Math.floor((difference % 86400000) / 3600000);
        const minutes = Math.floor((difference % 3600000) / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function getWhatsAppLink(promo) {
        return "https://wa.me/67574434943?text=" +
            encodeURIComponent(promo.whatsappMessage);
    }

    function updatePromotion(elements, promo) {
        if (!promo) return;

        elements.title.textContent = promo.title;
        elements.description.textContent = promo.description;
        elements.image.src = promo.image;
        elements.oldPrice.textContent = formatPrice(promo.oldPrice);
        elements.newPrice.textContent = formatPrice(promo.newPrice);
        elements.saving.textContent = "You save " + formatPrice(promo.saving);
        elements.whatsapp.href = getWhatsAppLink(promo);
        elements.timer.textContent = getCountdown(promo);
    }

    function displayBanner() {
        if (!banner) return;

        activePromotions = getActivePromotions();

        if (activePromotions.length === 0) {
            banner.style.display = "none";
            return;
        }

        banner.style.display = "flex";

        const promo = activePromotions[
            currentIndex % activePromotions.length
        ];

        updatePromotion(bannerElements, promo);
    }

    function displayPopup() {
        if (!popup || activePromotions.length === 0) return;

        currentPromotion = activePromotions[
            currentIndex % activePromotions.length
        ];

        updatePromotion(popupElements, currentPromotion);
        popup.classList.add("show");
    }

    function closePopup() {
        if (!popup) return;

        popup.classList.remove("show");

        const dismissalExpiry = Date.now() + (24 * 60 * 60 * 1000);

        localStorage.setItem(dismissalKey, dismissalExpiry);
    }

    function canShowPopup() {
        const dismissedUntil = Number(localStorage.getItem(dismissalKey));

        return !dismissedUntil || Date.now() >= dismissedUntil;
    }

    if (closeButton) {
        closeButton.addEventListener("click", closePopup);
    }

    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }

    // Show the first active promotion in the banner.
    displayBanner();

    // Show the pop-up after 7 seconds if not dismissed.
    activePromotions = getActivePromotions();

    if (activePromotions.length > 0 && canShowPopup()) {
        setTimeout(displayPopup, 7000);
    }

    // Refresh countdowns every second.
    setInterval(function () {
        activePromotions = getActivePromotions();

        if (activePromotions.length === 0) {
            if (banner) banner.style.display = "none";
            if (popup) popup.classList.remove("show");
            return;
        }

        displayBanner();

        if (currentPromotion && popup && popup.classList.contains("show")) {
            updatePromotion(popupElements, currentPromotion);
        }
    }, 1000);

    // Rotate between active promotions every 5 seconds.
    setInterval(function () {
        activePromotions = getActivePromotions();

        if (activePromotions.length > 1) {
            currentIndex = (currentIndex + 1) % activePromotions.length;
            displayBanner();

            if (popup && popup.classList.contains("show")) {
                displayPopup();
            }
        }
    }, 5000);

});