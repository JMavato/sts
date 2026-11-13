// Store interactions. This site does not process card payments; orders are
// confirmed directly with Simple Tech Services over WhatsApp.
document.addEventListener("DOMContentLoaded", function () {
    const phone = "67574434943";
    const cart = [];
    const cartCount = document.getElementById("cartCount");

    // Remove any legacy mock card-payment dialog rather than implying a payment
    // has been taken when no payment provider is connected.
    const legacyPaymentModal = document.getElementById("checkoutModal");
    if (legacyPaymentModal) legacyPaymentModal.remove();

    function whatsappUrl(message) {
        return "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
    }

    function sendOrder(message) {
        window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    }

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = String(cart.reduce(function (total, item) {
                return total + item.quantity;
            }, 0));
        }
    }

    function showCart() {
        let modal = document.getElementById("stsCartDialog");
        if (!modal) {
            modal = document.createElement("dialog");
            modal.id = "stsCartDialog";
            modal.setAttribute("aria-labelledby", "stsCartTitle");
            modal.innerHTML = '<div class="cart-panel"><div class="cart-head"><h2 id="stsCartTitle">Your enquiry list</h2><button class="cart-close" type="button" aria-label="Close">&times;</button></div><div class="sts-cart-items"></div><p class="sts-cart-total"></p><p>Prices and availability will be confirmed by our team before an order is finalised.</p><button class="btn btn-primary sts-cart-send" type="button">Send enquiry on WhatsApp</button></div>';
            document.body.appendChild(modal);
            modal.addEventListener("click", function (event) {
                if (event.target === modal) modal.close();
            });
            modal.querySelector(".cart-close").addEventListener("click", function () { modal.close(); });
        }

        const itemsElement = modal.querySelector(".sts-cart-items");
        const totalElement = modal.querySelector(".sts-cart-total");
        itemsElement.replaceChildren();
        let total = 0;

        if (cart.length === 0) {
            itemsElement.textContent = "Your enquiry list is empty.";
        } else {
            cart.forEach(function (item, index) {
                const row = document.createElement("div");
                row.className = "cart-line";
                const label = document.createElement("span");
                label.textContent = item.name + " × " + item.quantity + (item.price === null ? " (price to confirm)" : " — K" + (item.price * item.quantity).toFixed(2));
                const removeButton = document.createElement("button");
                removeButton.type = "button";
                removeButton.textContent = "Remove";
                removeButton.addEventListener("click", function () {
                    cart.splice(index, 1);
                    updateCartCount();
                    showCart();
                });
                row.append(label, removeButton);
                itemsElement.appendChild(row);
                if (item.price !== null) total += item.price * item.quantity;
            });
        }

        totalElement.textContent = total ? "Listed-price subtotal: K" + total.toFixed(2) + " (subject to confirmation)" : "";
        modal.querySelector(".sts-cart-send").onclick = function () {
            if (!cart.length) return;
            const lines = cart.map(function (item) {
                return "- " + item.name + " × " + item.quantity + (item.price === null ? " (please confirm price)" : " (listed K" + (item.price * item.quantity).toFixed(2) + ")");
            });
            sendOrder("Hello Simple Tech Services, I would like to enquire about:\n" + lines.join("\n") + "\nPlease confirm availability, final pricing and delivery details.");
        };

        if (!modal.open) modal.showModal();
    }

    document.querySelectorAll(".shop-filter [data-filter]").forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.dataset.filter;
            document.querySelectorAll(".shop-filter [data-filter]").forEach(function (item) {
                item.classList.toggle("active", item === button);
                item.setAttribute("aria-pressed", String(item === button));
            });
            document.querySelectorAll(".product-card[data-category]").forEach(function (card) {
                const categories = (card.dataset.category || "").split(/\s+/);
                card.hidden = filter !== "all" && !categories.includes(filter);
            });
        });
    });

    document.querySelectorAll(".product-details-button").forEach(function (button) {
        const details = button.nextElementSibling;
        if (!details) return;
        button.setAttribute("aria-expanded", "false");
        button.addEventListener("click", function () {
            const isOpen = details.classList.toggle("open");
            button.setAttribute("aria-expanded", String(isOpen));
            button.textContent = isOpen ? "Hide Details" : "View Details";
        });
    });

    document.querySelectorAll(".btn-cart[data-name]").forEach(function (button) {
        button.addEventListener("click", function () {
            const name = button.dataset.name;
            const parsedPrice = Number(button.dataset.price);
            const price = button.dataset.price && Number.isFinite(parsedPrice) && parsedPrice > 0 ? parsedPrice : null;
            const existing = cart.find(function (item) { return item.name === name; });
            if (existing) existing.quantity += 1;
            else cart.push({ name: name, price: price, quantity: 1 });
            updateCartCount();
            button.textContent = "Added";
            window.setTimeout(function () { button.textContent = "Add to Cart"; }, 1200);
        });
    });

    // Legacy "Pay Now" controls now make a clearly labeled WhatsApp enquiry.
    document.querySelectorAll("[data-buy]").forEach(function (button) {
        button.textContent = "Order via WhatsApp";
        button.addEventListener("click", function () {
            const name = button.dataset.buy || "a product";
            const price = button.dataset.price;
            const priceText = price ? " The listed price is K" + Number(price).toFixed(2) + ", subject to confirmation." : " Please confirm the current price.";
            sendOrder("Hello Simple Tech Services, I would like to enquire about " + name + "." + priceText + " Please confirm availability and delivery details.");
        });
    });

    const viewCartButton = document.getElementById("viewCartBtn");
    if (viewCartButton) viewCartButton.addEventListener("click", showCart);
    updateCartCount();
});
