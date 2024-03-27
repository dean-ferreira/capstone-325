// Import components
import FuelOption from '../components/FuelOption';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import useParams
import { useParams } from 'react-router-dom';

function State() {
    const [user, setUser] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [state, setState] = useState({});
    const { id } = useParams();

    async function getUser() {
        try {
            const response = await axios.get('http://localhost:3000/users/');
            setUser(response.data[0]);
            getFavorites(response.data[0]._id);
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

    async function addToFavorites(stateID) {
        try {
            const response = await axios.post('http://localhost:3000/fav', {
                state_id: stateID,
                user_id: user._id,
            });
            setFavorites([...favorites, response.data]);
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

    function isFavorite(stateID) {
        return favorites.some((favorite) => favorite.state_id === stateID);
    }

    async function getState() {
        try {
            const response = await axios.get(
                `http://localhost:3000/states/${id}`
            );
            setState(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUser();
        getState();
    }, [id]);

    const loaded = () => {
        return (
            <div className="container page-content">
                <div className="state-tile">
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
                    {isFavorite(state._id) ? (
                        <button onClick={() => removeFromFavorites(state._id)}>
                            Remove from Favorites
                        </button>
                    ) : (
                        <button onClick={() => addToFavorites(state._id)}>
                            Add to Favorites
                        </button>
                    )}
                </div>
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return state.name ? loaded() : loading();
}

export default State;
