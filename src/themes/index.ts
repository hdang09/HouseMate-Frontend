const PRIMARY_COLOR: string = '#FF7B29';

export const theme = {
    light: '',
    dark: '',
    colors: {
        primary: PRIMARY_COLOR,
        secondary: '#31C3E0',
        warning: '#FFA015',
        success: '#34A853',
        error: '#FF0000',
        grey: '#CCC',
        textLight: '#676A6C',
        textDark: '#2D3134',
        white: '#FFF',
        black: '#000',
        divider: '#d9d9d9',
        overlay: 'rgba(106, 111, 119, 0.3)',
        facebook: '#1877F2',
    },
};

export const AntdThemeConfig = {
    token: {
        colorPrimary: PRIMARY_COLOR,
        colorLink: PRIMARY_COLOR,
        fontFamily: 'Inter',
        colorLinkHover: PRIMARY_COLOR,
    },
};
