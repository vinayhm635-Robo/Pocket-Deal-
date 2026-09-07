/* =========================================================
   POCKET DEAL
   Complete Frontend JavaScript
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
   HELPER FUNCTIONS
   ========================================================= */

function money(value) {

    return "₹" + Number(value).toLocaleString("en-IN");

}


function getElement(id) {

    return document.getElementById(id);

}


function setText(id, value) {

    const element = getElement(id);

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


function addToCart(productId, quantity = 1, customPrice = null) {

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

    } else {

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
        `${product.name} added to cart successfully!`
    );

}


/* =========================================================
   PRODUCT CARDS
   ========================================================= */

function createProductCard(product) {

    const discount = Math.round(

        (
            (product.oldPrice - product.price)
            /
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
        getElement("homeProducts") ||
        getElement("productGrid");

    if (!container) {
        return;
    }


    container.innerHTML =
        products
            .slice(0, 8)
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
       If product.html is opened without ?id=
       show product 1 instead of blank page.
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
                    Please select a product from the shop.
                </p>

                <br>

                <a
                    href="products.html"
                    class="btn-primary"
                >
                    🛍️ Back to Shop
                </a>

            </div>

        `;

        return;

    }


    const discount =
        Math.round(

            (
                (product.oldPrice - product.price)
                /
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

        </div>

    `;

}


/* =========================================================
   BULK DEAL
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
   LOAD BULK PRODUCT DROPDOWNS
   ========================================================= */

function loadBulkProducts() {

    const topSelect =
        getElement("bulkProduct");


    const mainSelect =
        getElement("bulkProductMain");


    /*
       Fill first dropdown
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
       Fill second dropdown
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
       Read product from URL.

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

        updateBulkProduct();

    }

}


/* =========================================================
   SYNC PRODUCT DROPDOWNS
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


/* =========================================================
   UPDATE TOP PRODUCT SELECT
   ========================================================= */

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
   UPDATE BULK DEAL
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

        <div class="deal-preview-product">

            <span class="preview-icon">
                ${product.icon}
            </span>

            <div>

                <strong>
                    ${product.name}
                </strong>

                <small>
                    ${product.category}
                </small>

            </div>

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


    /*
       Validation
    */

    if (!productId) {

        alert(
            "Please choose a product."
        );

        return;

    }


    if (quantity < 5) {

        alert(
            "Bulk deal requires a minimum quantity of 5."
        );

        quantityInput.focus();

        return;

    }


    if (!name) {

        alert(
            "Please enter your name."
        );

        nameInput.focus();

        return;

    }


    if (!email) {

        alert(
            "Please enter your email."
        );

        emailInput.focus();

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


    /*
       Simulated AI negotiation
    */

    let finalPrice =
        bulkPrice;


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

        } else {

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


    /*
       Show result
    */

    result.innerHTML = `

        <div class="success-box">

            <div class="success-icon">
                🤖
            </div>

            <h2>
                Deal Request Submitted!
            </h2>

            <p>
                Pocket Deal AI has prepared your estimated deal.
            </p>


            <div class="deal-summary">

                <div>
                    <span>Product</span>
                    <strong>
                        ${product.name}
                    </strong>
                </div>


                <div>
                    <span>Quantity</span>
                    <strong>
                        ${quantity}
                    </strong>
                </div>


                <div>
                    <span>Discount</span>
                    <strong>
                        ${discount}%
                    </strong>
                </div>


                <div>
                    <span>Price Per Product</span>
                    <strong>
                        ${money(finalPrice)}
                    </strong>
                </div>


                <div class="total">

                    <span>
                        Estimated Total
                    </span>

                    <strong>
                        ${money(total)}
                    </strong>

                </div>

            </div>


            <p class="ai-message">

                🤖 AI:
                Your bulk request is ready.
                The seller can accept, reject or
                counter your offer.

            </p>


            <button
                class="btn-primary"
                onclick="addBulkDealToCart()"
            >
                🛒 Add Deal to Cart
            </button>

        </div>

    `;


    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

}


/* =========================================================
   ADD BULK DEAL TO CART
   ========================================================= */

function addBulkDealToCart() {

    const saved =
        localStorage.getItem(
            "pocketDealBulkRequest"
        );


    if (!saved) {

        alert(
            "No bulk deal found."
        );

        return;

    }


    const deal =
        JSON.parse(saved);


    addToCart(
        deal.productId,
        deal.quantity,
        deal.finalPrice
    );


    setTimeout(() => {

        window.location.href =
            "cart.html";

    }, 500);

}


/* =========================================================
   CART PAGE
   ========================================================= */

function displayCart() {

    const container =
        getElement("cartItems");


    if (!container) {
        return;
    }


    const cart =
        getCart();


    if (!cart.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🛒
                </div>

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Add products to continue shopping.
                </p>

                <br>

                <a
                    href="products.html"
                    class="btn-primary"
                >
                    Continue Shopping
                </a>

            </div>

        `;

        updateCartTotals();

        return;

    }


    container.innerHTML =
        cart.map((item, index) => `

            <div class="cart-item">

                <div class="cart-item-icon">
                    ${item.icon || "🛍️"}
                </div>


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${money(item.price)}
                        per item
                    </p>

                </div>


                <div class="cart-quantity">

                    <button
                        onclick="changeQuantity(${index}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${index}, 1)"
                    >
                        +
                    </button>

                </div>


                <strong>
                    ${money(
                        item.price * item.quantity
                    )}
                </strong>


                <button
                    class="remove-btn"
                    onclick="removeCartItem(${index})"
                >
                    ❌
                </button>

            </div>

        `).join("");


    updateCartTotals();

}


function changeQuantity(index, change) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart[index].quantity += change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

}


function removeCartItem(index) {

    const cart =
        getCart();


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

}


function updateCartTotals() {

    const cart =
        getCart();


    const subtotal =
        cart.reduce(

            (sum, item) =>
                sum +
                (
                    Number(item.price) *
                    Number(item.quantity)
                ),

            0

        );


    const subtotalElement =
        getElement("cartSubtotal");


    const totalElement =
        getElement("cartTotal");


    if (subtotalElement) {

        subtotalElement.textContent =
            money(subtotal);

    }


    if (totalElement) {

        totalElement.textContent =
            money(subtotal);

    }

}


/* =========================================================
   NEGOTIATION
   ========================================================= */

let currentNegotiationProduct = null;


function loadNegotiationProduct() {

    const info =
        getElement(
            "negotiationProductInfo"
        );


    if (!info) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id")) || 1;


    const product =
        products.find(
            p => Number(p.id) === id
        );


    if (!product) {

        info.innerHTML =
            "<h2>Product Not Found</h2>";

        return;

    }


    currentNegotiationProduct =
        product;


    const image =
        getElement(
            "negotiationProductImage"
        );


    if (image) {

        image.textContent =
            product.icon;

    }


    info.innerHTML = `

        <h2>
            ${product.name}
        </h2>

        <p>
            ${product.description}
        </p>

        <h3>
            ${money(product.price)}
        </h3>

    `;

}


function updateNegotiationInfo() {

    const quantityInput =
        getElement("negotiationQuantity");


    if (!quantityInput) {
        return;
    }


    const quantity =
        Number(quantityInput.value);


    const product =
        currentNegotiationProduct;


    if (!product) {
        return;
    }


    const discount =
        getBulkDiscount(quantity);


    const estimated =
        Math.round(
            product.price *
            (1 - discount / 100)
        );


    const result =
        getElement("negotiationResult");


    if (result) {

        result.innerHTML = `

            <p>
                Estimated bulk price:
                <strong>
                    ${money(estimated)}
                </strong>
                per product
            </p>

        `;

    }

}


function startNegotiation() {

    if (!currentNegotiationProduct) {

        alert(
            "Please select a product."
        );

        return;

    }


    const quantity =
        Number(
            getElement(
                "negotiationQuantity"
            ).value
        );


    const offer =
        Number(
            getElement(
                "offerPrice"
            ).value
        );


    if (quantity < 1) {

        alert(
            "Quantity must be at least 1."
        );

        return;

    }


    if (!offer || offer <= 0) {

        alert(
            "Please enter your offer price."
        );

        return;

    }


    const product =
        currentNegotiationProduct;


    const discount =
        getBulkDiscount(quantity);


    const bulkPrice =
        Math.round(
            product.price *
            (1 - discount / 100)
        );


    const sellerMinimum =
        Math.round(
            bulkPrice * 0.92
        );


    let sellerPrice;


    if (offer >= sellerMinimum) {

        sellerPrice = offer;

        showNegotiationMessage(`

            <strong>
                🤖 Pocket Deal AI
            </strong>

            <p>
                Great! The seller can accept
                your offer of
                <strong>${money(offer)}</strong>
                per product.
            </p>

        `);


        showSellerOffer(
            sellerPrice
        );


    } else {

        sellerPrice =
            Math.round(
                (offer + bulkPrice) / 2
            );


        if (sellerPrice < sellerMinimum) {

            sellerPrice =
                sellerMinimum;

        }


        showNegotiationMessage(`

            <strong>
                🤖 Pocket Deal AI
            </strong>

            <p>
                Your offer is a little below
                the seller's target.
                I negotiated a counter-offer
                for you.
            </p>

        `);


        showSellerOffer(
            sellerPrice
        );

    }

}


function showNegotiationMessage(message) {

    const container =
        getElement(
            "negotiationMessages"
        );


    if (!container) {
        return;
    }


    const div =
        document.createElement("div");


    div.className =
        "chat-message ai";


    div.innerHTML =
        message;


    container.appendChild(div);


    container.scrollTop =
        container.scrollHeight;

}


function showSellerOffer(price) {

    const section =
        getElement("counterSection");


    const offer =
        getElement("sellerOffer");


    if (!section || !offer) {
        return;
    }


    offer.innerHTML = `

        <div>

            <span>
                Seller Counter Offer
            </span>

            <strong>
                ${money(price)}
            </strong>

            <small>
                per product
            </small>

        </div>

    `;


    section.style.display =
        "block";


    section.dataset.price =
        price;

}


function acceptSellerOffer() {

    const section =
        getElement("counterSection");


    if (!section) {
        return;
    }


    const price =
        Number(
            section.dataset.price
        );


    const quantity =
        Number(
            getElement(
                "negotiationQuantity"
            ).value
        );


    const deal = {

        productId:
            currentNegotiationProduct.id,

        productName:
            currentNegotiationProduct.name,

        quantity:
            quantity,

        negotiatedPrice:
            price,

        total:
            price * quantity

    };


    localStorage.setItem(
        "pocketDealNegotiatedDeal",
        JSON.stringify(deal)
    );


    showNegotiationMessage(`

        <strong>
            🤖 Pocket Deal AI
        </strong>

        <p>
            ✅ Deal accepted at
            <strong>${money(price)}</strong>
            per product.
        </p>

    `);


    const result =
        getElement(
            "negotiationResult"
        );


    if (result) {

        result.innerHTML = `

            <div class="success-box">

                <h3>
                    ✅ Deal Accepted
                </h3>

                <p>
                    ${quantity} ×
                    ${money(price)}
                </p>

                <strong>
                    Total:
                    ${money(price * quantity)}
                </strong>

                <br><br>

                <button
                    class="btn-primary"
                    onclick="addNegotiatedDealToCart()"
                >
                    🛒 Add Deal to Cart
                </button>

            </div>

        `;

    }

}


function showCounterInput() {

    const element =
        getElement(
            "customerCounter"
        );


    if (element) {

        element.style.display =
            "block";

    }

}


function sendCustomerCounter() {

    const input =
        getElement("counterPrice");


    const section =
        getElement("counterSection");


    if (!input || !section) {
        return;
    }


    const counter =
        Number(input.value);


    if (!counter || counter <= 0) {

        alert(
            "Enter a valid counter price."
        );

        return;

    }


    section.dataset.price =
        counter;


    showNegotiationMessage(`

        <strong>
            👤 You
        </strong>

        <p>
            I would like to pay
            <strong>${money(counter)}</strong>
            per product.
        </p>

    `);


    const product =
        currentNegotiationProduct;


    const quantity =
        Number(
            getElement(
                "negotiationQuantity"
            ).value
        );


    const bulkPrice =
        Math.round(
            product.price *
            (
                1 -
                getBulkDiscount(quantity) / 100
            )
        );


    if (counter >= bulkPrice * 0.90) {

        showSellerOffer(counter);

    } else {

        const newPrice =
            Math.round(
                (counter + bulkPrice) / 2
            );


        showSellerOffer(newPrice);

    }

}


function rejectSellerOffer() {

    const section =
        getElement("counterSection");


    if (section) {

        section.style.display =
            "none";

    }


    showNegotiationMessage(`

        <strong>
            🤖 Pocket Deal AI
        </strong>

        <p>
            ❌ Deal rejected.
            You can make a new offer anytime.
        </p>

    `);

}


function addNegotiatedDealToCart() {

    const saved =
        localStorage.getItem(
            "pocketDealNegotiatedDeal"
        );


    if (!saved) {

        alert(
            "No negotiated deal found."
        );

        return;

    }


    const deal =
        JSON.parse(saved);


    addToCart(

        deal.productId,

        deal.quantity,

        deal.negotiatedPrice

    );


    setTimeout(() => {

        window.location.href =
            "cart.html";

    }, 500);

}


/* =========================================================
   PAYMENT
   ========================================================= */

function startPayment() {

    const button =
        getElement("paymentButton");


    if (button) {

        button.disabled =
            true;

        button.textContent =
            "Processing Payment...";

    }


    setTimeout(() => {

        window.location.href =
            "success.html";

    }, 3000);

}


/* =========================================================
   SUCCESS PAGE
   ========================================================= */

function loadSuccessPage() {

    const order =
        localStorage.getItem(
            "pocketDealOrder"
        );


    const element =
        getElement("orderNumber");


    if (element) {

        const random =
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        element.textContent =
            "PD" + random;

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const email =
        getElement("loginEmail");


    const password =
        getElement("loginPassword");


    if (!email || !password) {
        return;
    }


    if (
        !email.value.trim() ||
        !password.value.trim()
    ) {

        alert(
            "Please enter email and password."
        );

        return;

    }


    localStorage.setItem(
        "pocketDealUser",
        email.value.trim()
    );


    window.location.href =
        "index.html";

}


function demoGoogleLogin() {

    localStorage.setItem(
        "pocketDealUser",
        "Demo Google User"
    );


    alert(
        "Demo Google login successful!"
    );


    window.location.href =
        "index.html";

}


/* =========================================================
   PAGE INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "Pocket Deal JavaScript loaded successfully."
        );


        /*
           CART
        */

        updateCartCount();


        /*
           PRODUCT PAGE
        */

        displayProductDetails();


        /*
           PRODUCTS PAGE
        */

        if (
            getElement("productGrid") ||
            getElement("productsGrid")
        ) {

            displayProducts();

        }


        /*
           HOME PAGE
        */

        if (
            getElement("homeProducts")
        ) {

            displayHomeProducts();

        }


        /*
           CART PAGE
        */

        if (
            getElement("cartItems")
        ) {

            displayCart();

        }


        /*
           BULK DEAL PAGE

           THIS IS THE IMPORTANT FIX.
        */

        if (
            getElement("bulkProduct") ||
            getElement("bulkProductMain")
        ) {

            loadBulkProducts();

            updateBulkDeal();

        }


        /*
           NEGOTIATION PAGE
        */

        if (
            getElement(
                "negotiationProductInfo"
            )
        ) {

            loadNegotiationProduct();

            updateNegotiationInfo();

        }


        /*
           SUCCESS PAGE
        */

        if (
            getElement("orderNumber")
        ) {

            loadSuccessPage();

        }

    }
);
