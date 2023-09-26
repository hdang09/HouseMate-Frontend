const PRIMARY_COLOR: string = '#FF7B29';
const SECONDARY_COLOR: string = '#31C3E0';

export const theme = {
    light: '',
    dark: '',
    colors: {
        primary: PRIMARY_COLOR,
        secondary: SECONDARY_COLOR,
        warning: '#FFA015',
        success: '#34A853',
        error: '#FF0000',
        grey: '#CCC',
        textLight: '#676A6C',
        textDark: '#2D3134',
        white: '#FFF',
        black: '#000',
        divider: '#d9d9d9',
        overlay: 'rgba(106, 111, 119, 0.1)',
        facebook: '#1877F2',
        shadow: 'rgba(34, 41, 47, 0.1)',
        border: '#BFBFBF',
    },
};

export const AntdThemeConfig = {
    token: {
        colorPrimary: PRIMARY_COLOR,
        colorSecondary: SECONDARY_COLOR,
        colorLink: PRIMARY_COLOR,
        fontFamily: 'Inter',
        colorLinkHover: PRIMARY_COLOR,
    },
};
