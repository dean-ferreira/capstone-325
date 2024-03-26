// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function Orders() {
    const [user, setUser] = useState({});
    const [orders, setOrders] = useState([]);

    async function getUser() {
        try {
            const response = await axios.get('http://localhost:3000/users/');
            setUser(response.data[0]);
            getOrders(response.data[0]._id);
        } catch (error) {
            console.error(error);
        }
    }

    async function getOrders(userID) {
        try {
            const response = await axios.get(
                `http://localhost:3000/orders/user/${userID}`
            );
            setOrders(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const loaded = () => {
        if (orders.length === 0) {
            return (
                <div className="container page-content">
                    <h2 className="content-title">No orders found</h2>;
                </div>
            );
        }
        return (
            <div className="container page-content">
                <h2 className="content-title">My Orders</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>State</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Gallons</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td>{order.state}</td>
                                <td>{order.product}</td>
                                <td>${order.price}</td>
                                <td>{order.quantity}</td>
                                <td>${order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return orders ? loaded() : loading();
}

export default Orders;
