// Import components
import StateTile from '../components/StateTile';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

// Import Link
import { Link } from 'react-router-dom';

function StateDirectory() {
    const [states, setStates] = useState([]);

    async function getStates() {
        try {
            const response = await axios.get('http://localhost:3000/states');
            setStates(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getStates();
    }, []);

    return (
        <div className="container page-content">
            <h2 className="content-title">State Directory</h2>
            <div className="container page-content">
                <ul className="directory">
                    {states.map((state, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    to={`/states/${state._id}`}
                                    className="directory-item"
                                >
                                    {state.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default StateDirectory;
