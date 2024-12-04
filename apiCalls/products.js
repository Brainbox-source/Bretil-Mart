import {db,
    collection,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    setDoc,
    query, 
    where } from '../firebaseConfig.js'

// Add a new product to Firestore
async function addItem(product) {
    try {
        const productsCollection = collection(db, "products"); // Reference to products collection
        const docRef = await addDoc(productsCollection, {
            pictures: product.pictures, 
            names: product.name, 
            categories: product.category,
            prices: product.price,
            colors: product.colors,
            brands: product.brand,
            ratings: product.rating,
            quantities: product.quantity,
            productId: "", // Placeholder for productId
        });

        // Update the document to include the productId (doc.id)
        const productRef = doc(db, "products", docRef.id); // Reference to the newly created product document
        await setDoc(productRef, {
            productId: docRef.id
        }, { merge: true });

        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// Get all products from Firestore
async function getItems() {
    const productsCollection = await collection(db, "products"); // Reference to products collection
    const querySnapshot = await getDocs(productsCollection);
    const products = [];

    querySnapshot.forEach((doc) => {
        // Push each product data into the products array
        products.push({
            id: doc.id,
            ...doc.data() // Spread the product data and include doc.id as productId
        });
    });

    return products; // Return the array of products
}

// Get a product by its specific ID
async function getItemById(id) {
    const productRef = doc(db, "products", id); // Reference to a specific product by ID
    const docSnap = await getDoc(productRef);
    let product = {};

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        product = docSnap.data();
    } else {
        console.log("No such document!");
    }

    return product;
}

// Update a product in Firestore
async function updateItem(id, updatedData) {
    const productRef = doc(db, "products", id); // Reference to the specific product by ID
    await updateDoc(productRef, updatedData);
    console.log("Document updated successfully");
}

// Delete a product from Firestore
async function deleteItem(id) {
    const productRef = doc(db, "products", id); // Reference to the specific product by ID
    await deleteDoc(productRef);
    console.log("Document deleted successfully");
}

export {
    updateItem, 
    deleteItem, 
    getItemById, 
    addItem, 
    getItems
};
