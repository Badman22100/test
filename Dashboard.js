function Dashboard({ onLogout }) {
    try {
        const [activeTab, setActiveTab] = React.useState('categories');
        const [categories, setCategories] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [selectedCategory, setSelectedCategory] = React.useState(null);
        const [selectedProduct, setSelectedProduct] = React.useState(null);

        React.useEffect(() => {
            if (activeTab === 'categories' || activeTab === 'products') {
                loadCategories();
            }
        }, [activeTab]);

        const loadCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load categories');
                setLoading(false);
                console.error('Failed to load categories:', err);
            }
        };

        const handleCategoryUpdate = () => {
            loadCategories();
            setSelectedCategory(null);
        };

        const handleProductUpdate = () => {
            loadCategories();
            setSelectedProduct(null);
        };

        const renderContent = () => {
            switch (activeTab) {
                case 'categories':
                    return selectedCategory ? (
                        <CategoryForm
                            category={selectedCategory}
                            onCancel={() => setSelectedCategory(null)}
                            onSuccess={handleCategoryUpdate}
                        />
                    ) : (
                        <div>
                            <button
                                onClick={() => setSelectedCategory({})}
                                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                data-name="add-category-button"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add Category
                            </button>
                            <div className="grid gap-4" data-name="categories-list">
                                {categories.map(category => (
                                    <div
                                        key={category.objectId}
                                        className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                                    >
                                        <div>
                                            <h3 className="font-semibold">{category.objectData.name}</h3>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedCategory(category)}
                                                className="p-2 text-blue-600 hover:text-blue-800"
                                                data-name="edit-category-button"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (window.confirm('Are you sure you want to delete this category?')) {
                                                        await api.deleteCategory(category.objectId);
                                                        handleCategoryUpdate();
                                                    }
                                                }}
                                                className="p-2 text-red-600 hover:text-red-800"
                                                data-name="delete-category-button"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                case 'products':
                    return selectedProduct ? (
                        <ProductForm
                            product={selectedProduct}
                            categories={categories}
                            onCancel={() => setSelectedProduct(null)}
                            onSuccess={handleProductUpdate}
                        />
                    ) : (
                        <div>
                            <button
                                onClick={() => setSelectedProduct({})}
                                className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                data-name="add-product-button"
                            >
                                <i className="fas fa-plus mr-2"></i>
                                Add Product
                            </button>
                            <div className="grid gap-4" data-name="products-list">
                                {categories.map(category => (
                                    <div key={category.objectId} className="mb-6">
                                        <h3 className="text-lg font-semibold mb-2">{category.objectData.name}</h3>
                                        <div className="grid gap-4">
                                            {category.products?.map(product => (
                                                <div
                                                    key={product.objectId}
                                                    className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                                                >
                                                    <div>
                                                        <h4 className="font-medium">{product.objectData.title}</h4>
                                                        <p className="text-sm text-gray-600">
                                                            ${product.objectData.price}
                                                        </p>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => setSelectedProduct({...product, categoryId: category.objectId})}
                                                            className="p-2 text-blue-600 hover:text-blue-800"
                                                            data-name="edit-product-button"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button
                                                            onClick={async () => {
                                                                if (window.confirm('Are you sure you want to delete this product?')) {
                                                                    await api.deleteProduct(category.objectId, product.objectId);
                                                                    handleProductUpdate();
                                                                }
                                                            }}
                                                            className="p-2 text-red-600 hover:text-red-800"
                                                            data-name="delete-product-button"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                case 'orders':
                    return <OrderList />;
                default:
                    return null;
            }
        };

        if (loading && (activeTab === 'categories' || activeTab === 'products')) {
            return (
                <div className="flex justify-center items-center h-64" data-name="loading">
                    <i className="fas fa-spinner fa-spin text-4xl text-gray-600"></i>
                </div>
            );
        }

        if (error && (activeTab === 'categories' || activeTab === 'products')) {
            return (
                <div className="text-center text-red-600 p-4" data-name="error-message">
                    {error}
                </div>
            );
        }

        return (
            <div data-name="admin-dashboard">
                <div className="flex justify-between items-center mb-8" data-name="dashboard-header">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        data-name="logout-button"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                    </button>
                </div>

                <div className="mb-6" data-name="tab-navigation">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('categories')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'categories'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                data-name="categories-tab"
                            >
                                Categories
                            </button>
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'products'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                data-name="products-tab"
                            >
                                Products
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'orders'
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                                data-name="orders-tab"
                            >
                                Orders
                            </button>
                        </nav>
                    </div>
                </div>

                {renderContent()}
            </div>
        );
    } catch (error) {
        console.error('Dashboard component error:', error);
        reportError(error);
        return null;
    }
}
