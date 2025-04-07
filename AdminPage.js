function AdminPage() {
    try {
        const [isAuthenticated, setIsAuthenticated] = React.useState(auth.isAuthenticated());

        const handleLoginSuccess = () => {
            setIsAuthenticated(true);
        };

        const handleLogout = () => {
            auth.logout();
            setIsAuthenticated(false);
            window.location.hash = '/';
        };

        if (!isAuthenticated) {
            return <LoginForm onLoginSuccess={handleLoginSuccess} />;
        }

        return <Dashboard onLogout={handleLogout} />;
    } catch (error) {
        console.error('AdminPage component error:', error);
        reportError(error);
        return null;
    }
}
