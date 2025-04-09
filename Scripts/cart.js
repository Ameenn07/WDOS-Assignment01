// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(productName, productPrice) {
    const item = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Check if item already exists in the cart
    const existingItemIndex = cart.findIndex(item => item.name === productName);
    if (existingItemIndex !== -1) {
        // Item exists, increase the quantity
        cart[existingItemIndex].quantity += 1;
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
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.product;
        const productPrice = parseFloat(this.dataset.price);
        addToCart(productName, productPrice);
    });
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
            <td>LKR ${item.price}</td>
        `;
        cartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    // Display the total price
    document.getElementById('total-price').textContent = totalPrice;

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
