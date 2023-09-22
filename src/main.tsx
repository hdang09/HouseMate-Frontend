import { AntdThemeConfig } from './themes/';
import App from './App.tsx';
import { ConfigProvider } from 'antd';
import GlobalStyles from './themes/globalStyles.ts';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { createStyledBreakpointsTheme } from 'styled-breakpoints';

const theme: DefaultTheme = createStyledBreakpointsTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
         <ThemeProvider theme={theme}>
            <ConfigProvider theme={AntdThemeConfig}>
                <App />
                <GlobalStyles />
            </ConfigProvider>
        </ThemeProvider>
    </StrictMode>,
);
