import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <div>
                <ToastContainer />
                <Router>
                    <Routes />
                </Router>
            </div>
        </>
    );
}

export default App;
