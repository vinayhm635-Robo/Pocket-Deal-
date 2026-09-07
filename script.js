/* =========================================================
   POCKET DEAL - script.js
   Complete Frontend JavaScript
   ========================================================= */


/* =========================================================
   PRODUCTS
   ========================================================= */

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


/* =========================================================
   HELPER
   ========================================================= */

function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}


function getElement(id) {
    return document.getElementById(id);
}


/* =========================================================
   CART
   ========================================================= */

function getCart() {

    try {
        return JSON.parse(
            localStorage.getItem("pocketDealCart")
        ) || [];
    }

    catch (error) {
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

    const element = getElement("cartCount");

    if (element) {
        element.textContent = count;
    }
}


function addToCart(
    productId,
    quantity = 1,
    customPrice = null
) {

    const product = products.find(
        p => Number(p.id) === Number(productId)
    );

    if (!product) {
        alert("Product not found.");
        return;
    }

    const cart = getCart();

    const existing = cart.find(
        item => Number(item.id) === Number(productId)
    );

    if (existing) {

        existing.quantity += Number(quantity);

        if (customPrice !== null) {
            existing.price = Number(customPrice);
        }

    }

    else {

        cart.push({
            id: product.id,
            name: product.name,
            category: product.category,
            price:
                customPrice !== null
                    ? Number(customPrice)
                    : product.price,
            icon: product.icon,
            quantity: Number(quantity)
        });

    }

    saveCart(cart);

    alert(
        product.name +
        " added to cart!"
    );
}


/* =========================================================
   PRODUCT CARDS
   ========================================================= */

function createProductCard(product) {

    const discount = Math.round(
        (
            (product.oldPrice - product.price) /
            product.oldPrice
        ) * 100
    );

    return `

        <div class="product-card">

            <a
                href="product.html?id=${product.id}"
                class="product-image"
            >
                <span>
                    ${product.icon}
                </span>
            </a>

            <div class="product-card-content">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-price">

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

                <div class="product-card-actions">

                    <a
                        href="product.html?id=${product.id}"
                        class="btn-secondary"
                    >
                        View
                    </a>

                    <button
                        class="btn-primary"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        </div>

    `;
}


function displayProducts(list = products) {

    const container =
        getElement("productGrid") ||
        getElement("productsGrid");

    if (!container) {
        return;
    }

    if (!list.length) {

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
        list.map(createProductCard).join("");
}


function displayHomeProducts() {

    const container =
        getElement("homeProducts");

    if (!container) {
        return;
    }

    container.innerHTML =
        products
            .map(createProductCard)
            .join("");
}


function filterCategory(category) {

    if (
        !category ||
        category.toLowerCase() === "all"
    ) {
        displayProducts(products);
        return;
    }

    const filtered =
        products.filter(
            product =>
                product.category.toLowerCase() ===
                category.toLowerCase()
        );

    displayProducts(filtered);
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProducts() {

    const input =
        getElement("searchInput");

    if (!input) {
        return;
    }

    const query =
        input.value.trim().toLowerCase();

    const result =
        products.filter(product =>

            product.name
                .toLowerCase()
                .includes(query)

            ||

            product.category
                .toLowerCase()
                .includes(query)

        );

    displayProducts(result);
}


/* =========================================================
   PRODUCT DETAILS
   ========================================================= */

let currentProductId = null;


function displayProductDetails() {

    const container =
        getElement("productDetails");

    if (!container) {
        return;
    }

    const params =
        new URLSearchParams(
            window.location.search
        );

    let id =
        Number(params.get("id"));

    /*
       If no product ID is provided,
       automatically show product 1.
    */

    if (!id) {
        id = 1;
    }

    currentProductId = id;

    const product =
        products.find(
            p => Number(p.id) === id
        );

    if (!product) {

        container.innerHTML = `

            <div class="empty-state">

                <h2>
                    ❌ Product Not Found
                </h2>

                <p>
                    Please select a product.
                </p>

                <br>

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
                (product.oldPrice - product.price) /
                product.oldPrice
            ) * 100
        );

    container.innerHTML = `

        <div class="product-details">

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
                            Pocket Deal AI negotiate
                            with the seller.
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

            </div>

        </div>

    `;
}


/* =========================================================
   BULK DEAL DISCOUNT
   ========================================================= */

function getBulkDiscount(quantity) {

    quantity = Number(quantity);

    if (quantity >= 50) {
        return 20;
    }

    if (quantity >= 25) {
        return 15;
    }

    if (quantity >= 10) {
        return 10;
    }

    if (quantity >= 5) {
        return 5;
    }

    return 0;
}


/* =========================================================
   BULK PRODUCT DROPDOWN
   ========================================================= */

function loadBulkProducts() {

    const topSelect =
        getElement("bulkProduct");

    const mainSelect =
        getElement("bulkProductMain");


    /*
       FIRST DROPDOWN
    */

    if (topSelect) {

        topSelect.innerHTML = `
            <option value="">
                Choose a product
            </option>
        `;

        products.forEach(product => {

            const option =
                document.createElement("option");

            option.value =
                product.id;

            option.textContent =
                `${product.icon} ${product.name} - ${money(product.price)}`;

            topSelect.appendChild(option);

        });

    }


    /*
       SECOND DROPDOWN
    */

    if (mainSelect) {

        mainSelect.innerHTML = `
            <option value="">
                Choose a product
            </option>
        `;

        products.forEach(product => {

            const option =
                document.createElement("option");

            option.value =
                product.id;

            option.textContent =
                `${product.icon} ${product.name} - ${money(product.price)}`;

            mainSelect.appendChild(option);

        });

    }


    /*
       Read product ID from URL.

       Example:

       bulk.html?product=5
    */

    const params =
        new URLSearchParams(
            window.location.search
        );

    const urlProduct =
        params.get("product");

    if (urlProduct) {

        if (topSelect) {
            topSelect.value = urlProduct;
        }

        if (mainSelect) {
            mainSelect.value = urlProduct;
        }

        updateBulkDeal();
    }
}


/* =========================================================
   BULK PRODUCT SYNC
   ========================================================= */

function syncBulkProduct() {

    const mainSelect =
        getElement("bulkProductMain");

    const topSelect =
        getElement("bulkProduct");

    if (!mainSelect) {
        return;
    }

    const value =
        mainSelect.value;

    if (topSelect) {
        topSelect.value = value;
    }

    updateBulkDeal();
}


function updateBulkProduct() {

    const topSelect =
        getElement("bulkProduct");

    const mainSelect =
        getElement("bulkProductMain");

    if (!topSelect) {
        return;
    }

    const value =
        topSelect.value;

    if (mainSelect) {
        mainSelect.value = value;
    }

    updateBulkDeal();
}


/* =========================================================
   BULK DEAL PREVIEW
   ========================================================= */

function updateBulkDeal() {

    const select =
        getElement("bulkProductMain");

    const quantityInput =
        getElement("bulkQuantity");

    const preview =
        getElement("bulkDealPreview");

    if (!select || !preview) {
        return;
    }

    const productId =
        Number(select.value);

    const quantity =
        Number(
            quantityInput
                ? quantityInput.value
                : 5
        );

    const product =
        products.find(
            p => Number(p.id) === productId
        );

    if (!product) {

        preview.innerHTML = `

            <h3>
                🤖 AI Deal Preview
            </h3>

            <p>
                Select a product to see your estimated deal.
            </p>

        `;

        return;
    }

    const discount =
        getBulkDiscount(quantity);

    const discountedPrice =
        Math.round(
            product.price *
            (1 - discount / 100)
        );

    const total =
        discountedPrice *
        Math.max(quantity, 0);

    preview.innerHTML = `

        <h3>
            🤖 AI Deal Preview
        </h3>

        <div class="preview-row">

            <span>
                Product
            </span>

            <strong>
                ${product.icon}
                ${product.name}
            </strong>

        </div>

        <div class="preview-row">

            <span>
                Regular Price
            </span>

            <strong>
                ${money(product.price)}
            </strong>

        </div>

        <div class="preview-row">

            <span>
                Quantity
            </span>

            <strong>
                ${quantity}
            </strong>

        </div>

        <div class="preview-row">

            <span>
                Bulk Discount
            </span>

            <strong>
                ${discount}%
            </strong>

        </div>

        <div class="preview-row highlight">

            <span>
                Estimated Price / Unit
            </span>

            <strong>
                ${money(discountedPrice)}
            </strong>

        </div>

        <div class="preview-total">

            Estimated Total:

            <strong>
                ${money(total)}
            </strong>

        </div>

    `;
}


/* =========================================================
   SUBMIT BULK DEAL
   ========================================================= */

function submitBulkDeal() {

    const productSelect =
        getElement("bulkProductMain");

    const quantityInput =
        getElement("bulkQuantity");

    const nameInput =
        getElement("bulkName");

    const emailInput =
        getElement("bulkEmail");

    const offerInput =
        getElement("bulkOffer");

    const messageInput =
        getElement("bulkMessage");

    const result =
        getElement("bulkResult");


    if (!productSelect) {
        return;
    }


    const productId =
        Number(productSelect.value);

    const quantity =
        Number(quantityInput.value);

    const name =
        nameInput.value.trim();

    const email =
        emailInput.value.trim();

    const offer =
        Number(offerInput.value);

    const message =
        messageInput.value.trim();


    if (!productId) {

        alert(
            "Please choose a product."
        );

        return;
    }


    if (quantity < 5) {

        alert(
            "Bulk deal requires minimum 5 products."
        );

        return;
    }


    if (!name) {

        alert(
            "Please enter your name."
        );

        return;
    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        return;
    }


    const product =
        products.find(
            p => Number(p.id) === productId
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;
    }


    const discount =
        getBulkDiscount(quantity);


    const bulkPrice =
        Math.round(
            product.price *
            (1 - discount / 100)
        );


    let finalPrice =
        bulkPrice;


    /*
       AI negotiation simulation
    */

    if (
        offer &&
        offer > 0 &&
        offer < bulkPrice
    ) {

        const sellerMinimum =
            Math.round(
                bulkPrice * 0.92
            );


        if (offer >= sellerMinimum) {

            finalPrice = offer;

        }

        else {

            finalPrice =
                Math.round(
                    (offer + bulkPrice) / 2
                );

        }

    }


    const total =
        finalPrice * quantity;


    const deal = {

        productId: product.id,

        productName: product.name,

        quantity: quantity,

        originalPrice: product.price,

        discount: discount,

        offeredPrice:
            offer || null,

        finalPrice: finalPrice,

        total: total,

        customerName: name,

        email: email,

        message: message,

        date:
            new Date().toISOString()

    };


    localStorage.setItem(
        "pocketDealBulkRequest",
        JSON.stringify(deal)
    );


    if (result) {

        result.innerHTML = `

            <div class="success-box">

                <div class="success-icon">
                    🤖
                </div>

                <h2>
                    Deal Request Submitted!
                </h2>

                <p>
                    Pocket Deal AI prepared your estimated deal.
                </p>

                <div class="deal-summary">

                    <div>
                        <
