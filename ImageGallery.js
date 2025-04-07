function ImageGallery({ images }) {
    try {
        const [currentIndex, setCurrentIndex] = React.useState(0);

        if (!images || images.length === 0) {
            return (
                <div className="image-gallery bg-gray-200 rounded-lg flex items-center justify-center" data-name="empty-gallery">
                    <span className="text-gray-500">No images available</span>
                </div>
            );
        }

        return (
            <div className="image-gallery rounded-lg overflow-hidden" data-name="image-gallery">
                <img
                    src={images[currentIndex]}
                    alt={`Product image ${currentIndex + 1}`}
                    className="gallery-image"
                />
                {images.length > 1 && (
                    <div className="gallery-nav" data-name="gallery-navigation">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`gallery-dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`View image ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('ImageGallery component error:', error);
        reportError(error);
        return null;
    }
}
