import { AntdThemeConfig } from './themes/';
import App from './App.tsx';
import { ConfigProvider, App as AppAntd } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import GlobalStyles from './themes/globalStyles.ts';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { createStyledBreakpointsTheme } from 'styled-breakpoints';
import { Provider } from 'react-redux';
import { store } from './store';

export const breakpoints = {
    xs: '360px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
} as const;

const theme: DefaultTheme = createStyledBreakpointsTheme({
    breakpoints,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <ConfigProvider locale={viVN} theme={AntdThemeConfig}>
                <AppAntd>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </AppAntd>

                <GlobalStyles />
            </ConfigProvider>
        </ThemeProvider>
        ,
    </StrictMode>,
);
