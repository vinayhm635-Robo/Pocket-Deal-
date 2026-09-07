/* =========================================================
   POCKET DEAL
   Main JavaScript
   ========================================================= */


/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [

    {
        id: 1,
        name: "Acer Aspire 5 Laptop",
        category: "Laptop",
        price: 54999,
        oldPrice: 62999,
        icon: "💻",
        description:
            "Powerful laptop for coding, study, office work and entertainment."
    },

    {
        id: 2,
        name: "HP 15 Laptop",
        category: "Laptop",
        price: 58999,
        oldPrice: 67999,
        icon: "💻",
        description:
            "Reliable laptop for everyday productivity and entertainment."
    },

    {
        id: 3,
        name: "SmartPhone X1",
        category: "Mobile",
        price: 18999,
        oldPrice: 22999,
        icon: "📱",
        description:
            "Modern smartphone with excellent performance and camera."
    },

    {
        id: 4,
        name: "SmartPhone Pro Max",
        category: "Mobile",
        price: 27999,
        oldPrice: 32999,
        icon: "📱",
        description:
            "Premium smartphone with powerful performance."
    },

    {
        id: 5,
        name: "Wireless Pro Headphones",
        category: "Headphones",
        price: 2999,
        oldPrice: 4999,
        icon: "🎧",
        description:
            "Comfortable wireless headphones with clear sound."
    },

    {
        id: 6,
        name: "BassX Bluetooth Headphones",
        category: "Headphones",
        price: 1999,
        oldPrice: 3499,
        icon: "🎧",
        description:
            "Deep bass and comfortable wireless listening."
    },

    {
        id: 7,
        name: "Running Sports Shoes",
        category: "Shoes",
        price: 2499,
        oldPrice: 3999,
        icon: "👟",
        description:
            "Lightweight running shoes for daily workouts."
    },

    {
        id: 8,
        name: "Urban Casual Shoes",
        category: "Shoes",
        price: 1799,
        oldPrice: 2999,
        icon: "👟",
        description:
            "Stylish casual shoes for everyday use."
    }

];


/* =========================================================
   COMMON FUNCTIONS
   ========================================================= */

function money(value) {

    return "₹" +
        Number(value || 0).toLocaleString("en-IN");

}


function getValue(id) {

    const element =
        document.getElementById(id);

    return element ? element.value : "";

}


function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}


/* =========================================================
   CART
   ========================================================= */

function getCart() {

    try {

        return JSON.parse(
            localStorage.getItem("pocketDealCart")
        ) || [];

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

    const count =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );

    const element =
        document.getElementById("cartCount");

    if (element) {

        element.textContent = count;

    }

}


/* =========================================================
   ADD TO CART
   ========================================================= */

function addToCart(id, quantity = 1) {

    const product =
        products.find(
            product => product.id === Number(id)
        );

    if (!product) {

        alert("Product not found.");

        return;

    }

    const cart = getCart();

    const existing =
        cart.find(
            item => item.id === product.id
        );

    if (existing) {

        existing.quantity += Number(quantity);

    } else {

        cart.push({

            id: product.id,

            quantity: Number(quantity),

            negotiatedPrice: null

        });

    }

    saveCart(cart);

    alert(
        product.name +
        " added to cart!"
    );

}


/* =========================================================
   PRODUCT CARD
   ========================================================= */

function createProductCard(product) {

    return `

        <div class="product-card">

            <div class="product-icon">
                ${product.icon}
            </div>

            <div class="product-category">
                ${product.category}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p class="product-description">
                ${product.description}
            </p>

            <div class="product-price">

                <strong>
                    ${money(product.price)}
                </strong>

                <span>
                    ${money(product.oldPrice)}
                </span>

            </div>

            <div class="product-card-actions">

                <a
                    href="product.html?id=${product.id}"
                    class="btn-secondary"
                >
                    View Product
                </a>

                <a
                    href="negotiate.html?id=${product.id}"
                    class="negotiate-small"
                >
                    🤝 Negotiate
                </a>

            </div>

        </div>

    `;

}


/* =========================================================
   DISPLAY PRODUCTS
   ========================================================= */

function displayProducts() {

    const container =
        document.getElementById("productsContainer");

    if (!container) return;

    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";

    const category =
        localStorage.getItem(
            "selectedCategory"
        ) || "All";

    let filtered =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search) ||

                product.category
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    No products found
                </h2>

                <p>
                    Try another search.
                </p>

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
        document.getElementById(
            "homeProducts"
        );

    if (!container) return;

    container.innerHTML =
        products
            .slice(0, 8)
            .map(createProductCard)
            .join("");

}


function filterCategory(category) {

    localStorage.setItem(
        "selectedCategory",
        category
    );

    displayProducts();

}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

let currentProductId = null;


function displayProductDetails() {

    const container =
        document.getElementById(
            "productDetails"
        );

    if (!container) return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("id"));

    currentProductId = id;

    const product =
        products.find(
            item => item.id === id
        );

    if (!product) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    The product you are looking for
                    does not exist.
                </p>

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

    const discount =
        Math.round(
            (
                (product.oldPrice -
                    product.price) /
                product.oldPrice
            ) * 100
        );

    container.innerHTML = `

        <div class="product-detail-image">

            <div class="big-product-icon">
                ${product.icon}
            </div>

        </div>


        <div class="product-detail-info">

            <div class="product-category">
                ${product.category}
            </div>

            <h1>
                ${product.name}
            </h1>

            <div class="rating">
                ⭐ 4.5
                <span>
                    Excellent choice
                </span>
            </div>

            <p class="detail-description">
                ${product.description}
            </p>

            <div class="detail-price">

                <strong>
                    ${money(product.price)}
                </strong>

                <span>
                    ${money(product.oldPrice)}
                </span>

                <b>
                    ${discount}% OFF
                </b>

            </div>


            <div class="deal-highlight">

                <div>
                    🤖
                </div>

                <div>

                    <strong>
                        Want a better price?
                    </strong>

                    <p>
                        Bid your own price and let
                        Pocket Deal AI negotiate.
                    </p>

                </div>

            </div>


            <div class="product-actions">

                <button
                    class="btn-primary"
                    onclick="addToCart(${product.id})"
                >
                    🛒 Add to Cart
                </button>


                <a
                    href="negotiate.html?id=${product.id}"
                    class="btn-negotiate"
                >
                    🤝 Negotiate Price
                </a>


                <a
                    href="bulk.html?product=${product.id}"
                    class="btn-secondary"
                >
                    📦 Bulk Deal
                </a>

            </div>


            <div class="feature-row">

                <div>
                    🚚
                    <span>
                        Fast Delivery
                    </span>
                </div>

                <div>
                    🔒
                    <span>
                        Secure Payment
                    </span>
                </div>

                <div>
                    🤝
                    <span>
                        AI Negotiation
                    </span>
                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   CART DISPLAY
   ========================================================= */

function displayCart() {

    const container =
        document.getElementById(
            "cartContainer"
        );

    if (!container) return;

    const cart = getCart();

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    Add some products to continue.
                </p>

                <a
                    href="products.html"
                    class="btn-primary"
                >
                    Start Shopping
                </a>

            </div>

        `;

        updateCartTotal();

        return;

    }

    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return "";

            const price =
                item.negotiatedPrice ||
                product.price;

            return `

                <div class="cart-item">

                    <div class="cart-product-icon">
                        ${product.icon}
                    </div>

                    <div class="cart-product-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${item.negotiatedPrice
                                ? "🤝 Negotiated Price"
                                : money(product.price)}
                        </p>

                    </div>

                    <div class="quantity-control">

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                -1
                            )"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(
                                ${product.id},
                                1
                            )"
                        >
                            +
                        </button>

                    </div>

                    <strong>
                        ${money(
                            price *
                            item.quantity
                        )}
                    </strong>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(
                            ${product.id}
                        )"
                    >
                        🗑️
                    </button>

                </div>

            `;

        }).join("");

    updateCartTotal();

}


function updateCartTotal() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) return;

        const price =
            item.negotiatedPrice ||
            product.price;

        total +=
            price *
            Number(item.quantity || 1);

    });

    const element =
        document.getElementById(
            "cartTotal"
        );

    if (element) {

        element.textContent =
            money(total);

    }

}


function changeQuantity(id, change) {

    const cart = getCart();

    const item =
        cart.find(
            item => item.id === Number(id)
        );

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        const index =
            cart.indexOf(item);

        cart.splice(index, 1);

    }

    saveCart(cart);

    displayCart();

}


function removeFromCart(id) {

    const cart =
        getCart().filter(
            item => item.id !== Number(id)
        );

    saveCart(cart);

    displayCart();

}


/* =========================================================
   CHECKOUT
   ========================================================= */

function checkCartBeforeCheckout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

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

    let total = 0;

    container.innerHTML =
        cart.map(item => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            if (!product) return "";

            const price =
                item.negotiatedPrice ||
                product.price;

            const itemTotal =
                price *
                item.quantity;

            total += itemTotal;

            return `

                <div class="checkout-item">

                    <span>
                        ${product.icon}
                        ${product.name}
                        × ${item.quantity}
                    </span>

                    <strong>
                        ${money(itemTotal)}
                    </strong>

                </div>

            `;

        }).join("");

    setText(
        "checkoutTotal",
        money(total)
    );

}


/* =========================================================
   PAYMENT
   ========================================================= */

function goToPayment(event) {

    if (event) {
        event.preventDefault();
    }

    if (!checkCartBeforeCheckout())
        return;

    window.location.href =
        "payment.html";

}


function displayPaymentTotal() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );

        if (!product) return;

        const price =
            item.negotiatedPrice ||
            product.price;

        total +=
            price *
            item.quantity;

    });

    setText(
        "paymentTotal",
        money(total)
    );

}


function placeOrder() {

    const cart = getCart();

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }

    const button =
        document.getElementById(
            "paymentButton"
        );

    if (button) {

        button.disabled = true;

        button.textContent =
            "Processing Payment...";

    }

    setTimeout(
        () => {

            localStorage.setItem(
                "pocketDealOrder",
                JSON.stringify({

                    orderId:
                        "PD" +
                        Date.now(),

                    items: cart,

                    date:
                        new Date().toISOString()

                })
            );

            localStorage.removeItem(
                "pocketDealCart"
            );

            window.location.href =
                "success.html";

        },
        3000
    );

}


/* =========================================================
   BULK DEAL
   ========================================================= */

function getBulkDiscount(quantity) {

    quantity =
        Number(quantity);

    if (quantity >= 50)
        return 20;

    if (quantity >= 25)
        return 15;

    if (quantity >= 10)
        return 10;

    if (quantity >= 5)
        return 5;

    return 0;

}


function populateBulkProducts() {

    const select =
        document.getElementById(
            "bulkProduct"
        );

    if (!select) return;

    select.innerHTML = `

        <option value="">
            Select Product
        </option>

    `;

    products.forEach(product => {

        select.innerHTML += `

            <option value="${product.id}">
                ${product.name}
                - ${money(product.price)}
            </option>

        `;

    });

}


function submitBulkRequest(event) {

    if (event) {
        event.preventDefault();
    }

    const productId =
        Number(
            getValue("bulkProduct")
        );

    const quantity =
        Number(
            getValue("bulkQuantity")
        );

    if (!productId || quantity < 1) {

        alert(
            "Please select a product and quantity."
        );

        return;

    }

    const product =
        products.find(
            p => p.id === productId
        );

    const discount =
        getBulkDiscount(quantity);

    const finalPrice =
        Math.round(
            product.price *
            (1 - discount / 100)
        );

    const total =
        finalPrice *
        quantity;

    const result =
        document.getElementById(
            "bulkResult"
        );

    if (result) {

        result.innerHTML = `

            <div class="deal-success">

                <h3>
                    🎉 Bulk Deal Available
                </h3>

                <p>
                    ${product.name}
                </p>

                <p>
                    Quantity:
                    <strong>
                        ${quantity}
                    </strong>
                </p>

                <p>
                    Discount:
                    <strong>
                        ${discount}%
                    </strong>
                </p>

                <p>
                    Negotiated Price:
                    <strong>
                        ${money(finalPrice)}
                    </strong>
                    each
                </p>

                <p>
                    Total:
                    <strong>
                        ${money(total)}
                    </strong>
                </p>

            </div>

        `;

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser(event) {

    if (event) {
        event.preventDefault();
    }

    const name =
        getValue("name") ||
        getValue("username") ||
        "Pocket Deal User";

    localStorage.setItem(
        "pocketDealUser",
        name
    );

    window.location.href =
        "index.html";

}


function googleLogin() {

    localStorage.setItem(
        "pocketDealUser",
        "Google User"
    );

    window.location.href =
        "index.html";

}


/* =========================================================
   SUCCESS PAGE
   ========================================================= */

function displaySuccess() {

    const orderId =
        document.getElementById(
            "orderId"
        );

    if (!orderId) return;

    const order =
        JSON.parse(
            localStorage.getItem(
                "pocketDealOrder"
            )
        );

    if (order) {

        orderId.textContent =
            order.orderId;

    }

}


/* =========================================================
   NEGOTIATION
   ========================================================= */

let currentNegotiationProduct = null;

let currentSellerOffer = 0;

let currentCustomerOffer = 0;

let currentNegotiationQuantity = 1;


/* ---------------------------------------------------------
   GET NEGOTIATION PRODUCT
--------------------------------------------------------- */

function getNegotiationProduct() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        Number(params.get("id"));

    return products.find(
        product => product.id === id
    );

}


/* ---------------------------------------------------------
   LOAD NEGOTIATION PAGE
--------------------------------------------------------- */

function loadNegotiationPage() {

    const info =
        document.getElementById(
            "negotiationProductInfo"
        );

    if (!info) return;

    const product =
        getNegotiationProduct();

    if (!product) {

        info.innerHTML = `

            <h2>
                Product Not Found
            </h2>

            <a
                href="products.html"
                class="btn-primary"
            >
                Back to Shop
            </a>

        `;

        return;

    }

    currentNegotiationProduct =
        product;

    const image =
        document.getElementById(
            "negotiationProductImage"
        );

    if (image) {

        image.textContent =
            product.icon;

    }

    info.innerHTML = `

        <div class="product-category">
            ${product.category}
        </div>

        <h2>
            ${product.name}
        </h2>

        <div class="price">
            ${money(product.price)}

            <span class="old-price">
                ${money(product.oldPrice)}
            </span>

        </div>

        <p>
            ${product.description}
        </p>

        <div class="deal-info">

            <strong>
                Listed Price
            </strong>

            <span>
                ${money(product.price)}
            </span>

        </div>

    `;

    const offerInput =
        document.getElementById(
            "offerPrice"
        );

    if (offerInput) {

        offerInput.placeholder =
            "Example: " +
            Math.round(
                product.price * 0.90
            );

    }

    updateNegotiationInfo();

}


/* ---------------------------------------------------------
   UPDATE NEGOTIATION INFORMATION
--------------------------------------------------------- */

function updateNegotiationInfo() {

    const quantity =
        Number(
            document.getElementById(
                "negotiationQuantity"
            )?.value || 1
        );

    if (!currentNegotiationProduct)
        return;

    const discount =
        getBulkDiscount(quantity);

    const bulkPrice =
        Math.round(
            currentNegotiationProduct.price *
            (1 - discount / 100)
        );

    const result =
        document.getElementById(
            "negotiationResult"
        );

    if (!result) return;

    result.innerHTML = `

        <div class="bulk-preview">

            <strong>
                📦 ${quantity} unit(s)
            </strong>

            <span>
                Potential bulk discount:
                <b>${discount}%</b>
            </span>

            <span>
                AI target price:
                <b>${money(bulkPrice)}</b>
            </span>

        </div>

    `;

}


/* ---------------------------------------------------------
   START NEGOTIATION
--------------------------------------------------------- */

function startNegotiation() {

    if (!currentNegotiationProduct) {

        alert(
            "Please select a product."
        );

        return;

    }

    const quantity =
        Number(
            document.getElementById(
                "negotiationQuantity"
            ).value
        );

    const offer =
        Number(
            document.getElementById(
                "offerPrice"
            ).value
        );

    const message =
        document.getElementById(
            "offerMessage"
        ).value.trim();

    if (!quantity || quantity < 1) {

        alert(
            "Enter a valid quantity."
        );

        return;

    }

    if (!offer || offer <= 0) {

        alert(
            "Enter your offer price."
        );

        return;

    }

    if (
        offer >
        currentNegotiationProduct.price
    ) {

        alert(
            "Your offer is already higher than the listed price."
        );

        return;

    }

    currentCustomerOffer =
        offer;

    currentNegotiationQuantity =
        quantity;


    addNegotiationMessage(
        "customer",

        `
        💰 I want
        <b>${quantity}</b>
        × ${currentNegotiationProduct.name}
        at
        <b>${money(offer)}</b>
        per product.

        ${message
            ? `<br>${message}`
            : ""}
        `
    );


    addNegotiationMessage(
        "ai",

        `
        🤖 I'm evaluating your offer
        and negotiating with the seller...
        `
    );


    const button =
        document.querySelector(
            ".negotiation-card .btn-primary"
        );

    if (button) {

        button.disabled = true;

        button.textContent =
            "🤖 Negotiating...";

    }


    setTimeout(
        processSellerNegotiation,
        1500
    );
