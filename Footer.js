function Footer() {
    try {
        const isAdmin = auth.isAuthenticated();
        
        const navigate = (path) => {
            window.location.hash = path;
        };

        const handleLogout = () => {
            auth.logout();
            window.location.hash = '/';
        };

        return (
            <footer className="bg-gray-800 text-white" data-name="footer">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div data-name="footer-about">
                            <h3 className="text-xl font-semibold mb-4">About Us</h3>
                            <p className="text-gray-400">
                                We specialize in exotic pets, providing unique and rare animals 
                                with expert care advice and support.
                            </p>
                        </div>
                        <div data-name="footer-contact">
                            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                            <ul className="text-gray-400">
                                <li className="mb-2">
                                    <i className="fas fa-map-marker-alt mr-2"></i>
                                    123 Exotic Ave, Pet City
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-phone mr-2"></i>
                                    (555) 123-4567
                                </li>
                                <li className="mb-2">
                                    <i className="fas fa-envelope mr-2"></i>
                                    info@exoticpets.com
                                </li>
                            </ul>
                        </div>
                        <div data-name="footer-hours">
                            <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                            <ul className="text-gray-400">
                                <li className="mb-2">Monday - Friday: 9AM - 6PM</li>
                                <li className="mb-2">Saturday: 10AM - 5PM</li>
                                <li className="mb-2">Sunday: Closed</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700" data-name="footer-bottom">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 mb-4 md:mb-0">
                                &copy; 2024 Exotic Pet Store. All rights reserved.
                            </p>
                            <div className="flex items-center space-x-4" data-name="admin-section">
                                {isAdmin ? (
                                    <div className="flex items-center space-x-4">
                                        <button 
                                            onClick={() => navigate('/admin')}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            data-name="admin-dashboard-button"
                                        >
                                            <i className="fas fa-cog mr-2"></i>
                                            Dashboard
                                        </button>
                                        <button 
                                            onClick={handleLogout}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            data-name="logout-button"
                                        >
                                            <i className="fas fa-sign-out-alt mr-2"></i>
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => navigate('/admin')}
                                        className="text-gray-400 hover:text-white transition-colors"
                                        data-name="admin-login-button"
                                    >
                                        <i className="fas fa-user mr-2"></i>
                                        Admin Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    } catch (error) {
        console.error('Footer component error:', error);
        reportError(error);
        return null;
    }
}
