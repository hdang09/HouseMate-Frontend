const PRIMARY_COLOR: string = '#FF7B29';

export const theme = {
    light: '',
    dark: '',
    colors: {
        primary: PRIMARY_COLOR,
        secondary: '#31C3E0',
        facebook: '#1877F2',
        warning: '#FFA015',
        success: '#34A853',
        error: '#FF0000',
        grey: '#CCC',
        yellow: '#FFCE3D',
        border: '#BFBFBF',
        textPrimary: 'rgba(0, 0, 0, 0.85)',
        textSecondary: 'rgba(0, 0, 0, 0.45)',
        disabledPlaceholder: 'rgba(0, 0, 0, 0.25)',
        white: '#FFF',
        black: '#000',
        shadowForm: 'rgb(34 41 47 / 10%)',
        overlayImage: 'rgba(106, 111, 119, 0.1)',
    },
    transition: {
        primary: 'all 0.25s linear',
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
