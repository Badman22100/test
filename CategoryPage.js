function CategoryPage({ categoryId }) {
    try {
        const [category, setCategory] = React.useState(null);
        const [products, setProducts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            loadCategoryAndProducts();
        }, [categoryId]);

        const loadCategoryAndProducts = async () => {
            try {
                const categoryData = await api.getCategories();
                const category = categoryData.find(c => c.objectId === categoryId);
                if (!category) {
                    setError('Category not found');
                    setLoading(false);
                    return;
                }
                setCategory(category);

                const productsData = await api.getProducts(categoryId);
                setProducts(productsData);
                setLoading(false);
            } catch (err) {
                setError('Failed to load category data');
                setLoading(false);
                console.error('Failed to load category data:', err);
            }
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
            <div data-name="category-page">
                <h1 className="text-3xl font-bold mb-8">{category.objectData.name}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map(product => (
                        <ProductCard 
                            key={product.objectId} 
                            product={product} 
                            categoryId={categoryId}
                        />
                    ))}
                </div>
                {products.length === 0 && (
                    <div className="text-center text-gray-600 py-12" data-name="no-products">
                        No products available in this category yet.
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('CategoryPage component error:', error);
        reportError(error);
        return null;
    }
}
