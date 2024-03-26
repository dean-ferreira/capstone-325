// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function ConfirmOrder() {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const user_id = searchParams.get('user_id');
        const stateName = searchParams.get('stateName');
        const product = searchParams.get('product');
        const price = searchParams.get('price');
        setFormData({
            user_id: user_id || '',
            stateName: stateName || '',
            product: product || '',
            price: price || '',
            gallons: 1,
        });
    }, []);

    async function handleSubmission(event) {
        event.preventDefault();
        const data = {
            user_id: formData.user_id,
            state: formData.stateName,
            product: formData.product,
            price: formData.price,
            quantity: formData.gallons,
            total: formData.price * formData.gallons,
        };

        try {
            const response = await axios.post(
                'http://localhost:3000/orders/',
                data
            );
            console.log(response.data);
            window.location.href = '/orders';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="container page-content">
            <h2>Order Confirmation</h2>
            <div className="container page-content">
                <form onSubmit={handleSubmission} className="order-form">
                    <div>
                        <label>Date:</label>
                        <input
                            type="text"
                            value={new Date().toLocaleDateString()}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>State:</label>
                        <input
                            type="text"
                            value={formData.stateName}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Product:</label>
                        <input type="text" value={formData.product} readOnly />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="text"
                            value={`$ ${formData.price}`}
                            readOnly
                        />
                    </div>
                    <div>
                        <label>Number of Gallons:</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={formData.gallons}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    gallons: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Total:</label>
                        <input
                            type="text"
                            value={`$ ${formData.price * formData.gallons}`}
                            readOnly
                        />
                    </div>
                    <button className="submit-order" type="submit">
                        Submit Order
                    </button>
                    <button
                        className="cancel-order"
                        onClick={() => (window.location.href = '/')}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ConfirmOrder;
