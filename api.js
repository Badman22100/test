/*
Database Schema:

1. Categories Collection (objectType: 'category')
   {
     objectId: string,          // Unique identifier
     objectType: 'category',    // Fixed type
     objectData: {
       name: string,           // Category name (e.g., "Reptiles")
       thumbnail: string,      // URL to category image or Base64 encoded image
       displayOrder: number    // Order in which to display categories
     }
   }

2. Products Collection (objectType: 'product:{categoryId}')
   {
     objectId: string,          // Unique identifier
     objectType: 'product:{categoryId}',  // Dynamic type based on category
     objectData: {
       title: string,          // Product title
       price: number,          // Regular price
       discountPrice: number,  // Optional sale price
       description: string,    // Full product description
       images: string[],       // Array of image URLs or Base64 encoded images
       species: string,        // Species/breed information
       stockStatus: string     // "In Stock" or "Out of Stock"
     }
   }

3. Orders Collection (objectType: 'order')
   {
     objectId: string,          // Unique identifier
     objectType: 'order',       // Fixed type
     objectData: {
       fullName: string,       // Customer's full name
       phoneNumber: string,    // Customer's phone number
       email: string,         // Customer's email address
       productId: string,     // ID of the ordered product
       productTitle: string,  // Title of the ordered product
       productPrice: number,  // Price of the product when ordered
       orderDate: string,    // ISO date string of when the order was placed
       status: string        // Order status (New, Processed, etc.)
     }
   }
*/

function handleApiResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

const api = {
    // Image handling
    async handleImageUpload(file) {
        try {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    // Check file size (limit to 5MB)
                    if (file.size > 5 * 1024 * 1024) {
                        reject(new Error('Image size should be less than 5MB'));
                        return;
                    }
                    resolve(reader.result);
                };
                reader.onerror = () => {
                    reject(new Error('Failed to read file'));
                };
                reader.readAsDataURL(file);
            });
        } catch (error) {
            console.error('Failed to handle image upload:', error);
            throw error;
        }
    },

    // Category APIs
    async getCategories() {
        try {
            const response = await trickleListObjects('category', 100, true);
            return response.items;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            throw error;
        }
    },

    async createCategory(categoryData) {
        try {
            return await trickleCreateObject('category', categoryData);
        } catch (error) {
            console.error('Failed to create category:', error);
            throw error;
        }
    },

    async updateCategory(categoryId, categoryData) {
        try {
            return await trickleUpdateObject('category', categoryId, categoryData);
        } catch (error) {
            console.error('Failed to update category:', error);
            throw error;
        }
    },

    async deleteCategory(categoryId) {
        try {
            await trickleDeleteObject('category', categoryId);
        } catch (error) {
            console.error('Failed to delete category:', error);
            throw error;
        }
    },

    // Product APIs
    async getProducts(categoryId) {
        try {
            const response = await trickleListObjects(`product:${categoryId}`, 100, true);
            return response.items;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            throw error;
        }
    },

    async createProduct(categoryId, productData) {
        try {
            return await trickleCreateObject(`product:${categoryId}`, productData);
        } catch (error) {
            console.error('Failed to create product:', error);
            throw error;
        }
    },

    async updateProduct(categoryId, productId, productData) {
        try {
            return await trickleUpdateObject(`product:${categoryId}`, productId, productData);
        } catch (error) {
            console.error('Failed to update product:', error);
            throw error;
        }
    },

    async deleteProduct(categoryId, productId) {
        try {
            await trickleDeleteObject(`product:${categoryId}`, productId);
        } catch (error) {
            console.error('Failed to delete product:', error);
            throw error;
        }
    },

    async getProduct(categoryId, productId) {
        try {
            return await trickleGetObject(`product:${categoryId}`, productId);
        } catch (error) {
            console.error('Failed to fetch product:', error);
            throw error;
        }
    },

    // Order APIs
    async createOrder(orderData) {
        try {
            return await trickleCreateObject('order', orderData);
        } catch (error) {
            console.error('Failed to create order:', error);
            throw error;
        }
    },

    async getOrders() {
        try {
            const response = await trickleListObjects('order', 100, true);
            return response.items;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            throw error;
        }
    }
};
