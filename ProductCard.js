function ProductCard({ product, categoryId }) {
    try {
        const navigate = (path) => {
            window.location.hash = path;
        };

        return (
            <div 
                className="product-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${categoryId}/${product.objectId}`)}
                data-name="product-card"
            >
                <div className="relative h-48 overflow-hidden" data-name="product-image-container">
                    <img
                        src={product.objectData.images?.[0] || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c'}
                        alt={product.objectData.title}
                        className="product-image w-full h-full object-cover"
                    />
                    {product.objectData.stockStatus === 'Out of Stock' && (
                        <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded">
                            Out of Stock
                        </div>
                    )}
                </div>
                <div className="p-4" data-name="product-info">
                    <h3 className="text-xl font-semibold text-gray-800">{product.objectData.title}</h3>
                    <div className="mt-2 flex justify-between items-center">
                        <div className="text-gray-800" data-name="product-price">
                            ${product.objectData.price}
                            {product.objectData.discountPrice && (
                                <span className="ml-2 text-sm text-red-500 line-through">
                                    ${product.objectData.discountPrice}
                                </span>
                            )}
                        </div>
                        {product.objectData.species && (
                            <div className="text-sm text-gray-600" data-name="product-species">
                                {product.objectData.species}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ProductCard component error:', error);
        reportError(error);
        return null;
    }
}
