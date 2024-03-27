// Import components
import FuelOption from '../components/FuelOption';

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

    async function removeFromFavorites(favoriteID) {
        try {
            const response = await axios.delete(
                `http://localhost:3000/fav/${favoriteID}`
            );
            setFavorites(
                favorites.filter((favorite) => favorite.state_id !== favoriteID)
            );
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

        if (favStates.length === 0) {
            if (favStates.length === 0) {
                return (
                    <div className="container page-content">
                        <h2 className="content-title">No favorites yet!</h2>
                    </div>
                );
            }
        }

        return (
            <div className="container page-content">
                <h2 className="content-title">My Favorites</h2>
                <div className="container page-content">
                    {favStates.map((state, index) => (
                        <div key={index} className="state-tile">
                            <h2 className="state-name">{state.name}</h2>
                            <div className="fuel-selection">
                                <FuelOption
                                    user_id={user._id}
                                    stateName={state.name}
                                    name="Regular"
                                    price={state.gasoline}
                                    grade="87"
                                />
                                <FuelOption
                                    user_id={user._id}
                                    stateName={state.name}
                                    name="Mid-Grade"
                                    price={state.midGrade}
                                    grade="89"
                                />
                                <FuelOption
                                    user_id={user._id}
                                    stateName={state.name}
                                    name="Premium"
                                    price={state.premium}
                                    grade="91"
                                />
                                <FuelOption
                                    user_id={user._id}
                                    stateName={state.name}
                                    name="Diesel"
                                    price={state.diesel}
                                    grade="Diesel"
                                />
                            </div>
                            <button
                                onClick={() => removeFromFavorites(state._id)}
                            >
                                Remove from Favorites
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return states.length ? loaded() : loading();
}

export default Favorites;
