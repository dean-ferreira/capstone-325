import '../App.css';

// Import Link from React Router
import { Link } from 'react-router-dom';

function FuelOption(props) {
    function redirectToConfirmationPage() {
        const data = {
            user_id: props.user_id,
            stateName: props.stateName,
            product: props.name,
            price: props.price,
        };

        const queryParams = new URLSearchParams(data).toString(); // Serialize data to pass as URL params
        window.location.href = `/confirm?${queryParams}`;
    }
    return (
        <div className="fuel-option">
            <h3 className="grade-name">{props.name}</h3>
            <div className="price grade-price">{props.price}</div>
            <Link
                to="/confirm"
                onClick={redirectToConfirmationPage}
                className="grade-button"
            >
                {props.grade}
            </Link>
        </div>
    );
}

export default FuelOption;
