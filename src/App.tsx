// Routes
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './routes';
// Themes
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <RoutesComponent />
            </Router>
        </ThemeProvider>
    );
}

export default App;
