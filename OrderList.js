function OrderList() {
    try {
        const [orders, setOrders] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            loadOrders();
        }, []);

        const loadOrders = async () => {
            try {
                const data = await api.getOrders();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load orders');
                setLoading(false);
                console.error('Failed to load orders:', err);
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
            <div className="space-y-4" data-name="orders-list">
                <h2 className="text-xl font-bold mb-4">Purchase Requests</h2>
                {orders.length === 0 ? (
                    <p className="text-gray-600 text-center py-8">No orders yet</p>
                ) : (
                    orders.map(order => (
                        <div 
                            key={order.objectId}
                            className="bg-white rounded-lg shadow p-4"
                            data-name="order-item"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold">{order.objectData.productTitle}</h3>
                                    <p className="text-gray-600">Price: ${order.objectData.productPrice}</p>
                                    <div className="mt-2 space-y-1 text-sm">
                                        <p>
                                            <span className="font-medium">Customer:</span> {order.objectData.fullName}
                                        </p>
                                        <p>
                                            <span className="font-medium">Phone:</span> {order.objectData.phoneNumber}
                                        </p>
                                        <p>
                                            <span className="font-medium">Email:</span> {order.objectData.email}
                                        </p>
                                        <p>
                                            <span className="font-medium">Date:</span> {new Date(order.objectData.orderDate).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded text-sm ${
                                    order.objectData.status === 'New' 
                                        ? 'bg-blue-100 text-blue-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {order.objectData.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    } catch (error) {
        console.error('OrderList component error:', error);
        reportError(error);
        return null;
    }
}
