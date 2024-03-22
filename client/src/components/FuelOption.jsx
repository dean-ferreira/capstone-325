import '../App.css';

function FuelOption(props) {
    return (
        <div className="fuel-option">
            <h3 className="grade-name">{props.name}</h3>
            <div className="price grade-price">{props.price}</div>
            <button className="grade-button">{props.grade}</button>
        </div>
    );
}

export default FuelOption;
