function LoginForm({ onLoginSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            username: '',
            password: ''
        });
        const [error, setError] = React.useState('');
        const [loading, setLoading] = React.useState(false);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('');
            setLoading(true);

            try {
                const success = auth.login(formData.username, formData.password);
                if (success) {
                    onLoginSuccess();
                } else {
                    setError('Invalid credentials');
                }
            } catch (err) {
                setError('Login failed. Please try again.');
                console.error('Login error:', err);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="min-h-[80vh] flex items-center justify-center" data-name="login-container">
                <div className="w-full max-w-md">
                    <form onSubmit={handleSubmit} className="admin-form" data-name="login-form">
                        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                        <div className="mb-4" data-name="username-field">
                            <label className="block text-gray-700 mb-2">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="mb-6" data-name="password-field">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        {error && (
                            <div className="error-message mb-4" data-name="error-message">
                                {error}
                            </div>
                        )}
                        <button
                            type="submit"
                            className="admin-button"
                            disabled={loading}
                            data-name="submit-button"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <i className="fas fa-spinner fa-spin mr-2"></i>
                                    Logging in...
                                </div>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
        return null;
    }
}
