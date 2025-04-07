function Home() {
    try {
        const [categories, setCategories] = React.useState([]);
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
            <div data-name="home-page">
                <section className="mb-12" data-name="hero-section">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16 rounded-lg text-center">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Exotic Pet Store</h1>
                        <p className="text-xl">Discover your perfect exotic companion</p>
                    </div>
                </section>

                <section data-name="categories-section">
                    <h2 className="text-2xl font-bold mb-6">Our Pet Categories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(category => (
                            <CategoryCard key={category.objectId} category={category} />
                        ))}
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        console.error('Home page error:', error);
        reportError(error);
        return null;
    }
}
