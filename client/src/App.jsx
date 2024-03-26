import './App.css';

// Import react router dom tools
import { Route, Routes } from 'react-router-dom';

// Import components
import NavBar from './components/NavBar';

// Import pages
import Home from './pages/Home';
import AllStates from './pages/AllStates';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import Account from './pages/Account';
import ConfirmOrder from './pages/ConfirmOrder';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/states" element={<AllStates />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/account" element={<Account />} />
                <Route path="/confirm" element={<ConfirmOrder />} />
            </Routes>
        </>
    );
}

export default App;
