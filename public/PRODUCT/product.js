import { db, doc, getDoc, setDoc, auth, signOut, onAuthStateChanged } from '../firebaseConfig.js';

function loadProductDetails(maxQuantity = 200) {
    const selectedProduct = JSON.parse(sessionStorage.getItem('singleProduct'));
    console.log(selectedProduct);

    if (selectedProduct) {
        const productContainer = document.getElementById('productContainer');
        const productDetailsCon = document.getElementById('productDetailsCon');
        const productName = document.getElementById('productName');

        if (!productContainer || !productDetailsCon) {
            console.error('Required container elements not found in the DOM.');
            return;
        }

        document.title = selectedProduct.brand || 'Product Details';
        productContainer.innerHTML = '';
        productDetailsCon.innerHTML = '';

        if (selectedProduct.pictures && Array.isArray(selectedProduct.pictures)) {
            selectedProduct.pictures.forEach((picture, index) => {
                const productImage = document.createElement('img');
                productImage.src = picture || 'path/to/placeholder-image.jpg';
                productImage.alt = `${selectedProduct.brand || 'Product'} image ${index + 1}`;
                productImage.classList.add('product-image');
                productContainer.appendChild(productImage);
            });
        } else {
            productContainer.innerHTML = '<p>No images available for this product.</p>';
        }

        const productBrand = document.createElement('h3');
        productBrand.textContent = selectedProduct.brand || 'Unknown';
        productName.textContent = selectedProduct.brand || 'Unknown';
        productBrand.classList.add('product-brand');
        productDetailsCon.appendChild(productBrand);

        const productPrice = document.createElement('p');
        productPrice.textContent = selectedProduct.price || 'Unavailable';
        productPrice.classList.add('product-price');
        productDetailsCon.appendChild(productPrice);

        const productCategory = document.createElement('p');
        productCategory.textContent = (selectedProduct.category || 'Uncategorized')
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        productCategory.classList.add('product-category');
        productDetailsCon.appendChild(productCategory);

        const productQuantity = document.createElement('p');
        const quantity = selectedProduct.quantity || 0;
        productQuantity.textContent = `Available Quantity: ${quantity} pcs`;
        productQuantity.classList.add('product-quantity');
        productDetailsCon.appendChild(productQuantity);

        const progressBar = document.createElement('div');
        progressBar.classList.add('progress-bar');
        const percentageFilled = Math.round((quantity / maxQuantity) * 20);

        for (let i = 0; i < 20; i++) {
            const block = document.createElement('div');
            block.classList.add('block');
            if (i < percentageFilled) {
                block.classList.add(quantity < 100 ? 'filled-red' : 'filled');
            }
            progressBar.appendChild(block);
        }
        productDetailsCon.appendChild(progressBar);

        addQuantitySelectorAndCartButton(productDetailsCon, selectedProduct);

        // Add video to the product details container
        const productVideoContainer = document.createElement('div');
        productVideoContainer.id = 'productVideoContainer';
        productVideoContainer.classList.add('product-video-container');

        const productVideo = document.createElement('video');
        productVideo.id = 'productVideo';
        // productVideo.controls = true;
        productVideo.autoplay = true;
        productVideo.loop = true;

        const productCategoryKey = selectedProduct.category?.toLowerCase() || "default";
        const videoSrc = {
            "fresh produce": "../img/fresh-produce.mov",
            "beverages": "../img/beverages.mov",
            "canned goods": "../img/canned-goods.mov",
            "grains & pasta": "../img/grains-and-pasta.mov",
            "frozen foods": "../img/frozen-goods.mov",
            "meat & seafood": "../img/meat-and-seafood.mov",
            "diary products": "../img/diary-products.mov",
            "baked goods": "../img/baked-goods.mov",
            "snacks": "../img/snacks.mov",
            "condiments & sauces": "../img/condiments-and-sauces.mov",
            "spices & herbs": "../img/spices-and-herbs.mov",
            "sweets & deserts": "../img/sweets-and-deserts.mov"
        }[productCategoryKey] || "/videos/default.mp4";

        const videoSource = document.createElement('source');
        videoSource.src = videoSrc;
        videoSource.type = 'video/mp4';

        productVideo.appendChild(videoSource);
        productVideoContainer.appendChild(productVideo);
        productDetailsCon.appendChild(productVideoContainer);

    } else {
        document.getElementById('productContainer').innerHTML = '<p>No product data found.</p>';
    }
}


function addQuantitySelectorAndCartButton(container, product) {
    // Create the main container for the quantity selector and add-to-cart button
    const mainContainer = document.createElement('div');
    mainContainer.classList.add('quantity-add-cart-container');

    // Quantity selector container
    const quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity-selector');

    // Minus button
    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.classList.add('quantity-btn');
    minusButton.addEventListener('click', () => {
        const quantityInput = quantityContainer.querySelector('.quantity-input');
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = Math.max(1, currentValue - 1);
    });
    quantityContainer.appendChild(minusButton);

    // Quantity input
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.classList.add('quantity-input');
    quantityContainer.appendChild(quantityInput);

    // Plus button
    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.classList.add('quantity-btn');
    plusButton.addEventListener('click', () => {
        const currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
    });
    quantityContainer.appendChild(plusButton);

    // Add to Cart button
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart-btn');
    addToCartButton.addEventListener('click', () => {
        const productId = product.id;
        const productName = product.brand;
        const productPrice = product.price;
        const quantity = parseInt(quantityInput.value);

        if (productId && productName && !isNaN(quantity) && quantity > 0) {
            toggleLoading(true); // Show the loading indicator
            addToCart(productId, productName, productPrice, quantity);
            quantityInput.value = 1;
        } else {
            console.error('Error adding to cart. Missing product details or invalid quantity.');
        }
    });

    // Append both containers to the main container
    mainContainer.appendChild(quantityContainer);
    mainContainer.appendChild(addToCartButton);

    // Append the main container to the product details container
    container.appendChild(mainContainer);
}

// Call the function to load product details
loadProductDetails();

// Function to update the cart item count in the UI
function updateCartItemCount(cartData) {
    const totalItems = cartData.reduce((total, item) => total + item.quantity, 0);
    const cartItemCountElement = document.getElementById("zero");

    if (cartItemCountElement) {
        cartItemCountElement.textContent = totalItems;
    }
}

// Function to add product to cart
async function addToCart(productId, productName, productPrice, quantity) {
    const loader = document.getElementById("loader"); // Assuming loader has this ID

    // Check if loader exists before trying to manipulate its style
    if (loader) {   
        loader.style.display = "block"; // Show the loader before starting the cart update
    }

    try {
        const user = auth.currentUser;

        if (!user) {
            console.log("User is not logged in. Redirect to login page.");
            return;
        }

        // Reference to the user's cart in Firestore
        const cartRef = doc(db, "carts", user.uid);

        // Get the current cart
        const cartDoc = await getDoc(cartRef);

        let cartData = cartDoc.exists() ? cartDoc.data().items : [];

        // Get the product details from session storage
        const products = JSON.parse(sessionStorage.getItem('products')) || [];
        const product = products.find(item => item.id === productId);

        if (!product) {
            console.error('Product not found!');
            return;
        }

        // Check if the quantity to add exceeds the available stock
        if (quantity > product.quantity) {
            showModal(`Sorry! Only ${product.quantity} of this product is available.`);
            return;
        }

        // Check if product already exists in the cart
        const productIndex = cartData.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            // Product exists, update quantity
            const currentQuantityInCart = cartData[productIndex].quantity;
            const newQuantity = currentQuantityInCart + quantity;

            if (newQuantity > product.quantity) {
                showModal(`You can only add ${product.quantity - currentQuantityInCart} more of this product.`);
                return;
            }

            cartData[productIndex].quantity = newQuantity;
        } else {
            // Product doesn't exist, add new product to the cart
            cartData.push({
                id: productId,
                name: productName,
                price: `${productPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
                quantity: quantity,
                picture: product.pictures && product.pictures.length > 0 ? product.pictures[0] : 'default-image.jpg' // Add product picture
            });
        }

        // Update Firestore with the new cart data
        await setDoc(cartRef, { items: cartData });

        // Save to localStorage for faster UI updates
        localStorage.setItem("cart", JSON.stringify(cartData));

        // Update the cart item count in the UI
        updateCartItemCount(cartData);

        // Show modal that the product has been added
        showModal("Product Added Successfully!");

        console.log("Product added to cart!", cartData);
    } catch (error) {
        console.error("Error adding product to cart:", error);

        // Hide the loader in case of error
        if (loader) {
            loader.style.display = "none";
        }
    } finally {
        // Ensure the loader is hidden in case of any issues
        if (loader) {
            loader.style.display = "none"; // Hide the loading indicator
        }

        toggleLoading(false); // If you're using a custom function for this
    }
}

// Toggle loading indicator
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById("loading");
    console.log(`Loader toggled: ${isLoading ? "ON" : "OFF"}`);
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? "flex" : "none";
    } else {
        console.error("Loading indicator element not found.");
    }
}

// Function to show the modal
function showModal(message) {
    const modal = document.getElementById("productAddedModal");
    const modalContent = modal.querySelector(".product-added-modal-content p");
    modalContent.textContent = message;
    modal.style.display = "block";

    // Close the modal when the "Close" button is clicked
    const closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Automatically hide the modal after 3 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000); // Adjust the time (in milliseconds) as needed (3000ms = 3 seconds)
}