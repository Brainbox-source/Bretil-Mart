window.onload = function () {
    // Fetch products from sessionStorage
    const productQuery = sessionStorage.getItem('products');
    if (productQuery) {
        // Get product data from sessionStorage (assuming the data is stored as an array)
        const products = JSON.parse(productQuery) || [];

        // Search for the product by name or ID
        const product = products.find(p => p.id === productQuery || p.name.toLowerCase().includes(productQuery.toLowerCase()));

        if (products) {
            // Update product name and other details
            document.getElementById('product-name').innerText = product.name;
            document.getElementById('productTitle').innerText = product.name;
            document.getElementById('productDescription').innerText = product.description || "No description available.";
            document.getElementById('currentPrice').innerText = product.price || "₦0.00";
            document.getElementById('oldPrice').innerText = product.oldPrice || product.price;
            document.getElementById('quantity').innerText = product.quantity || "N/A";
            document.getElementById('color').innerText = product.color ? product.color.join(", ") : "No color specified";

            // Update the main image
            document.getElementById('mainImage').src = product.image || "default-image.jpg";

            // Update thumbnails if any
            const thumbnailsContainer = document.getElementById('thumbnails');
            if (product.images) {
                product.images.forEach(imgSrc => {
                    const img = document.createElement('img');
                    img.src = imgSrc;
                    img.className = 'thumbnail';
                    thumbnailsContainer.appendChild(img);
                });
            }
        } else {
            alert('Product not found!');
        }
    } else {
        // alert('No search query found!');
    }
}




document.addEventListener('DOMContentLoaded', () => {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');

    if (data) {
      // Parse the JSON data from query string
      const product = JSON.parse(decodeURIComponent(data));

      // Dynamically populate product details
      document.getElementById('productTitle').textContent = product.name;
      document.getElementById('mainImage').src = product.image;
      document.getElementById('productDescription').textContent = product.description;
      document.querySelector('.rating span').textContent = `${product.rating} Rating`;
    }
  });







// //GET ALL THE DATA-NAME OF PRODUCTS


// //updating the all product side
// function updateBreadcrumb(productname) {
//   // Select the breadcrumb span where the product name is displayed
//   var productSpan = document.getElementById("product-name");
//   //updating the product name in the breadcrumb
//   productSpan.textContent = productname;

// }

// // JavaScript for Product Page Interactivity

// // Image and Product Name Switching
// const mainImage = document.getElementById('mainImage');
// const thumbnails = document.querySelectorAll('.thumbnails img');
// const productNameElement = document.querySelector('.product-details h1');

// thumbnails.forEach((thumbnail) => {
//     thumbnail.addEventListener('click', (event) => {
//         // Update the main image
//         mainImage.src = event.target.src;

//         // Update the product name
//         const newName = event.target.getAttribute('data-name');
//         productNameElement.textContent = newName;

//         // Remove active class from all thumbnails
//         thumbnails.forEach((thumb) => thumb.classList.remove('active-thumbnail'));

//         // Add active class to the clicked thumbnail
//         event.target.classList.add('active-thumbnail');
//     });
// });

// // Subscription Pricing Update
// const subscriptionOptions = document.querySelectorAll('.subscription-option input[type="radio"]');
// const currentPriceElement = document.querySelector('.current-price');

// subscriptionOptions.forEach((option) => {
//     option.addEventListener('change', () => {
//         if (option.id === '90-day') {
//             currentPriceElement.textContent = '$37/Month';
//         } else if (option.id === '30-day') {
//             currentPriceElement.textContent = '$40/Month';
//         }
//     });
// });

// // Thumbnail Carousel for Smaller Screens
// if (window.innerWidth < 768) {
//     const thumbnailsContainer = document.querySelector('.thumbnails');
//     thumbnailsContainer.style.overflowX = 'scroll';
//     thumbnailsContainer.style.whiteSpace = 'nowrap';

//     thumbnails.forEach((thumbnail) => {
//         thumbnail.style.display = 'inline-block';
//         thumbnail.style.marginRight = '10px';
//     });
// }









// // JavaScript for Product Page Interactivity
// // Image Switching Functionality
// const mainImage = document.getElementById('mainImage');
// const thumbnails = document.querySelectorAll('.thumbnails img');

// thumbnails.forEach((thumbnail) => {
//     thumbnail.addEventListener('click', (event) => {
//         // Update the main image
//         mainImage.src = event.target.src;

//         // Remove active class from all thumbnails
//         thumbnails.forEach((thumb) => thumb.classList.remove('active-thumbnail'));

//         // Add active class to the clicked thumbnail
//         event.target.classList.add('active-thumbnail');
//     });
// });

// // Subscription Pricing Update
// const subscriptionOptions = document.querySelectorAll('.subscription-option input[type="radio"]');
// const currentPriceElement = document.querySelector('.current-price');

// subscriptionOptions.forEach((option) => {
//     option.addEventListener('change', () => {
//         if (option.id === '90-day') {
//             currentPriceElement.textContent = '$37/Month';
//         } else if (option.id === '30-day') {
//             currentPriceElement.textContent = '$40/Month';
//         }
//     });
// });

// // Thumbnail Carousel for Smaller Screens
// if (window.innerWidth < 768) {
//     const thumbnailsContainer = document.querySelector('.thumbnails');
//     thumbnailsContainer.style.overflowX = 'scroll';
//     thumbnailsContainer.style.whiteSpace = 'nowrap';

//     thumbnails.forEach((thumbnail) => {
//         thumbnail.style.display = 'inline-block';
//         thumbnail.style.marginRight = '10px';
//     });
// }




// // Select the main image and all thumbnails
// const mainImage = document.getElementById('mainImage');
// const thumbnails = document.querySelectorAll('.thumbnail');

// // Add click event listeners to each thumbnail
// thumbnails.forEach(thumbnail => {
//   thumbnail.addEventListener('click', () => {
//     // Update the main image source with the clicked thumbnail's source
//     mainImage.src = thumbnail.src;

//     // Optional: Add a border to the selected thumbnail
//     thumbnails.forEach(thumb => thumb.classList.remove('active-thumbnail'));
//     thumbnail.classList.add('active-thumbnail');
//   });
// });
