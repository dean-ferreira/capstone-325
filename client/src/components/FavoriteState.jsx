import '../App.css';

// Import components
import FuelOption from './FuelOption';

function FavoriteState(props) {
    async function removeFromFavorites(favoriteID) {
        try {
            const response = await axios.delete(
                `http://localhost:3000/fav/${favoriteID}`
            );
            console.log(response.data);
            setFavorites(
                favorites.filter((favorite) => favorite.state_id !== favoriteID)
            );
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="container page-content">
            {props.statePrices.map((state, index) => (
                <div key={index} className="state-tile">
                    <h2 className="state-name">{state.name}</h2>
                    <div className="fuel-selection">
                        <FuelOption
                            name="Regular"
                            price={state.gasoline}
                            grade="87"
                        />
                        <FuelOption
                            name="Mid-Grade"
                            price={state.midGrade}
                            grade="89"
                        />
                        <FuelOption
                            name="Premium"
                            price={state.premium}
                            grade="91"
                        />
                        <FuelOption
                            name="Diesel"
                            price={state.diesel}
                            grade="Diesel"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FavoriteState;
