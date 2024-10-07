// Retrieve cart and total elements
const cart = document.getElementById("cart");
const totalDisplay = document.getElementById("total");
const itemList = document.getElementById("item-list");
const addItemForm = document.getElementById("add-item-form");
const itemNameInput = document.getElementById("item-name");
const itemPriceInput = document.getElementById("item-price");
const clearCartButton = document.getElementById("clear-cart");
// Store the cart items and total price
let cartItems = [];
let total = 0;

// Function to update the cart
function updateCart() {
  // Clear the cart content
  cart.innerHTML = "";

  // If no items in the cart
  if (cartItems.length === 0) {
    cart.innerHTML = "<p>No items in cart.</p>";
  } else {
    // Create a list of cart items
    const ul = document.createElement("ul");
    cartItems.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      ul.appendChild(li);
    });
    cart.appendChild(ul);
  }

  // Update the total price
  totalDisplay.textContent = total.toFixed(2);
}

// func to add an item to the cart
function addToCart(event) {
  const clicker = event.target;
  const itemName = clicker.getAttribute("data-name");
  const itemPrice = parseFloat(clicker.getAttribute("data-price"));

  // Add item to the cart array
  cartItems.push({ name: itemName, price: itemPrice });

  // Update the total price
  total += itemPrice;

  // Update the cart display
  updateCart();
}
// func to add a new item to the current items list
function addNewItem(event) {
  event.preventDefault(); // Prevent form submission

  const itemName = itemNameInput.value;
  const itemPrice = parseFloat(itemPriceInput.value);

  // Create a new item div
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  // Assign the name and price to item
  const itemNameElement = document.createElement("h3");
  itemNameElement.textContent = itemName;
  const itemPriceElement = document.createElement("p");
  itemPriceElement.textContent = `$${itemPrice.toFixed(2)}`;

  // Create an "Add to Cart" button
  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.setAttribute("data-name", itemName);
  addToCartButton.setAttribute("data-price", itemPrice);
  addToCartButton.textContent = "Add to Cart";

  // Append elements to the new item div
  itemDiv.appendChild(itemNameElement);
  itemDiv.appendChild(itemPriceElement);
  itemDiv.appendChild(addToCartButton);

  // Add the new item to the item list
  itemList.appendChild(itemDiv);

  // Attach event listener to the new button
  addToCartButton.addEventListener("click", addToCart);

  // Clear the input fields
  itemNameInput.value = "";
  itemPriceInput.value = "";
}
// Function to clear the cart
function clearCart() {
  cartItems = [];
  total = 0;
  updateCart();
}

// Attach event listeners to each "Add to Cart" clicker
document.querySelectorAll(".add-to-cart").forEach((clicker) => {
  clicker.addEventListener("click", addToCart);
});

// Attach event listener to the "Add New Item" form
addItemForm.addEventListener("submit", addNewItem);
clearCartButton.addEventListener("click", clearCart);
