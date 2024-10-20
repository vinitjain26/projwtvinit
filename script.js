// Function to add items to cart
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get cart from localStorage or create a new one
    let product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if the item is already in the cart, if so, update the quantity
    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart to localStorage
    alert(`${productName} has been added to your cart`);
}

// Function to display cart items on the cart page
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty!</p>';
    } else {
        cart.forEach((item, index) => {
            let itemTotal = item.price * item.quantity;
            total += itemTotal;

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price} rs</p>
                    <p>Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
        });

        cartContainer.innerHTML += `<h2>Total: ${total} rs</h2>`;
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1); // Remove item at the specified index
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload(); // Refresh the page to update the cart
}

// Load the cart when the cart page is opened
if (window.location.pathname.includes('cart.html')) {
    displayCart();
}
