function ProductPage({ categoryId, productId }) {
    try {
        const [product, setProduct] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [showBuyForm, setShowBuyForm] = React.useState(false);
        const [notifications, setNotifications] = React.useState([]);

        React.useEffect(() => {
            loadProduct();
        }, [categoryId, productId]);

        React.useEffect(() => {
            // Show the alert message about using alias names for special pets
            if (product?.objectData?.species) {
                setNotifications(prev => [
                    ...prev,
                    {
                        id: 'special-pet-alert',
                        type: 'alert',
                        message: 'If purchasing any special Pet please use an Alias name/nickname and do not use your personal address'
                    }
                ]);
            }
        }, [product]);

        const loadProduct = async () => {
            try {
                const productData = await api.getProduct(categoryId, productId);
                setProduct(productData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load product');
                setLoading(false);
                console.error('Failed to load product:', err);
            }
        };

        const handleOrderSuccess = () => {
            setShowBuyForm(false);
            setNotifications(prev => [
                ...prev,
                {
                    id: 'order-success',
                    type: 'success',
                    message: 'Thank you for your order! You will receive an email shortly to confirm and complete your payment.'
                }
            ]);
        };

        const removeNotification = (notificationId) => {
            setNotifications(prev => prev.filter(n => n.id !== notificationId));
        };

        if (loading) {
            return (
                <div className="flex justify-center items-center h-64" data-name="loading">
                    <i className="fas fa-spinner fa-spin text-4xl text-gray-600"></i>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center text-red-600 p-4" data-name="error-message">
                    {error}
                </div>
            );
        }

        return (
            <div className="relative" data-name="product-page">
                {/* Notifications */}
                {notifications.map(notification => (
                    <Notifications
                        key={notification.id}
                        message={notification.message}
                        type={notification.type}
                        onClose={() => removeNotification(notification.id)}
                    />
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div data-name="product-gallery">
                        <ImageGallery images={product.objectData.images || []} />
                    </div>
                    <div data-name="product-details">
                        <h1 className="text-3xl font-bold mb-4">{product.objectData.title}</h1>
                        <div className="mb-6" data-name="product-price">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.objectData.price}
                            </span>
                            {product.objectData.discountPrice && (
                                <span className="ml-2 text-lg text-red-500 line-through">
                                    ${product.objectData.discountPrice}
                                </span>
                            )}
                        </div>
                        {product.objectData.species && (
                            <div className="mb-4" data-name="product-species">
                                <span className="text-gray-600">Species/Breed:</span>
                                <span className="ml-2 font-medium">{product.objectData.species}</span>
                            </div>
                        )}
                        <div className="mb-4" data-name="product-stock">
                            <span className={`inline-block px-3 py-1 rounded ${
                                product.objectData.stockStatus === 'In Stock' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {product.objectData.stockStatus || 'In Stock'}
                            </span>
                        </div>
                        {product.objectData.stockStatus !== 'Out of Stock' && (
                            <button
                                onClick={() => setShowBuyForm(true)}
                                className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
                                data-name="buy-now-button"
                            >
                                <i className="fas fa-shopping-cart mr-2"></i>
                                Buy Now
                            </button>
                        )}
                        <div className="prose max-w-none" data-name="product-description">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <p className="text-gray-600 whitespace-pre-line">
                                {product.objectData.description}
                            </p>
                        </div>
                    </div>
                </div>

                {showBuyForm && (
                    <BuyNowForm
                        product={product}
                        onClose={() => setShowBuyForm(false)}
                        onSuccess={handleOrderSuccess}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('ProductPage component error:', error);
        reportError(error);
        return null;
    }
}
