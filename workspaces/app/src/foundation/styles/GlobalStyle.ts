import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import { Color } from './variables';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Noto Sans JP';
    src: url('/assets/NotoSansJP-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Noto Sans JP';
    src: url('/assets/NotoSansJP-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Noto Sans JP';
    src: url('/assets/NotoSansJP-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  body {
    background-color: ${Color.MONO_A};
    font-family: 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;
