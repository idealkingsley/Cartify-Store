document.addEventListener("DOMContentLoaded", fetchProducts);

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => displayProducts(products)) // Pass products to displayProducts
        .catch(error => console.error("Error fetching products:", error));
}


function displayProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; // Clear any previous content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "col-12 col-sm-6 col-lg-3 mb-4";
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.image}" alt="${product.title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                    <button class="btn btn-primary add-cart-btn">Add to Cart</button>
                </div>
            </div>
        `;

        // Attach the click handler to the "Add to Cart" button
        const addButton = productCard.querySelector(".add-cart-btn");
        addButton.addEventListener("click", () => handleAddToCartClick(addButton, product));

        productList.appendChild(productCard);
    });
}


document.addEventListener("DOMContentLoaded", fetchCategories);
function fetchCategories() {
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json()) // Convert response to JSON
        .then(categories => displayCategories(categories)) // Show categories on the page
        .catch(error => console.error("Error fetching categories:", error)); // Handle errors
}

function displayCategories(categories) {
    const categoryList = document.getElementById('product-cat-list');
    categoryList.innerHTML = ''; // Clear previous content

    categories.forEach(category => {
        const categoryItem = document.createElement('div');
        categoryItem.className = 'col-12 col-sm-6 col-lg-3 mb-4';
        categoryItem.innerHTML = `
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${category}</h5>
                    <button class="btn btn-primary explore-btn">View Products</button>
                </div>
            </div>
        `;

        // Attach the click handler to the button only
        const exploreButton = categoryItem.querySelector(".explore-btn");
        exploreButton.onclick = () => filterProductsByCategory(category); // Click handler to filter products

        categoryList.appendChild(categoryItem);
    });
}

function filterProductsByCategory(category) {
    fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`)
        .then(response => response.json())
        .then(products => displayProducts(products)) // Display the products
        .catch(error => console.error("Error fetching category products:", error));
}



let cart = [];

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    alert(`${product.title} added to cart!`);
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function openCartModal() {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    
    cartItemsList.innerHTML = ''; // Clear previous cart items
    let total = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            ${item.title} - $${item.price.toFixed(2)}
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });

    cartTotalDisplay.innerText = total.toFixed(2); // Update total
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart array
    updateCartCount();
    openCartModal(); // Refresh the modal content
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items.');
        return;
    }

    const totalAmount = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
    alert(`Thank you for your purchase! Total: $${totalAmount}`);

    // Clear the cart
    cart = [];
    updateCartCount();
    document.getElementById('cart-items').innerHTML = ''; // Clear modal content
    document.getElementById('cart-total').innerText = '0'; // Reset total
}

// Attach event listener to the cart icon
document.getElementById('cart-icon').addEventListener('click', () => {
    openCartModal();
    new bootstrap.Modal(document.getElementById('cartModal')).show(); // Open modal
});

// Attach checkout event listener
document.getElementById('checkout-btn').addEventListener('click', checkout);


function handleAddToCartClick(button, product) {
    button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>'
    button.disabled = true;

    setTimeout(() => {
        addToCart(product); // Add product to cart after delay
        button.innerHTML = "Add to Cart";
        button.disabled = false;
    }, 500); // 0.5 seconds delay
}

