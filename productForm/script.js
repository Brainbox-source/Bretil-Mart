import { db, collection, doc, setDoc } from "../firebaseConfig.js";


// Listen for the form submission event
document.getElementById('productForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Collect the form data
    const images = document.getElementById('images').files;
    const name = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    let price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    
    // Get selected colors as an array
    const selectedColors = Array.from(document.getElementById('color').selectedOptions).map(option => option.value);
    
    const brand = document.getElementById('brand').value;

    // Append Naira sign to the price and convert it to a string
    price = `₦${parseFloat(price).toFixed(2)}`;

    if (images.length > 0) {
        // Prepare the form data for the image upload
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('images[]', images[i]);  // Append each selected image
        }

        try {
            // Send the images to the backend for processing
            const response = await fetch('https://bretil-mart-server.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json(); // Parse the JSON response from the backend
            console.log(data);
            if (data.urls) {
                // After successful upload, get the image URL from Dropbox
                const dropboxUrls = data.urls;

                // Generate a new productId using Firestore's auto-generated document ID
                const productRef = doc(collection(db, 'products')); // This automatically generates a new product ID
                const productId = productRef.id; // Extract the generated ID

                // Now send the product details to Firebase Firestore, including the image URL and productId
                const productData = {
                    productId,      // Use the generated productId
                    name,
                    category,
                    price,          // Price with Naira sign
                    quantity: parseInt(quantity),
                    color: selectedColors,  // Multiple selected colors stored as an array
                    brand,
                    pictures: dropboxUrls,
                    rating: 0,      // Default rating is 0
                };

                // Store the product data in Firestore
                await setDoc(productRef, productData);

                alert('Product submitted successfully!');
            } else {
                alert('Failed to upload image to Dropbox.');
            }
        } catch (error) {
            console.error('Error uploading image to backend:', error);
            alert('Error uploading image.');
        }
    } else {
        alert('No images selected.');
    }
});
