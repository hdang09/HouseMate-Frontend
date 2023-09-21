import { AntdThemeConfig } from './themes/';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import GlobalStyles from './themes/globalStyles.ts';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={AntdThemeConfig}>
            <App />
            <GlobalStyles />
        </ConfigProvider>
    </StrictMode>,
);
