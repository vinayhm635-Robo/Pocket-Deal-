const products = [
    {
        id: 1,
        name: "Acer Aspire 5 Laptop",
        category: "Laptop",
        price: 54999,
        oldPrice: 62999,
        icon: "💻",
        description: "Powerful laptop for coding, study, office work and entertainment."
    },
    {
        id: 2,
        name: "HP 15 Laptop",
        category: "Laptop",
        price: 58999,
        oldPrice: 67999,
        icon: "💻",
        description: "Reliable laptop for everyday productivity and entertainment."
    },
    {
        id: 3,
        name: "SmartPhone X1",
        category: "Mobile",
        price: 18999,
        oldPrice: 22999,
        icon: "📱",
        description: "Modern smartphone with excellent performance and camera."
    },
    {
        id: 4,
        name: "SmartPhone Pro Max",
        category: "Mobile",
        price: 27999,
        oldPrice: 32999,
        icon: "📱",
        description: "Premium smartphone with powerful performance."
    },
    {
        id: 5,
        name: "Wireless Pro Headphones",
        category: "Headphones",
        price: 2999,
        oldPrice: 4999,
        icon: "🎧",
        description: "Comfortable wireless headphones with clear sound."
    },
    {
        id: 6,
        name: "BassX Bluetooth Headphones",
        category: "Headphones",
        price: 1999,
        oldPrice: 3499,
        icon: "🎧",
        description: "Deep bass and comfortable wireless listening."
    },
    {
        id: 7,
        name: "Running Sports Shoes",
        category: "Shoes",
        price: 2499,
        oldPrice: 3999,
        icon: "👟",
        description: "Lightweight running shoes for daily workouts."
    },
    {
        id: 8,
        name: "Urban Casual Shoes",
        category: "Shoes",
        price: 1799,
        oldPrice: 2999,
        icon: "👟",
        description: "Stylish casual shoes for everyday use."
    }
];

function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}

function getCart() {
    try {
        const cart = JSON.parse(
            localStorage.getItem("pocketDealCart")
        );

        return Array.isArray(cart) ? cart : [];

    } catch (error) {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(
        "pocketDealCart",
        JSON.stringify(cart)
    );

    updateCartCount();
}

function updateCartCount() {

    const cart = getCart();

    const count = cart.reduce(
        (total, item) =>
            total + Number(item.quantity || 0),
        0
    );

    document
        .querySelectorAll("#cartCount")
        .forEach(element => {
            element.textContent = count;
        });
}

function addToCart(id) {

    const product = products.find(
        product => product.id === Number(id)
    );

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = getCart();

    const existing = cart.find(
        item => item.id === product.id
    );

    if (existing) {
        existing.quantity =
            Number(existing.quantity) + 1;
    } else {
        cart.push({
            id: product.id,
            quantity: 1
        });
    }

    saveCart(cart);

    alert(
        product.name +
        " added to your cart!"
    );
}

function createProductCard(product) {

    return `
        <div class="product-card">

            <a href="product.html?id=${product.id}">
                <div class="product-image">
                    ${product.icon}
                </div>
            </a>

            <div class="product-category">
                ${product.category}
            </div>

            <h3>${product.name}</h3>

            <div class="price">
                ${money(product.price)}

                <span class="old-price">
                    ${money(product.oldPrice)}
                </span>
            </div>

            <button
                class="btn-primary"
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

        </div>
    `;
}

let currentCategory = "All";

function filterCategory(category) {

    currentCategory = category;

    displayProducts();
}

function displayProducts() {

    const container =
        document.getElementById("productList");

    if (!container) return;

    const searchElement =
        document.getElementById("searchInput");

    const search = searchElement
        ? searchElement.value.toLowerCase().trim()
        : "";

    const filtered = products.filter(product => {

        const categoryMatch =
            currentCategory === "All" ||
            product.category === currentCategory;

        const searchMatch =
            product.name
                .toLowerCase()
                .includes(search) ||

            product.category
                .toLowerCase()
                .includes(search);

        return categoryMatch && searchMatch;
    });

    if (filtered.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">🔎</div>
                <h2>No products found</h2>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }

    container.innerHTML =
        filtered
            .map(createProductCard)
            .join("");
}

function displayHomeProducts() {

    const container =
        document.getElementById("homeProducts");

    if (!container) return;

    container.innerHTML =
        products
            .slice(0, 4)
            .map(createProductCard)
            .join("");
}

function displayProductDetails() {

    const container =
        document.getElementById("productDetails");

    if (!container) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("id"));

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) {

        container.innerHTML = `
            <div class="empty-cart">
                <h2>Product not found</h2>

                <a
                    href="products.html"
                    class="btn-primary"
                >
                    Back to Shop
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = `

        <div class="large-image">
            ${product.icon}
        </div>

        <div>

            <div class="product-category">
                ${product.category}
            </div>

            <h1>${product.name}</h1>

            <div class="price">
                ${money(product.price)}

                <span class="old-price">
                    ${money(product.oldPrice)}
                </span>
            </div>

            <p class="description">
                ${product.description}
            </p>

            <button
                class="btn-primary"
                onclick="addToCart(${product.id})"
            >
                Add to Cart
            </button>

            <a
                href="bulk.html?product=${product.id}"
                class="btn-secondary"
                style="margin-left:8px;"
            >
                Request Bulk Deal
            </a>

        </div>
    `;
}

function displayCart() {

    const container =
        document.getElementById("cartItems");

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add products to your cart.
                </p>

                <a
                    href="products.html"
                    class="btn-primary"
                >
                    Start Shopping
                </a>

            </div>
        `;

        setText("subtotal", "₹0");
        setText("cartTotal", "₹0");

        return;
    }

    let subtotal = 0;

    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === Number(item.id)
                );

            if (!product) return "";

            const quantity =
                Number(item.quantity || 1);

            subtotal +=
                product.price * quantity;

            return `

                <div class="cart-item">

                    <div class="cart-image">
                        ${product.icon}
                    </div>

                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${money(product.price)}
                        </p>

                        <div class="qty-controls">

                            <button
                                onclick="changeQuantity(
                                    ${product.id}, -1
                                )"
                            >
                                −
                            </button>

                            <strong>
                                ${quantity}
                            </strong>

                            <button
                                onclick="changeQuantity(
                                    ${product.id}, 1
                                )"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <div>

                        <strong>
                            ${money(
                                product.price *
                                quantity
                            )}
                        </strong>

                        <br>

                        <button
                            class="remove-btn"
                            onclick="removeFromCart(
                                ${product.id}
                            )"
                        >
                            Remove
                        </button>

                    </div>

                </div>
            `;

        }).join("");

    setText(
        "subtotal",
        money(subtotal)
    );

    setText(
        "cartTotal",
        money(subtotal)
    );
}

function changeQuantity(id, change) {

    const cart = getCart();

    const item =
        cart.find(
            product =>
                product.id === Number(id)
        );

    if (!item) return;

    item.quantity =
        Number(item.quantity || 1) +
        Number(change);

    if (item.quantity <= 0) {

        removeFromCart(id);

        return;
    }

    saveCart(cart);

    displayCart();
}

function removeFromCart(id) {

    const cart =
        getCart().filter(
            item =>
                item.id !== Number(id)
        );

    saveCart(cart);

    displayCart();
}

function checkCartBeforeCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return false;
    }

    return true;
}

function displayCheckout() {

    const container =
        document.getElementById(
            "checkoutItems"
        );

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        window.location.href =
            "cart.html";

        return;
    }

    let total = 0;

    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === Number(item.id)
                );

            if (!product) return "";

            const quantity =
                Number(item.quantity || 1);

            total +=
                product.price * quantity;

            return `

                <div class="summary-row">

                    <span>
                        ${product.name}
                        × ${quantity}
                    </span>

                    <strong>
                        ${money(
                            product.price *
                            quantity
                        )}
                    </strong>

                </div>

            `;

        }).join("");

    setText(
        "checkoutTotal",
        money(total)
    );
}

function goToPayment(event) {

    event.preventDefault();

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        window.location.href =
            "cart.html";

        return;
    }

    const name =
        getValue("name");

    const email =
        getValue("email");

    const phone =
        getValue("phone");

    const address =
        getValue("address");

    const city =
        getValue("city");

    const pincode =
        getValue("pincode");

    if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        alert(
            "Please fill all delivery details."
        );

        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Enter a valid 10 digit phone number."
        );

        return;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {

        alert(
            "Enter a valid 6 digit PIN code."
        );

        return;
    }

    const customer = {
        name,
        email,
        phone,
        address,
        city,
        pincode
    };

    localStorage.setItem(
        "pocketDealCustomer",
        JSON.stringify(customer)
    );

    window.location.href =
        "payment.html";
}

function displayPaymentTotal() {

    const element =
        document.getElementById(
            "paymentTotal"
        );

    if (!element) return;

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === Number(item.id)
            );

        if (product) {

            total +=
                product.price *
                Number(item.quantity || 1);
        }

    });

    element.textContent =
        money(total);
}

function placeOrder() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        window.location.href =
            "cart.html";

        return;
    }

    const customer =
        localStorage.getItem(
            "pocketDealCustomer"
        );

    if (!customer) {

        alert(
            "Please complete your delivery details first."
        );

        window.location.href =
            "checkout.html";

        return;
    }

    const selected =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    const paymentMethod =
        selected
            ? selected.value
            : "UPI";

    const orderId =
        "PD" +
        Date.now()
            .toString()
            .slice(-8);

    const order = {

        orderId,

        paymentMethod,

        customer:
            JSON.parse(customer),

        cart,

        date:
            new Date().toISOString()
    };

    localStorage.setItem(
        "pocketDealOrder",
        JSON.stringify(order)
    );

    const button =
        document.querySelector(
            ".payment-card .btn-primary"
        );

    if (button) {

        button.disabled = true;

        button.textContent =
            "Processing...";
    }

    setTimeout(() => {

        localStorage.removeItem(
            "pocketDealCart"
        );

        updateCartCount();

        window.location.href =
            "success.html?order=" +
            encodeURIComponent(orderId);

    }, 3000);
}

function populateBulkProducts() {

    const select =
        document.getElementById(
            "bulkProduct"
        );

    if (!select) return;

    products.forEach(product => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            product.id;

        option.textContent =
            product.icon +
            " " +
            product.name +
            " — " +
            money(product.price);

        select.appendChild(option);
    });

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        Number(params.get("product"));

    if (productId) {

        select.value =
            String(productId);
    }
}

function submitBulkRequest(event) {

    event.preventDefault();

    const productId =
        Number(
            getValue("bulkProduct")
        );

    const quantity =
        Number(
            getValue("bulkQuantity")
        );

    const name =
        getValue("bulkName");

    const email =
        getValue("bulkEmail");

    const phone =
        getValue("bulkPhone");

    const location =
        getValue("bulkLocation");

    const message =
        getValue("bulkMessage");

    if (quantity < 5) {

        alert(
            "Bulk orders require a minimum quantity of 5."
        );

        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "Enter a valid 10 digit phone number."
        );

        return;
    }

    const product =
        products.find(
            p => p.id === productId
        );

    if (!product) {

        alert(
            "Please select a product."
        );

        return;
    }

    let discount = 0;

    if (quantity >= 50) {
        discount = 20;
    }
    else if (quantity >= 25) {
        discount = 15;
    }
    else if (quantity >= 10) {
        discount = 10;
    }
    else {
        discount = 5;
    }

    const requestId =
        "BULK" +
        Date.now()
            .toString()
            .slice(-7);

    const request = {

        requestId,

        product:
            product.name,

        productId,

        quantity,

        customer: {

            name,
            email,
            phone,
            location,
            message
        },

        estimatedDiscount:
            discount + "%",

        date:
            new Date().toISOString()
    };

    localStorage.setItem(
        "pocketDealBulkRequest",
        JSON.stringify(request)
    );

    window.location.href =
        "success.html?bulk=" +
        encodeURIComponent(requestId);
}

function loginUser(event) {

    event.preventDefault();

    const email =
        getValue("loginEmail");

    const password =
        getValue("loginPassword");

    if (!email || !password) {

        alert(
            "Please enter your login details."
        );

        return;
    }

    localStorage.setItem(
        "pocketDealUser",
        JSON.stringify({
            email
        })
    );

    alert("Login successful!");

    window.location.href =
        "index.html";
}

function googleLogin() {

    alert(
        "Google Login demo. Real Google authentication requires Firebase or another authentication service."
    );
}

function displaySuccess() {

    const orderElement =
        document.getElementById(
            "orderId"
        );

    if (!orderElement) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const bulkId =
        params.get("bulk");

    if (bulkId) {

        setText(
            "successTitle",
            "Bulk Request Submitted!"
        );

        setText(
            "successText",
            "Your bulk deal request has been received."
        );

        orderElement.textContent =
            bulkId;

        return;
    }

    let orderId =
        params.get("order");

    if (!orderId) {

        const savedOrder =
            localStorage.getItem(
                "pocketDealOrder"
            );

        if (savedOrder) {

            try {

                const order =
                    JSON.parse(savedOrder);

                orderId =
                    order.orderId;

            } catch (error) {

                console.log(
                    "Order data error"
                );
            }
        }
    }

    if (!orderId) {

        orderId =
            "PD" +
            Date.now()
                .toString()
                .slice(-8);
    }

    orderElement.textContent =
        orderId;
}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayHomeProducts();

        displayProducts();

        displayProductDetails();

        displayCart();

        displayCheckout();

        displayPaymentTotal();

        populateBulkProducts();

        displaySuccess();
    }
);
