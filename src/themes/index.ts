const PRIMARY_COLOR: string = '#FF7B29';
const SECONDARY_COLOR: string = '#31C3E0';

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
        textTertiary: '#BCBCBC',
        textQuaternary: '#566363',
        disabledPlaceholder: 'rgba(0, 0, 0, 0.25)',
        divider: 'rgba(5, 5, 5, 0.06)',
        hoverPrimary: 'rgba(240,81,35,.1)',
        hoverSecondary: '#F1F1F1',
        white: '#FFF',
        black: '#000',
        shadowForm: 'rgb(34 41 47 / 10%)',
        shadowCart: 'rgba(56, 56, 56, 0.06)',
        shadowDropdown: 'rgba(0, 0, 0, 0.02)',
        shadowCartHover: 'rgba(56, 56, 56, 0.07)',
        shadowPurchased: 'rgba(51, 56, 56, 0.06)',
        shadowPurchasedHover: 'rgba(51, 56, 56, 0.07)',
        overlayImage: 'rgba(106, 111, 119, 0.1)',
        borderDefault: '#E5E5E5',
        borderInput: '#D9D9D9',
        starIcon: '#FADB14',
        done: '#1BC47D',
        processing: '#FFC700',
        incoming: '#FF9500',
        cancel: '#FF2942',
        pending: '#BFBFBF',
    },
    transition: {
        primary: 'all 0.25s linear',
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
