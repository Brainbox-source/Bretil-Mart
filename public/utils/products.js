// Import Firebase dependencies
import { db, collection, getDocs, getDoc, doc, deleteDoc, updateDoc } from "../firebaseConfig.js";

const productCollection = collection(db, "products");

// Get all products
export const getAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(productCollection);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error("Error fetching all products: ", error);
    throw error;
  }
};

// Get a single product by ID
export const getSingleProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    if (productSnap.exists()) {
      return { id: productSnap.id, ...productSnap.data() };
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}: `, error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    return { success: true, message: `Product with ID ${productId} deleted successfully.` };
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}: `, error);
    throw error;
  }
};

// Update a product by ID
export const updateProduct = async (productId, updatedData) => {
  try {
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, updatedData);
    return { success: true, message: `Product with ID ${productId} updated successfully.` };
  } catch (error) {
    console.error(`Error updating product with ID ${productId}: `, error);
    throw error;
  }
};
