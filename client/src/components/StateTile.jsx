import '../App.css';

// Import components
import FuelOption from './FuelOption';

function StateTile(props) {
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

export default StateTile;
