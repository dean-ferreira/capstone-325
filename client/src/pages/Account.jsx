// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function Account() {
    const [userID, setUserID] = useState(1);
    const [userName, setName] = useState([]);
    const [userEmail, setEmail] = useState([]);

    async function getUser() {
        try {
            const response = await axios.get(
                'https://capstone-325-api.onrender.com/users/'
            );
            const userData = response.data[0];
            setUserID(userData._id);
            setName(userData.name);
            setEmail(userData.email);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await axios.patch(
                `https://capstone-325-api.onrender.com/users/${userID}`,
                {
                    name: userName,
                    email: userEmail,
                }
            );
            console.log('User profile updated successfully');
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    }

    const loaded = () => {
        return (
            <div className="container page-content">
                <h2 className="content-title">My Account</h2>
                <form
                    className="container page-content"
                    action={`https://capstone-325-api.onrender.com/users/${userID}?_method=PATCH`}
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userName}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={userEmail}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input type="submit" value="Update" />
                </form>
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return userName ? loaded() : loading();
}

export default Account;
