function CategoryForm({ category, onCancel, onSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            name: category?.objectData?.name || '',
            thumbnail: category?.objectData?.thumbnail || '',
            displayOrder: category?.objectData?.displayOrder || 0
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

        const handleImageUpload = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please upload an image file');
                }

                const imageData = await api.handleImageUpload(file);
                setFormData(prev => ({
                    ...prev,
                    thumbnail: imageData
                }));
            } catch (err) {
                setError(err.message);
            }
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                if (category.objectId) {
                    await api.updateCategory(category.objectId, formData);
                } else {
                    await api.createCategory(formData);
                }
                onSuccess();
            } catch (err) {
                setError('Failed to save category');
                console.error('Category form error:', err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <form onSubmit={handleSubmit} className="admin-form" data-name="category-form">
                <h2 className="text-xl font-bold mb-6">
                    {category.objectId ? 'Edit Category' : 'Add New Category'}
                </h2>

                <div className="mb-4" data-name="name-field">
                    <label className="block text-gray-700 mb-2">Category Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter category name"
                        required
                    />
                </div>

                <div className="mb-4" data-name="thumbnail-field">
                    <label className="block text-gray-700 mb-2">Thumbnail</label>
                    <div className="space-y-4">
                        <div>
                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter thumbnail URL"
                            />
                        </div>
                        <div className="text-gray-600">OR</div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Max file size: 5MB. Supported formats: JPG, PNG, GIF
                            </p>
                        </div>
                        {formData.thumbnail && (
                            <div className="mt-2">
                                <img
                                    src={formData.thumbnail}
                                    alt="Thumbnail preview"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-6" data-name="display-order-field">
                    <label className="block text-gray-700 mb-2">Display Order</label>
                    <input
                        type="number"
                        name="displayOrder"
                        value={formData.displayOrder}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                    />
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
                            'Save Category'
                        )}
                    </button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('CategoryForm component error:', error);
        reportError(error);
        return null;
    }
}
