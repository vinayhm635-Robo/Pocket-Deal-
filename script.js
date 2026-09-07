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


// ===============================
// BASIC FUNCTIONS
// ===============================

function money(value) {
    return "₹" + Number(value).toLocaleString("en-IN");
}

function getValue(id) {
    const element = document.getElementById(id);

    if (!element) {
        return "";
    }

    return element.value.trim();
}

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value;
    }
}


// ===============================
// CART FUNCTIONS
// ===============================

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

    const cart =
