function ProductForm({ product, categories, onCancel, onSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            title: product?.objectData?.title || '',
            price: product?.objectData?.price || '',
            discountPrice: product?.objectData?.discountPrice || '',
            description: product?.objectData?.description || '',
            images: product?.objectData?.images || [''],
            species: product?.objectData?.species || '',
            stockStatus: product?.objectData?.stockStatus || 'In Stock',
            categoryId: product?.categoryId || categories[0]?.objectId
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleImageChange = (index, value) => {
            const newImages = [...formData.images];
            newImages[index] = value;
            setFormData(prev => ({
                ...prev,
                images: newImages
            }));
        };

        const handleImageUpload = async (index, e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please upload an image file');
                }

                const imageData = await api.handleImageUpload(file);
                handleImageChange(index, imageData);
            } catch (err) {
                setError(err.message);
            }
        };

        const addImageField = () => {
            if (formData.images.length < 5) {
                setFormData(prev => ({
                    ...prev,
                    images: [...prev.images, '']
                }));
            }
        };

        const removeImageField = (index) => {
            setFormData(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index)
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const productData = {
                    ...formData,
                    images: formData.images.filter(url => url.trim() !== '')
                };

                if (productData.images.length < 2) {
                    throw new Error('Please add at least 2 images');
                }

                if (product.objectId) {
                    await api.updateProduct(formData.categoryId, product.objectId, productData);
                } else {
                    await api.createProduct(formData.categoryId, productData);
                }
                onSuccess();
            } catch (err) {
                setError(err.message || 'Failed to save product');
                console.error('Product form error:', err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <form onSubmit={handleSubmit} className="admin-form" data-name="product-form">
                <h2 className="text-xl font-bold mb-6">
                    {product.objectId ? 'Edit Product' : 'Add New Product'}
                </h2>

                <div className="mb-4" data-name="category-field">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        className="form-input"
                        required
                    >
                        {categories.map(category => (
                            <option key={category.objectId} value={category.objectId}>
                                {category.objectData.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4" data-name="title-field">
                    <label className="block text-gray-700 mb-2">Product Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter product title"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div data-name="price-field">
                        <label className="block text-gray-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter price"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div data-name="discount-price-field">
                        <label className="block text-gray-700 mb-2">Discount Price ($)</label>
                        <input
                            type="number"
                            name="discountPrice"
                            value={formData.discountPrice}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter discount price"
                            step="0.01"
                            min="0"
                        />
                    </div>
                </div>

                <div className="mb-4" data-name="species-field">
                    <label className="block text-gray-700 mb-2">Species/Breed</label>
                    <input
                        type="text"
                        name="species"
                        value={formData.species}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter species or breed"
                    />
                </div>

                <div className="mb-4" data-name="stock-status-field">
                    <label className="block text-gray-700 mb-2">Stock Status</label>
                    <select
                        name="stockStatus"
                        value={formData.stockStatus}
                        onChange={handleChange}
                        className="form-input"
                    >
                        <option value="In Stock">In Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <div className="mb-4" data-name="description-field">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-input min-h-[100px]"
                        placeholder="Enter product description"
                        required
                    />
                </div>

                <div className="mb-6" data-name="images-field">
                    <label className="block text-gray-700 mb-2">Images (2-5 images)</label>
                    {formData.images.map((url, index) => (
                        <div key={index} className="mb-4 space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={url}
                                    onChange={(e) => handleImageChange(index, e.target.value)}
                                    className="form-input"
                                    placeholder="Enter image URL"
                                />
                                {formData.images.length > 2 && (
                                    <button
                                        type="button"
                                        onClick={() => removeImageField(index)}
                                        className="px-2 text-red-600 hover:text-red-800"
                                        data-name="remove-image-button"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                )}
                            </div>
                            <div>
                                <div className="text-gray-600">OR</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="block w-full text-sm text-gray-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        hover:file:bg-blue-100"
                                />
                            </div>
                            {url && (
                                <div className="mt-2">
                                    <img
                                        src={url}
                                        alt={`Product image ${index + 1}`}
                                        className="w-32 h-32 object-cover rounded"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    {formData.images.length < 5 && (
                        <button
                            type="button"
                            onClick={addImageField}
                            className="text-blue-600 hover:text-blue-800"
                            data-name="add-image-button"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Image
                        </button>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                        Max file size: 5MB per image. Supported formats: JPG, PNG, GIF
                    </p>
                </div>

                {error && (
                    <div className="error-message mb-4" data-name="error-message">
                        {error}
                    </div>
                )}

                <div className="flex justify-end space-x-4" data-name="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                        disabled={loading}
                        data-name="cancel-button"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="admin-button"
                        disabled={loading}
                        data-name="submit-button"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Saving...
                            </div>
                        ) : (
                            'Save Product'
                        )}
                    </button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('ProductForm component error:', error);
        reportError(error);
        return null;
    }
}
