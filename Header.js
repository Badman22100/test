function Header() {
    try {
        const [categories, setCategories] = React.useState([]);
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            loadCategories();
        }, []);

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

        const navigate = (path) => {
            window.location.hash = path;
            setIsMenuOpen(false);
        };

        return (
            <header className="bg-white shadow-md relative" data-name="header">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4" data-name="header-left">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                                data-name="menu-button"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                            <h1 
                                className="text-2xl font-bold text-gray-800 cursor-pointer" 
                                onClick={() => navigate('/')}
                                data-name="header-title"
                            >
                                Exotic Pet Store
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div 
                    className={`absolute top-full left-0 w-64 bg-white shadow-lg transition-transform duration-300 transform ${
                        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    } z-50`}
                    data-name="navigation-menu"
                >
                    <nav className="py-2">
                        <button
                            onClick={() => navigate('/')}
                            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                            data-name="home-link"
                        >
                            <i className="fas fa-home mr-2"></i>
                            Home
                        </button>
                        <div className="border-t border-gray-200 my-2"></div>
                        {loading ? (
                            <div className="px-4 py-2 text-gray-600" data-name="loading-message">
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Loading categories...
                            </div>
                        ) : error ? (
                            <div className="px-4 py-2 text-red-600" data-name="error-message">
                                {error}
                            </div>
                        ) : (
                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto" data-name="categories-list">
                                {categories.map(category => (
                                    <button
                                        key={category.objectId}
                                        onClick={() => navigate(`/category/${category.objectId}`)}
                                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center"
                                        data-name="category-link"
                                    >
                                        <i className="fas fa-paw mr-2"></i>
                                        {category.objectData.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </nav>
                </div>

                {/* Overlay */}
                {isMenuOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setIsMenuOpen(false)}
                        data-name="menu-overlay"
                    ></div>
                )}
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
