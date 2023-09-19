import App from './App.tsx';
import GlobalStyles from './themes/globalStyles.ts';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <GlobalStyles />
    </StrictMode>,
);
