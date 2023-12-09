document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById("cart");
  const cartModal = document.getElementById("cart-modal");
  const closeBtn = document.querySelector(".close");
  const cartCount = document.getElementById("cart-count");
  const cartItemsList = document.getElementById("cart-items");
  const productList = document.getElementById("product-list");

  let products; // Declare products variable globally

  // fetching Dummy product data from JSON file
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Set products to the fetched data
      initializeProducts(products);
    })
    .catch((error) => console.error("Error fetching products:", error));

  // Rendering Products
  function initializeProducts(products) {
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
              <div class="product">
              <img src=${product.image} />
                  <h3>${product.title}</h3>
                  <p>₹${product.price}</p>
                  <button onclick="addToCart(${product.id})">Add to Cart</button>
              </div>
          `;
      productList.appendChild(productItem);
    });
  }


  // Keep track of added items in the cart
  const cartItems = [];

  // Function to add items to the cart
  window.addToCart = function (productId) {
    const product = products.find((p) => p.id === productId);

    if (product) {
      cartItems.push(product);
      updateCart();
    }
  };

  //Function To Update The Cart
//   function updateCart() {
//     let count = cartItems.length;
//     cartCount.innerText = count;

//     // Update the cart modal content
//     cartItemsList.innerHTML = "";
//     cartItems.forEach((item) => {

//       // Create a container div for each cart item
//       const cartItemContainer = document.createElement("div");
//       cartItemContainer.classList.add("cart-item-container");

//       const cartItem = document.createElement("div");
//       cartItem.textContent = `${item.title} - $${item.price.toFixed(2)}`;
      
//       // Create an image element and set its source
//       const cartItemImage = document.createElement("img");
//       cartItemImage.src = item.image;
//       cartItemImage.alt = item.name; 
//       cartItem.appendChild(cartItemImage);
//        // Add a class to the image element
//       cartItemImage.classList.add('cart-item-image');

//       //removing button inside Cart
//       const removeButton = document.createElement("button");
//       removeButton.textContent = "Remove";
//       removeButton.onclick = () => removeCartItem(item);
//       cartItem.appendChild(removeButton);

//       // Append the cartItem content to the container
//       cartItemContainer.appendChild(cartItem);
      
//       // Append the container to the cartItemsList
//       cartItemsList.appendChild(cartItemContainer);
//     });
// }

function updateCart() {
  let count = cartItems.length;
  cartCount.innerText = count;

  // Update the cart modal content
  cartItemsList.innerHTML = "";
  cartItems.forEach((item) => {
      // Create a container div for each cart item
      const cartItemContainer = document.createElement("div");
      cartItemContainer.classList.add("cart-item-container");

      // Create an image element and set its source
      const cartItemImage = document.createElement("img");
      cartItemImage.src = item.image;
      cartItemImage.alt = item.name; 
      cartItemImage.classList.add('cart-item-image');

      // Create a div for text content
      const cartItemText = document.createElement("div");
      
      cartItemText.textContent = `${item.title} -\n ₹${item.price.toFixed(2)}`;

      // Create a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => removeCartItem(item);

      // Append the image, text, and remove button to the container
      cartItemContainer.appendChild(cartItemImage);
      cartItemContainer.appendChild(cartItemText);
      cartItemContainer.appendChild(removeButton);

      // Append the container to the cartItemsList
      cartItemsList.appendChild(cartItemContainer);
  });
}



  // Remove item from the cart
  function removeCartItem(item) {
    const index = cartItems.indexOf(item);
    if (index !== -1) {
      cartItems.splice(index, 1);
      updateCart();
    }
  }

  // Show/hide Cart
  window.openCart = function () {
    cartModal.style.display = "block";
  };

  window.closeCart = function () {
    cartModal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === cartModal) {
      closeCart();
    }
  };
});



