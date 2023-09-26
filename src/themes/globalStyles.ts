import { createGlobalStyle } from 'styled-components';
import { theme } from '.';

const GlobalStyles = createGlobalStyle`
    :root {
        --primary-color: ${theme.colors.primary};
        --white-color: ${theme.colors.white};
    }
    
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        font-family: 'Inter', 'Poppins', Arial, Helvetica, sans-serif;
        font-size: 1.6rem;
        line-height: 1.5;

        overflow: unset;
        text-rendering: optimizeSpeed;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
    }

    border,
    input,
    [tabindex] {
        outline: none;
        border: none;
    }

    button {
        font-size: 1em;
        border: none;
    }

    a {
        font-weight: 500;
        color: var(--primary-color);
    }

    ul li a {
        text-decoration: none;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        border-radius: 0;
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.15);
    }

    ::-webkit-scrollbar-track {
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0);
    }

    /* Selection */
    ::selection {
        color: var(--white-color);
        background: var(--primary-color);
    }

    /* Custom styles */
    h1.ant-typography, h2.ant-typography, h3.ant-typography, h4.ant-typography, h5.ant-typography, h6.ant-typography {
        font-family: 'Poppins', Arial, Helvetica, sans-serif;
    }

    /* Change Autocomplete styles in Chrome*/
    input:-webkit-autofill,
    input:-webkit-autofill:hover, 
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        -webkit-text-fill-color: ${theme.colors.textDark};
        -webkit-box-shadow: 0 0 0px 1000px ${theme.colors.white} inset;
        transition: all 5000s ease-in-out 0s;
    }
`;

export default GlobalStyles;
