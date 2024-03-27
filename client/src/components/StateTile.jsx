import '../App.css';

// Import components
import FuelOption from './FuelOption';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function StateTile(props) {
    const [user_ID, setUserID] = useState('');
    const [favorites, setFavorites] = useState([]);

    async function getUser() {
        try {
            const response = await axios.get(
                'https://capstone-325-api.onrender.com/users/'
            );
            setUserID(response.data[0]._id);
            getFavorites(response.data[0]._id);
        } catch (error) {
            console.error(error);
        }
    }

    async function getFavorites(userID) {
        try {
            const response = await axios.get(
                `https://capstone-325-api.onrender.com/fav/user/${userID}`
            );
            setFavorites(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function addToFavorites(stateID) {
        try {
            const response = await axios.post(
                'https://capstone-325-api.onrender.com/fav',
                {
                    state_id: stateID,
                    user_id: user_ID,
                }
            );
            setFavorites([...favorites, response.data]);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeFromFavorites(favoriteID) {
        try {
            const response = await axios.delete(
                `https://capstone-325-api.onrender.com/fav/${favoriteID}`
            );
            setFavorites(
                favorites.filter((favorite) => favorite.state_id !== favoriteID)
            );
        } catch (error) {
            console.error(error);
        }
    }

    function isFavorite(stateID) {
        return favorites.some((favorite) => favorite.state_id === stateID);
    }

    useEffect(() => {
        getUser();
    }, []);

    const loaded = () => {
        return (
            <div className="container page-content">
                {props.statePrices.map((state, index) => (
                    <div key={index} className="state-tile">
                        <h2 className="state-name">{state.name}</h2>
                        <div className="fuel-selection">
                            <FuelOption
                                user_id={user_ID}
                                stateName={state.name}
                                name="Regular"
                                price={state.gasoline}
                                grade="87"
                            />
                            <FuelOption
                                user_id={user_ID}
                                stateName={state.name}
                                name="Mid-Grade"
                                price={state.midGrade}
                                grade="89"
                            />
                            <FuelOption
                                user_id={user_ID}
                                stateName={state.name}
                                name="Premium"
                                price={state.premium}
                                grade="91"
                            />
                            <FuelOption
                                user_id={user_ID}
                                stateName={state.name}
                                name="Diesel"
                                price={state.diesel}
                                grade="Diesel"
                            />
                        </div>
                        {isFavorite(state._id) ? (
                            <button
                                onClick={() => removeFromFavorites(state._id)}
                            >
                                Remove from Favorites
                            </button>
                        ) : (
                            <button onClick={() => addToFavorites(state._id)}>
                                Add to Favorites
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return props.statePrices.length ? loaded() : loading();
}

export default StateTile;
