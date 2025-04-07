function App() {
    try {
        const [path, setPath] = React.useState(window.location.hash.slice(1) || '/');

        React.useEffect(() => {
            const handleHashChange = () => {
                setPath(window.location.hash.slice(1) || '/');
            };

            window.addEventListener('hashchange', handleHashChange);
            return () => window.removeEventListener('hashchange', handleHashChange);
        }, []);

        const renderContent = () => {
            switch (path) {
                case '/':
                    return <Home />;
                case '/admin':
                    return <AdminPage />;
                default:
                    if (path.startsWith('/category/')) {
                        const categoryId = path.split('/')[2];
                        return <CategoryPage categoryId={categoryId} />;
                    }
                    if (path.startsWith('/product/')) {
                        const [, , categoryId, productId] = path.split('/');
                        return <ProductPage categoryId={categoryId} productId={productId} />;
                    }
                    return <div>404 - Page Not Found</div>;
            }
        };

        return (
            <div className="min-h-screen flex flex-col" data-name="app">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8">
                    {renderContent()}
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
