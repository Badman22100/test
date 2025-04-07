function BuyNowForm({ product, onClose, onSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            fullName: '',
            phoneNumber: '',
            email: '',
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

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const orderData = {
                    ...formData,
                    productId: product.objectId,
                    productTitle: product.objectData.title,
                    productPrice: product.objectData.price,
                    orderDate: new Date().toISOString(),
                    status: 'New'
                };

                await api.createOrder(orderData);
                onSuccess();
            } catch (err) {
                setError('Failed to submit order. Please try again.');
                console.error('Order submission error:', err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-name="buy-now-modal">
                <div className="bg-white rounded-lg p-6 w-full max-w-md" data-name="buy-now-form">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Purchase Request</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            data-name="close-button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="mb-4 p-4 bg-gray-50 rounded" data-name="product-info">
                        <h3 className="font-semibold">{product.objectData.title}</h3>
                        <p className="text-gray-600">Price: ${product.objectData.price}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4" data-name="name-field">
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="form-input"
                                required
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="mb-4" data-name="phone-field">
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className="form-input"
                                required
                                placeholder="Enter your phone number"
                            />
                        </div>

                        <div className="mb-6" data-name="email-field">
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                required
                                placeholder="Enter your email address"
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
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <i className="fas fa-spinner fa-spin mr-2"></i>
                                        Submitting...
                                    </div>
                                ) : (
                                    'Submit Order'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('BuyNowForm component error:', error);
        reportError(error);
        return null;
    }
}
