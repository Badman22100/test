/*
Admin Login Details:
- Username: admin
- Password: admin123

Note: In a production environment, these credentials should be stored securely
and the authentication should be handled by a proper backend service.
*/

const AUTH_KEY = 'exotic_pet_store_auth';

const auth = {
    login(username, password) {
        // In a real application, this would make an API call
        if (username === 'admin' && password === 'admin123') {
            const token = 'dummy-jwt-token';
            localStorage.setItem(AUTH_KEY, token);
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem(AUTH_KEY);
    },

    isAuthenticated() {
        return !!localStorage.getItem(AUTH_KEY);
    },

    getToken() {
        return localStorage.getItem(AUTH_KEY);
    }
};
