// Import components
import StateTile from '../components/StateTile';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function AllStates() {
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

    const loaded = () => {
        return (
            <div className="container page-content">
                <h2 className="content-title">All States</h2>
                <StateTile statePrices={states} />
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return states.length ? loaded() : loading();
}

export default AllStates;
