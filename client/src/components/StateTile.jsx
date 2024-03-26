import '../App.css';

// Import components
import FuelOption from './FuelOption';

// Import axios
import axios from 'axios';

function StateTile(props) {
    async function addToFavorites(stateID) {
        try {
            const response = await axios.post('http://localhost:3000/fav', {
                state_id: stateID,
                user_id: '6601b4932e23c86172ae1c81',
            });
            console.log(response.data);
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
                    <button onClick={() => addToFavorites(state._id)}>
                        Add to Favorites
                    </button>
                </div>
            ))}
        </div>
    );
}

export default StateTile;
