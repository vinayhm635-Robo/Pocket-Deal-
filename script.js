// =====================================================
// POCKET DEAL - PRODUCTS
// =====================================================

const products = [

    // LAPTOPS
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
        name: "Lenovo IdeaPad Laptop",
        category: "Laptop",
        price: 62999,
        oldPrice: 71999,
        icon: "💻",
        description: "Performance laptop suitable for students and coding."
    },

    {
        id: 4,
        name: "Gaming Laptop RTX",
        category: "Laptop",
        price: 69999,
        oldPrice: 79999,
        icon: "🎮",
        description: "Powerful gaming laptop with dedicated graphics."
    },


    // MOBILES
    {
        id: 5,
        name: "SmartPhone X1",
        category: "Mobile",
        price: 18999,
        oldPrice: 22999,
        icon: "📱",
        description: "Modern smartphone with excellent performance and camera."
    },

    {
        id: 6,
        name: "SmartPhone Pro Max",
        category: "Mobile",
        price: 27999,
        oldPrice: 32999,
        icon: "📱",
        description: "Premium smartphone with powerful performance."
    },

    {
        id: 7,
        name: "Nova 5G Smartphone",
        category: "Mobile",
        price: 21999,
        oldPrice: 26999,
        icon: "📱",
        description: "Fast 5G smartphone with powerful processor and display."
    },


    // HEADPHONES
    {
        id: 8,
        name: "Wireless Pro Headphones",
        category: "Headphones",
        price: 2999,
        oldPrice: 4999,
        icon: "🎧",
        description: "Comfortable wireless headphones with clear sound."
    },

    {
        id: 9,
        name: "BassX Bluetooth Headphones",
        category: "Headphones",
        price: 1999,
        oldPrice: 3499,
        icon: "🎧",
        description: "Deep bass and comfortable wireless listening."
    },

    {
        id: 10,
        name: "Wireless Gaming Headset",
        category: "Headphones",
        price: 3999,
        oldPrice: 5999,
        icon: "🎧",
        description: "Gaming headset with immersive sound."
    },


    // SHOES
    {
        id: 11,
        name: "Running Sports Shoes",
        category: "Shoes",
        price: 2499,
        oldPrice: 3999,
        icon: "👟",
        description: "Lightweight running shoes for daily workouts."
    },

    {
        id: 12,
        name: "Urban Casual Shoes",
        category: "Shoes",
        price: 1799,
        oldPrice: 2999,
        icon: "👟",
        description: "Stylish casual shoes for everyday use."
    },

    {
        id: 13,
        name: "Premium Running Shoes",
        category: "Shoes",
        price: 3299,
        oldPrice: 4999,
        icon: "👟",
        description: "Premium lightweight shoes designed for comfort."
    },


    // SMARTWATCH
    {
        id: 14,
        name: "Smart Watch Pro",
        category: "Smartwatch",
        price: 3499,
        oldPrice: 5999,
        icon: "⌚",
        description: "Smartwatch with fitness tracking and notifications."
    },

    {
        id: 15,
        name: "Fitness Smart Band",
        category: "Smartwatch",
        price: 1499,
        oldPrice: 2499,
        icon: "⌚",
        description: "Lightweight fitness band for daily activity tracking."
    },


    // ACCESSORIES
    {
        id: 16,
        name: "Pocket Deal Backpack",
        category: "Accessories",
        price: 1299,
        oldPrice: 1999,
        icon: "🎒",
        description: "Durable backpack for college, office and travel."
    },

    {
        id: 17,
        name: "FastCharge Power Bank",
        category: "Accessories",
        price: 1599,
        oldPrice: 2499,
        icon: "🔋",
        description: "High-capacity power bank with fast charging."
    },


    // ELECTRONICS
    {
        id: 18,
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 1999,
        oldPrice: 2999,
        icon: "🔊",
        description: "Portable Bluetooth speaker with powerful audio."
    }

];


// =====================================================
// MONEY FORMAT
// =====================================================

function money(value) {

    return "₹" + Number(value).toLocaleString("en-IN");

}


// =====================================================
// CART
// =====================================================

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
        function(total, item) {

            return total + (item.quantity || 1);

        },
        0
    );

    const element =
        document.getElementById("cartCount");

    if (element) {

        element.textContent = count;

    }

}


// =====================================================
// PRODUCTS PAGE
// =====================================================

let currentCategory = "All";


function displayProducts() {

    const productList =
        document.getElementById("productList");

    if (!productList) {

        return;

    }


    const searchInput =
        document.getElementById("searchInput");

    const search =
        searchInput
            ? searchInput.value.toLowerCase().trim()
            : "";


    const filteredProducts =
        products.filter(function(product) {

            const categoryMatch =
                currentCategory === "All" ||
                product.category === currentCategory;


            const searchMatch =
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search) ||
                product.description.toLowerCase().includes(search);


            return categoryMatch && searchMatch;

        });


    const countElement =
        document.getElementById("productCount");

    if (countElement) {

        countElement.textContent =
            filteredProducts.length + " products";

    }


    if (filteredProducts.length === 0) {

        productList.innerHTML = `

            <div class="no-products">

                <div class="no-products-icon">
                    🔍
                </div>

                <h2>No products found</h2>

                <p>
                    Try another product or category.
                </p>

                <button onclick="resetProducts()">
                    Show All Products
                </button>

            </div>

        `;

        return;

    }


    productList.innerHTML =
        filteredProducts.map(function(product) {

            const discount =
                Math.round(
                    (
                        (product.oldPrice - product.price) /
                        product.oldPrice
                    ) * 100
                );


            return `

                <article class="product-card">

                    <div class="product-image">
                        <span>${product.icon}</span>
                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>


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

                            <del>
                                ${money(product.oldPrice)}
                            </del>

                            <span class="discount">
                                ${discount}% OFF
                            </span>

                        </div>


                        <div class="product-actions">

                            <button
                                class="view-btn"
                                onclick="viewProduct(${product.id})">

                                View Product

                            </button>


                            <button
                                class="negotiate-btn"
                                onclick="negotiateProduct(${product.id})">

                                🤝 Negotiate

                            </button>

                        </div>

                    </div>

                </article>

            `;

        }).join("");

}


// =====================================================
// FILTER
// =====================================================

function filterCategory(category) {

    currentCategory = category;


    const buttons =
        document.querySelectorAll(".filters button");


    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    buttons.forEach(function(button) {

        const text =
            button.textContent.toLowerCase();


        if (
            category === "All" &&
            text.includes("all")
        ) {

            button.classList.add("active");

        }

        else if (
            text.includes(category.toLowerCase())
        ) {

            button.classList.add("active");

        }

    });


    displayProducts();

}


function resetProducts() {

    currentCategory = "All";


    const search =
        document.getElementById("searchInput");


    if (search) {

        search.value = "";

    }


    filterCategory("All");

}


// =====================================================
// VIEW PRODUCT
// =====================================================

function viewProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(
    id,
    negotiatedPrice = null
) {

    const product =
        products.find(function(item) {

            return item.id === Number(id);

        });


    if (!product) {

        alert("Product not found.");

        return;

    }


    const cart = getCart();


    const existing =
        cart.find(function(item) {

            return item.id === product.id;

        });


    const finalPrice =
        negotiatedPrice || product.price;


    if (existing) {

        existing.quantity =
            (existing.quantity || 1) + 1;

        existing.price =
            finalPrice;

    }

    else {

        cart.push({

            id: product.id,

            name: product.name,

            category: product.category,

            icon: product.icon,

            price: finalPrice,

            oldPrice: product.oldPrice,

            quantity: 1

        });

    }


    saveCart(cart);


    alert(
        "✅ " +
        product.name +
        " added to your Deal Bag!"
    );

}


// =====================================================
// NEGOTIATION
// =====================================================

function negotiateProduct(id) {

    const product =
        products.find(function(item) {

            return item.id === Number(id);

        });


    if (!product) {

        return;

    }


    const offer =
        prompt(

            "🤖 Pocket Deal AI\n\n" +

            product.name +
            "\n\n" +

            "Current price: " +
            money(product.price) +
            "\n\n" +

            "Enter your offer price:"

        );


    if (offer === null) {

        return;

    }


    const offerPrice =
        Number(offer);


    if (
        !Number.isFinite(offerPrice) ||
        offerPrice <= 0
    ) {

        alert("Please enter a valid price.");

        return;

    }


    const minimumPrice =
        Math.round(product.price * 0.90);


    // ACCEPT OFFER

    if (offerPrice >= minimumPrice) {

        const accepted =
            confirm(

                "🎉 Pocket Deal AI\n\n" +

                "Your offer of " +
                money(offerPrice) +
                " is accepted!\n\n" +

                "Add this deal to your cart?"

            );


        if (accepted) {

            addToCart(
                product.id,
                offerPrice
            );

        }

        return;

    }


    // COUNTER OFFER

    const counterOffer =
        Math.round(
            (product.price + offerPrice) / 2
        );


    const acceptCounter =
        confirm(

            "🤖 Seller Counter Offer\n\n" +

            "Your offer: " +
            money(offerPrice) +
            "\n\n" +

            "Seller offer: " +
            money(counterOffer) +
            "\n\n" +

            "Accept this deal?"

        );


    if (acceptCounter) {

        addToCart(
            product.id,
            counterOffer
        );


        alert("🎉 Deal completed!");

    }

}


// =====================================================
// PRODUCT DETAIL PAGE
// =====================================================

function displaySingleProduct() {

    const container =
        document.getElementById("productDetails");


    if (!container) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const id =
        Number(params.get("id"));


    const product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) {

        container.innerHTML = `

            <div class="no-products">

                <h2>Product not found</h2>

                <a href="products.html">
                    ← Back to Products
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

        <div class="single-product">

            <div class="single-product-image">
                ${product.icon}
            </div>


            <div class="single-product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h1>
                    ${product.name}
                </h1>


                <p>
                    ${product.description}
                </p>


                <div class="single-price">

                    <strong>
                        ${money(product.price)}
                    </strong>

                    <del>
                        ${money(product.oldPrice)}
                    </del>

                    <span class="discount">
                        ${discount}% OFF
                    </span>

                </div>


                <div class="single-actions">

                    <button
                        onclick="addToCart(${product.id})">

                        🛒 Add to Deal Bag

                    </button>


                    <button
                        onclick="negotiateProduct(${product.id})">

                        🤝 Negotiate Price

                    </button>

                </div>

            </div>

        </div>

    `;

}


// =====================================================
// CART PAGE
// =====================================================

function displayCart() {

    const container =
        document.getElementById("cartList");


    if (!container) {

        return;

    }


    const cart = getCart();


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <div>🛒</div>

                <h2>
                    Your Deal Bag is empty
                </h2>

                <p>
                    Find a product and negotiate
                    your best price.
                </p>

                <a href="products.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;

    }


    let total = 0;


    container.innerHTML =
        cart.map(function(item, index) {

            const quantity =
                item.quantity || 1;


            total +=
                item.price * quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-icon">
                        ${item.icon}
                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            ${item.category}
                        </p>

                        <strong>
                            ${money(item.price)}
                        </strong>

                    </div>


                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>


                    <button
                        class="remove-cart"
                        onclick="removeFromCart(${index})">

                        Remove

                    </button>

                </div>

            `;

        }).join("");


    const totalElement =
        document.getElementById("cartTotal");


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }

}


// =====================================================
// QUANTITY
// =====================================================

function changeQuantity(index, amount) {

    const cart = getCart();


    if (!cart[index]) {

        return;

    }


    cart[index].quantity =
        (cart[index].quantity || 1) + amount;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart(cart);

    displayCart();

}


// =====================================================
// REMOVE CART ITEM
// =====================================================

function removeFromCart(index) {

    const cart = getCart();


    cart.splice(index, 1);


    saveCart(cart);

    displayCart();

}


// =====================================================
// CLEAR CART
// =====================================================

function clearCart() {

    localStorage.removeItem(
        "pocketDealCart"
    );


    updateCartCount();

    displayCart();

}


// =====================================================
// BULK DEAL PRODUCT DROPDOWN
// =====================================================

function loadBulkProducts() {

    const select =
        document.getElementById("productSelect");


    if (!select) {

        return;

    }


    select.innerHTML = `
        <option value="">
            Choose a product
        </option>
    `;


    products.forEach(function(product) {

        const option =
            document.createElement("option");


        option.value =
            product.id;


        option.textContent =
            product.icon +
            " " +
            product.name +
            " - " +
            money(product.price);


        select.appendChild(option);

    });

}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayProducts();

        displaySingleProduct();

        displayCart();

        loadBulkProducts();

    }
);
