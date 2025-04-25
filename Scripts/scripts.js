// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart with a specific quantity
function addToCart(productName, productPrice, quantity) {
    console.log(`Adding to cart: ${productName}, Quantity: ${quantity}, Price: ${productPrice}`);  // Debugging
    const item = {
        name: productName,
        price: productPrice,
        quantity: parseInt(quantity) // Ensure it's treated as a number
    };

    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);
    if (existingItemIndex !== -1) {
        // Item exists, increase the quantity
        cart[existingItemIndex].quantity += item.quantity;
    } else {
        // Add new item to cart
        cart.push(item);
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    renderCart(); // Re-render the cart after adding an item
}

// Function to remove or decrease quantity of an item from the cart
function removeFromCart(productName) {
    const existingItemIndex = cart.findIndex(item => item.name === productName);

    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity > 1) {
            // If quantity is greater than 1, decrease the quantity
            cart[existingItemIndex].quantity -= 1;
        } else {
            // If quantity is 1, remove the item from cart
            cart.splice(existingItemIndex, 1);
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        renderCart(); // Re-render the cart after removing an item
    }
}

// Add event listeners to all "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', function () {
    fetch('Scripts/products.json')
        .then(response => response.json())
        .then(products => {
            const cpuSection = document.getElementById('cpu-products');
            const gpuSection = document.getElementById('gpu-products');
            const ramSection = document.getElementById('ram-products');
            const storageSection = document.getElementById('storage-products');

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>LKR ${product.price}</p>
                    <div class="cart-options">
                        <label for="quantity">Quantity:</label>
                        <input type="number" class="quantity-input" value="1" min="1" max="10">
                        <button class="add-to-cart" data-product="${product.name}" data-price="${product.price}">Add to Cart</button>
                    </div>
                `;

                // Append the product card to the appropriate category section
                if (product.category === 'CPU') {
                    cpuSection.appendChild(productCard);
                } else if (product.category === 'GPU') {
                    gpuSection.appendChild(productCard);
                } else if (product.category === 'RAM') {
                    ramSection.appendChild(productCard);
                } else if (product.category === 'Storage') {
                    storageSection.appendChild(productCard);
                }

                // Add event listener to the "Add to Cart" button for each dynamically created product card
                productCard.querySelector('.add-to-cart').addEventListener('click', function() {
                    const quantityInput = productCard.querySelector('.quantity-input');  // Fetch quantity input inside the current product card
                    const quantity = parseInt(quantityInput.value) || 1;  // Default to 1 if invalid input
                    console.log(`Button clicked for ${product.name}. Quantity selected: ${quantity}`); // Debugging
                    const productName = this.dataset.product;
                    const productPrice = parseFloat(this.dataset.price);

                    addToCart(productName, productPrice, quantity);  // Pass the correct quantity
                });
            });
        })
        .catch(error => console.error('Error loading the products data:', error));
});

// Function to render cart items on the cart page
function renderCart() {
    const cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = ''; // Clear existing items

    let totalPrice = 0;

    // Loop through cart items and add rows to the table
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${item.name} 
                <button class="remove-item" data-product="${item.name}">Remove</button>
            </td>
            <td>${item.quantity}</td>
            <td>LKR ${item.price * item.quantity}</td> <!-- Multiply price by quantity -->
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity; // Add item price to total
    });

    // Display the total price
    document.getElementById('total-price').textContent = `LKR ${totalPrice}`;

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.dataset.product;
            removeFromCart(productName);
        });
    });
}

// Load cart from localStorage and render on the cart page
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});
