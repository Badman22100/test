function CategoryCard({ category }) {
    try {
        const navigate = (path) => {
            window.location.hash = path;
        };

        return (
            <div 
                className="category-card bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => navigate(`/category/${category.objectId}`)}
                data-name="category-card"
            >
                <div className="relative h-48 overflow-hidden" data-name="category-image-container">
                    <img
                        src={category.objectData.thumbnail || 'https://images.unsplash.com/photo-1548767797-d8c844163c4c'}
                        alt={category.objectData.name}
                        className="category-image w-full h-full object-cover"
                    />
                </div>
                <div className="p-4" data-name="category-info">
                    <h3 className="text-xl font-semibold text-gray-800">{category.objectData.name}</h3>
                    <p className="text-gray-600 mt-2">
                        Explore our collection of {category.objectData.name.toLowerCase()}
                    </p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CategoryCard component error:', error);
        reportError(error);
        return null;
    }
}
