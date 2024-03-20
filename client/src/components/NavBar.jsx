import { Link } from 'react-router-dom';
import '../App.css';

function NavBar() {
    return (
        <div className="header container">
            <Link to="/" className="header-link">
                <h1>FuelPrice USA</h1>
            </Link>
            <ul className="header-menu">
                <li>
                    <Link to="/states" className="header-link">
                        States
                    </Link>
                </li>
                <li>
                    <Link to="/favorites" className="header-link">
                        Favorites
                    </Link>
                </li>
                <li>
                    <Link to="/orders" className="header-link">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/account" className="header-link">
                        Account
                    </Link>
                </li>
            </ul>
            <button className="header-bars">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </button>
        </div>
    );
}

export default NavBar;
