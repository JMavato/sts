
    <!-- Store Core Processing Architectures Script Section -->

        function openPaymentModal(itemName, itemPrice) {
            document.getElementById('modalItemTitle').innerText = "Checkout: " + itemName;
            document.getElementById('modalItemPrice').innerText = itemPrice;
            document.getElementById('checkoutModal').style.display = 'flex';
        }

        function closePaymentModal() {
            document.getElementById('checkoutModal').style.display = 'none';
        }

        function handleFormPayment(e) {
            e.preventDefault();
            alert("Payment processed successfully! Connecting to bank API gateway routing framework...");
            closePaymentModal();
        }

        // Wait for DOM to attach dynamic event listeners to input fields
        document.addEventListener('DOMContentLoaded', function() {
            // Find card number and expiry inputs inside the modal panel form
            const cardInput = document.querySelector('input[placeholder="4111 2222 3333 4444"]');
            const expiryInput = document.querySelector('input[placeholder="MM/YY"]');

            if (cardInput) {
                cardInput.addEventListener('input', function(e) {
                    // Strip all non-digit characters clean
                    let value = e.target.value.replace(/\D/g, '');
                    // Match chunks of up to 4 digits and join them with a space
                    let formatted = value.match(/.{1,4}/g);
                    e.target.value = formatted ? formatted.join(' ') : value;
                });
            }

            if (expiryInput) {
                expiryInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length > 2) {
                        e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
                    } else {
                        e.target.value = value;
                    }
                });
            }
        });


// FLOATING SOCIAL MEDIA MENU
const socialToggle = document.getElementById("socialToggle");
const socialMenu = document.querySelector(".floating-social-menu");

if (socialToggle && socialMenu) {
    socialToggle.addEventListener("click", function () {
        const isOpen = socialMenu.classList.toggle("active");
        socialToggle.setAttribute("aria-expanded", isOpen);
    });

    document.addEventListener("click", function (event) {
        if (!socialMenu.contains(event.target)) {
            socialMenu.classList.remove("active");
            socialToggle.setAttribute("aria-expanded", "false");
        }
    });
}
