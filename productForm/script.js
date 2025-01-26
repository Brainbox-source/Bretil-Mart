import { db, collection, doc, setDoc } from "../firebaseConfig.js";

// Toggle loading indicator
function toggleLoading(isLoading) {
    const loadingIndicator = document.getElementById("loading");
    if (loadingIndicator) {
        loadingIndicator.style.display = isLoading ? "flex" : "none";
    } else {
        console.error("Loading indicator element not found.");
    }
}

// Show modal
function showModal(message) {
    const modal = document.getElementById("productAddedModal");
    const modalContent = modal.querySelector(".product-added-modal-content p");
    modalContent.textContent = message;
    modal.style.display = "block";

    // Close the modal
    const closeModalBtn = document.getElementById("closeModalBtn");
    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Auto-hide the modal after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}

// Handle form submission
document.getElementById("productForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    toggleLoading(true); // Show loader

    const images = document.getElementById("images").files;
    const name = document.getElementById("productName").value;
    const category = document.getElementById("category").value;
    let price = document.getElementById("price").value;
    const quantity = document.getElementById("quantity").value;
    const selectedColors = Array.from(document.getElementById("color").selectedOptions).map(option => option.value);
    const brand = document.getElementById("brand").value;

    price = `₦${parseFloat(price).toFixed(2)}`;

    if (images.length > 0) {
        const formData = new FormData();
        for (const image of images) {
            formData.append("images[]", image);
        }

        try {
            const response = await fetch('https://bretil-mart-server.onrender.com/upload', { method: 'POST', body: formData });
            const data = await response.json();

            if (data.urls) {
                const productRef = doc(collection(db, "products"));
                const productId = productRef.id;

                await setDoc(productRef, {
                    productId,
                    name,
                    category,
                    price,
                    quantity: parseInt(quantity),
                    color: selectedColors,
                    brand,
                    pictures: data.urls,
                    rating: 0
                });

                showModal("Product submitted successfully!");

                // Wait for the modal to show before refreshing
                setTimeout(() => {
                    window.location.reload(); // Refresh the page
                }, 2000); // Wait for 2 seconds
            } else {
                showModal("Failed to upload images.");
            }
        } catch (error) {
            console.error("Error:", error);
            showModal("An error occurred during submission.");
        } finally {
            toggleLoading(false); // Hide loader
        }
    } else {
        showModal("No images selected.");
        toggleLoading(false); // Hide loader
    }
});
