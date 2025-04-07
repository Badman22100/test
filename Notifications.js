function Notifications({ message, type, onClose }) {
    try {
        React.useEffect(() => {
            if (type === 'alert') {
                const timer = setTimeout(() => {
                    onClose();
                }, 10000); // Alert stays for 10 seconds
                return () => clearTimeout(timer);
            }
        }, [type, onClose]);

        const getNotificationStyles = () => {
            switch (type) {
                case 'success':
                    return 'bg-green-100 text-green-800 border-green-300';
                case 'alert':
                    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
                default:
                    return 'bg-blue-100 text-blue-800 border-blue-300';
            }
        };

        return (
            <div 
                className={`fixed z-50 w-full transform transition-transform duration-500 ease-in-out ${
                    type === 'alert' ? 'top-0 slide-in-top' : 'bottom-5 slide-in-bottom'
                }`}
                data-name="notification"
            >
                <div className="container mx-auto px-4">
                    <div className={`rounded-lg border p-4 ${getNotificationStyles()}`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {type === 'success' && <i className="fas fa-check-circle mr-2"></i>}
                                {type === 'alert' && <i className="fas fa-exclamation-triangle mr-2"></i>}
                                <p>{message}</p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700"
                                data-name="close-notification"
                            >
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Notifications component error:', error);
        reportError(error);
        return null;
    }
}
