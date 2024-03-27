// Import components
import StateTile from '../components/StateTile';

// Import hooks
import { useState, useEffect } from 'react';

// Import axios
import axios from 'axios';

function Main() {
    const [states, setStates] = useState([]);

    async function getStates() {
        try {
            const response = await axios.get(
                'https://capstone-325-api.onrender.com/states/lowest/3'
            );
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
                <h2 className="content-title">Top States</h2>
                <StateTile statePrices={states} />
            </div>
        );
    };

    const loading = () => {
        return <h2>Loading...</h2>;
    };

    return states.length ? loaded() : loading();
}

export default Main;
