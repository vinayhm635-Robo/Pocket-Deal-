let cart =
    JSON.parse(
        localStorage.getItem("pocketDealCart")
    ) || [];


function saveCart() {

    localStorage.setItem(
        "pocketDealCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}


function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    const elements =
        document.querySelectorAll(
            "#cartCount"
        );

    elements.forEach(element => {
        element.textContent = count;
    });
}


function addToCart(name, price, icon) {

    const existing =
        cart.find(
            item => item.name === name
        );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            icon: icon,

            quantity: 1

        });
    }

    saveCart();

    alert(
        name +
        " added to your Pocket Deal cart!"
    );
}


function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}


function displayCart() {

    const container =
        document.getElementById(
            "cartItems"
        );

    if (!container) {
        return;
    }

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="cart-summary"
                 style="margin:0;">

                <h2>
                    Your cart is empty 🛒
                </h2>

                <p style="color:#777;margin:10px 0 20px;">

                    Add some products
                    to get started.

                </p>

                <a href="products.html"
                   class="primary-btn">

                    Explore Products

                </a>

            </div>
        `;

        updateTotals(0);

        return;
    }

    let html = "";

    cart.forEach(
        (item, index) => {

            const itemTotal =
                item.price *
                item.quantity;

            html += `

                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>

                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ₹${item.price.toLocaleString()}
                        </p>

                        <p>
                            Quantity:
                            ${item.quantity}
                        </p>

                    </div>

                    <strong>
                        ₹${itemTotal.toLocaleString()}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>
            `;
        }
    );

    container.innerHTML = html;

    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    updateTotals(total);
}


function updateTotals(total) {

    const subtotal =
        document.getElementById(
            "subtotal"
        );

    const totalElement =
        document.getElementById(
            "total"
        );

    if (subtotal) {

        subtotal.textContent =
            "₹" +
            total.toLocaleString();
    }

    if (totalElement) {

        totalElement.textContent =
            "₹" +
            total.toLocaleString();
    }

    const paymentTotal =
        document.getElementById(
            "paymentTotal"
        );

    if (paymentTotal) {

        paymentTotal.textContent =
            "₹" +
            total.toLocaleString();
    }
}


function goCheckout() {

    if (cart.length === 0) {

        alert(
            "Your Pocket Deal cart is empty."
        );

        return;
    }

    window.location.href =
        "checkout.html";
}


function continuePayment(event) {

    event.preventDefault();

    const customer = {

        name:
            document.getElementById(
                "name"
            ).value,

        phone:
            document.getElementById(
                "phone"
            ).value,

        email:
            document.getElementById(
                "email"
            ).value,

        address:
            document.getElementById(
                "address"
            ).value,

        city:
            document.getElementById(
                "city"
            ).value,

        pincode:
            document.getElementById(
                "pincode"
            ).value

    };

    localStorage.setItem(
        "pocketDealCustomer",
        JSON.stringify(customer)
    );

    window.location.href =
        "payment.html";
}


function processPayment() {

    if (cart.length === 0) {

        alert(
            "Your Pocket Deal cart is empty."
        );

        return;
    }

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const method =
        selected
            ? selected.value
            : "upi";

    console.log(
        "Payment method:",
        method
    );

    const button =
        document.querySelector(
            ".payment-total button"
        );

    button.textContent =
        "Processing...";

    button.disabled = true;

    setTimeout(
        () => {

            const orderId =
                "PD" +
                Math.floor(
                    100000 +
                    Math.random() *
                    900000
                );

            localStorage.setItem(
                "pocketDealOrder",
                orderId
            );

            localStorage.removeItem(
                "pocketDealCart"
            );

            cart = [];

            window.location.href =
                "success.html";

        },
        3000
    );
}


function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById(
            "email"
        ).value;

    localStorage.setItem(
        "pocketDealUser",
        email
    );

    alert(
        "Welcome to Pocket Deal!"
    );

    window.location.href =
        "index.html";
}


function googleLogin() {

    alert(
        "Google Login Demo\n\n" +
        "Real Google authentication " +
        "can be connected using Firebase."
    );
}


function createAccount() {

    alert(
        "Account creation can be connected " +
        "to Firebase Authentication."
    );
}


function searchProduct() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) {
        return;
    }

    const query =
        input.value.trim();

    if (query) {

        window.location.href =
            "products.html?search=" +
            encodeURIComponent(query);
    }
}


function filterProducts() {

    const input =
        document.getElementById(
            "productSearch"
        );

    if (!input) {
        return;
    }

    const query =
        input.value.toLowerCase();

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    cards.forEach(card => {

        const text =
            card.textContent.toLowerCase();

        card.style.display =
            text.includes(query)
                ? ""
                : "none";
    });
}


function filterCategory(category) {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display =
                "none";
        }
    });
}


function goCategory(category) {

    window.location.href =
        "products.html?category=" +
        category;
}


function buyNow() {

    addToCart(
        "Premium Laptop",
        59999,
        "💻"
    );

    window.location.href =
        "cart.html";
}


function loadProductFilters() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const category =
        params.get("category");

    const search =
        params.get("search");

    if (category) {

        filterCategory(category);
    }

    if (search) {

        const input =
            document.getElementById(
                "productSearch"
            );

        if (input) {

            input.value =
                search;

            filterProducts();
        }
    }
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

        loadProductFilters();

        const orderId =
            document.getElementById(
                "orderId"
            );

        if (orderId) {

            const saved =
                localStorage.getItem(
                    "pocketDealOrder"
                );

            orderId.textContent =
                saved ||
                "PD000000";
        }

    }
);
