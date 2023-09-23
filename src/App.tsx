import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';

function App() {
    return (
        <Router>
            <Suspense fallback={<></>}>
                <RoutesComponent />
            </Suspense>
        </Router>
    );
}

export default App;
