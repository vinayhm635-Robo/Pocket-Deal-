/* =========================================
   POCKET DEAL NEGOTIATION SYSTEM
========================================= */

let currentNegotiationProduct = null;
let currentSellerOffer = 0;
let currentCustomerOffer = 0;
let currentNegotiationQuantity = 1;


/* -----------------------------------------
   GET PRODUCT FROM URL
----------------------------------------- */

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


/* -----------------------------------------
   LOAD NEGOTIATION PAGE
----------------------------------------- */

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
            <h2>Product not found</h2>

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


/* -----------------------------------------
   QUANTITY INFORMATION
----------------------------------------- */

function updateNegotiationInfo() {

    const quantity =
        Number(
            document.getElementById(
                "negotiationQuantity"
            )?.value || 1
        );

    if (!currentNegotiationProduct)
        return;

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
    else if (quantity >= 5) {
        discount = 5;
    }

    const result =
        document.getElementById(
            "negotiationResult"
        );

    if (!result) return;

    result.innerHTML = `

        <div class="bulk-preview">

            <strong>
                📦 Quantity: ${quantity}
            </strong>

            <span>
                Potential bulk discount:
                <b>${discount}%</b>
            </span>

        </div>

    `;
}


/* -----------------------------------------
   START NEGOTIATION
----------------------------------------- */

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

    if (quantity < 1) {

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

    const product =
        currentNegotiationProduct;

    currentCustomerOffer =
        offer;

    currentNegotiationQuantity =
        quantity;

    addNegotiationMessage(
        "customer",
        `
        💰 I want <b>${quantity}</b>
        × ${product.name}
        at <b>${money(offer)}</b> per product.
        ${message ? `<br>${message}` : ""}
        `
    );

    addNegotiationMessage(
        "ai",
        `
        🤖 I'm evaluating your offer
        and negotiating with the seller...
        `
    );

    setTimeout(
        processSellerNegotiation,
        1500
    );
}


/* -----------------------------------------
   AI NEGOTIATION LOGIC
----------------------------------------- */

function processSellerNegotiation() {

    const product =
        currentNegotiationProduct;

    const quantity =
        currentNegotiationQuantity;

    const originalPrice =
        product.price;

    const customerOffer =
        currentCustomerOffer;

    let bulkDiscount = 0;

    if (quantity >= 50) {
        bulkDiscount = 20;
    }
    else if (quantity >= 25) {
        bulkDiscount = 15;
    }
    else if (quantity >= 10) {
        bulkDiscount = 10;
    }
    else if (quantity >= 5) {
        bulkDiscount = 5;
    }

    const bulkPrice =
        originalPrice *
        (1 - bulkDiscount / 100);

    /*
       Simulated seller negotiation.

       Seller accepts if customer offer
       is reasonably close to the deal price.
    */

    const minimumSellerPrice =
        bulkPrice * 0.92;

    if (
        customerOffer >=
        minimumSellerPrice
    ) {

        currentSellerOffer =
            customerOffer;

        addNegotiationMessage(
            "ai",
            `
            🎉 Great news!
            The seller is willing to accept
            <b>${money(customerOffer)}</b>
            per product.
            `
        );

        showSellerOffer(
            customerOffer
        );

        return;
    }

    /*
       Seller creates counter offer.
    */

    currentSellerOffer =
        Math.round(
            Math.max(
                minimumSellerPrice,
                (customerOffer +
                    bulkPrice) / 2
            )
        );

    addNegotiationMessage(
        "ai",
        `
        🤖 The seller has reviewed
        your offer and sent a counter-offer.
        `
    );

    setTimeout(() => {

        showSellerOffer(
            currentSellerOffer
        );

    }, 800);
}


/* -----------------------------------------
   SHOW SELLER OFFER
----------------------------------------- */

function showSellerOffer(price) {

    const section =
        document.getElementById(
            "counterSection"
        );

    const offer =
        document.getElementById(
            "sellerOffer"
        );

    if (!section || !offer)
        return;

    section.style.display =
        "block";

    offer.innerHTML = `

        <div class="seller-price">
            ${money(price)}
            <span>per product</span>
        </div>

        <p>
            Seller's counter-offer for
            ${currentNegotiationQuantity}
            unit(s)
        </p>

        <strong>
            Total:
            ${money(
                price *
                currentNegotiationQuantity
            )}
        </strong>

    `;
}


/* -----------------------------------------
   ACCEPT SELLER OFFER
----------------------------------------- */

function acceptSellerOffer() {

    if (!currentNegotiationProduct)
        return;

    const total =
        currentSellerOffer *
        currentNegotiationQuantity;

    addNegotiationMessage(
        "customer",
        `
        ✅ I accept the seller's offer
        of <b>${money(
            currentSellerOffer
        )}</b>.
        `
    );

    addNegotiationMessage(
        "ai",
        `
        🎉 Deal accepted!
        Your negotiated total is
        <b>${money(total)}</b>.
        `
    );

    localStorage.setItem(
        "pocketDealNegotiatedDeal",
        JSON.stringify({

            product:
                currentNegotiationProduct,

            quantity:
                currentNegotiationQuantity,

            negotiatedPrice:
                currentSellerOffer,

            total

        })
    );

    const result =
        document.getElementById(
            "negotiationResult"
        );

    if (result) {

        result.innerHTML = `

            <div class="deal-success">

                <h3>
                    🎉 Deal Accepted!
                </h3>

                <p>
                    ${currentNegotiationQuantity}
                    ×
                    ${currentNegotiationProduct.name}
                </p>

                <strong>
                    ${money(currentSellerOffer)}
                    each
                </strong>

                <p>
                    Total:
                    ${money(total)}
                </p>

                <button
                    class="btn-primary full"
                    onclick="addNegotiatedDealToCart()"
                >
                    🛒 Add Negotiated Deal to Cart
                </button>

            </div>
        `;
    }
}


/* -----------------------------------------
   ADD NEGOTIATED DEAL TO CART
----------------------------------------- */

function addNegotiatedDealToCart() {

    const deal =
        JSON.parse(
            localStorage.getItem(
                "pocketDealNegotiatedDeal"
            )
        );

    if (!deal) return;

    const cart =
        getCart();

    const existing =
        cart.find(
            item =>
                item.id ===
                deal.product.id
        );

    if (existing) {

        existing.quantity +=
            deal.quantity;

    } else {

        cart.push({

            id:
                deal.product.id,

            quantity:
                deal.quantity,

            negotiatedPrice:
                deal.negotiatedPrice
        });
    }

    saveCart(cart);

    alert(
        "Negotiated deal added to cart!"
    );

    window.location.href =
        "cart.html";
}


/* -----------------------------------------
   SHOW COUNTER INPUT
----------------------------------------- */

function showCounterInput() {

    const section =
        document.getElementById(
            "customerCounter"
        );

    if (section) {

        section.style.display =
            "block";
    }
}


/* -----------------------------------------
   CUSTOMER COUNTER OFFER
----------------------------------------- */

function sendCustomerCounter() {

    const input =
        document.getElementById(
            "counterPrice"
        );

    const counter =
        Number(input.value);

    if (!counter || counter <= 0) {

        alert(
            "Enter a valid counter offer."
        );

        return;
    }

    currentCustomerOffer =
        counter;

    addNegotiationMessage(
        "customer",
        `
        🔄 My counter-offer is
        <b>${money(counter)}</b>
        per product.
        `
    );

    addNegotiationMessage(
        "ai",
        `
        🤖 Sending your counter-offer
        to the seller...
        `
    );

    document.getElementById(
        "counterSection"
    ).style.display = "none";

    setTimeout(
        processSellerNegotiation,
        1500
    );
}


/* -----------------------------------------
   REJECT SELLER OFFER
----------------------------------------- */

function rejectSellerOffer() {

    addNegotiationMessage(
        "customer",
        `
        ❌ I don't accept this offer.
        `
    );

    addNegotiationMessage(
        "ai",
        `
        No problem. You can try another
        offer or continue shopping.
        `
    );

    document.getElementById(
        "counterSection"
    ).style.display = "none";
}


/* -----------------------------------------
   CHAT MESSAGE
----------------------------------------- */

function addNegotiationMessage(
    type,
    message
) {

    const container =
        document.getElementById(
            "negotiationMessages"
        );

    if (!container) return;

    const div =
        document.createElement("div");

    div.className =
        "chat-message " + type;

    const title =
        type === "customer"
            ? "👤 You"
            : "🤖 Pocket Deal AI";

    div.innerHTML = `
        <strong>${title}</strong>
        <p>${message}</p>
    `;

    container.appendChild(div);

    container.scrollTop =
        container.scrollHeight;
}


/* -----------------------------------------
   PRODUCT PAGE NEGOTIATE BUTTON
----------------------------------------- */

function setupProductNegotiation() {

    const button =
        document.getElementById(
            "negotiateButton"
        );

    const bulkButton =
        document.getElementById(
            "bulkButton"
        );

    if (!button)
        return;

    const params =
        new URLSearchParams(
            window.location.search
        );

    const id =
        params.get("id");

    if (!id)
        return;

    button.href =
        "negotiate.html?id=" +
        id;

    if (bulkButton) {

        bulkButton.href =
            "bulk.html?product=" +
            id;
    }
}


/* -----------------------------------------
   LOAD EVERYTHING
----------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadNegotiationPage();

        setupProductNegotiation();

    }
);
