const selectedProduct = JSON.parse(sessionStorage.getItem('singleProduct'));
console.log(selectedProduct);

if (selectedProduct) {
    const productContainer = document.getElementById('productContainer');

    // Clear any existing content in the container
    productContainer.innerHTML = '';

    // Check if pictures array exists and is non-empty
    if (selectedProduct.pictures && Array.isArray(selectedProduct.pictures) && selectedProduct.pictures.length > 0) {
        // Loop through each picture in the pictures array
        selectedProduct.pictures.forEach((picture, index) => {
            // Create and display an image for each picture
            const productImage = document.createElement('img');
            productImage.src = picture || ''; // Fallback image if picture is missing
            productImage.alt = `${selectedProduct.brand || 'Product'} image ${index + 1}`;
            productContainer.appendChild(productImage);
        });
    } else {
        // Display a message if no pictures are available
        const noImageMessage = document.createElement('p');
        noImageMessage.textContent = 'No images available for this product.';
        productContainer.appendChild(noImageMessage);
    }   

    // Display product brand
    const productBrand = document.createElement('h3');
    productBrand.textContent = `Brand: ${selectedProduct.brand || 'Unknown'}`;
    productContainer.appendChild(productBrand);

    // Display product price
    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: ${selectedProduct.price || 'Unavailable'}`;
    productContainer.appendChild(productPrice);
} else {
    // Fallback if no product is found in sessionStorage
    document.getElementById('productContainer').innerHTML = '<p>No product data found.</p>';
}
