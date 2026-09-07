function displayProductDetails() {

    const container =
        document.getElementById("productDetails");

    if (!container) {
        return;
    }

    /*
       Get product ID from URL.

       Example:
       product.html?id=5

       If no ID is provided,
       show product 1 automatically.
    */

    const params =
        new URLSearchParams(
            window.location.search
        );

    let id =
        Number(params.get("id"));

    if (!id || id < 1) {
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

                <div class="empty-icon">
                    ❌
                </div>

                <h2>
                    Product Not Found
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
                (product.oldPrice -
                    product.price) /
                product.oldPrice
            ) * 100
        );


    container.innerHTML = `

        <div class="product-details">


            <!-- PRODUCT IMAGE -->

            <div class="product-detail-image">

                <div class="big-product-icon">
                    ${product.icon}
                </div>

            </div>


            <!-- PRODUCT INFORMATION -->

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


                <!-- PRICE -->

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


                <!-- AI NEGOTIATION -->

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


                <!-- BUTTONS -->

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


                <!-- FEATURES -->

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
