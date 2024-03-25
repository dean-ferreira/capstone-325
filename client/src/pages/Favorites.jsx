// Import components
import StateTile from '../components/StateTile';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function Favorites() {
    const [user, setUser] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [states, setStates] = useState([]);

    async function getUser() {
        try {
            const response = await axios.get('http://localhost:3000/users/');
            setUser(response.data[0]);

            getFavorites(response.data[0]._id);

            getStates();
        } catch (error) {
            console.error(error);
        }
    }

    async function getFavorites(userID) {
        try {
            const response = await axios.get(
                `http://localhost:3000/fav/user/${userID}`
            );
            setFavorites(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function getStates() {
        try {
            const response = await axios.get('http://localhost:3000/states');
            setStates(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const loaded = () => {
        // Filter states to only show favorites
        const favStates = states.filter((state) => {
            return favorites.some(
                (favorite) => favorite.state_id === state._id
            );
        });

        return (
            <div className="container page-content">
                <h2 className="content-title">My Favorites</h2>
                <StateTile statePrices={favStates} />
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return states.length ? loaded() : loading();
}

export default Favorites;
