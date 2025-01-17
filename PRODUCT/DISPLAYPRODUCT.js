// export function displayfunction(productId) {
//     console.log('called');
//     const productQuery = sessionStorage.getItem('products');
//     if (productQuery) {
//         // Get product data from sessionStorage (assuming the data is stored as an array)
//         const products = JSON.parse(productQuery) || [];

//         // Search for the product by name or ID
//         const product = products.find(p => p.id === productId);
//         if (product) {
//             console.log(product);
            
//             // Store the found product as a single item in sessionStorage
//             sessionStorage.setItem('singleProduct', JSON.stringify(product));
//         } else {
//             console.log('Product not found');
//         }
//     }
// }
