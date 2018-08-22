import { injectGlobal } from 'emotion';

injectGlobal`
  body {
    margin: 0;
    color: white;
    box-sizing: border-box;
    background: #333;
  }
  html {
    box-sizing: border-box;
  }
  * {
    box-sizing: inherit;
  }
  *:before {
    box-sizing: inherit;
  }
  *:after {
    box-sizing: inherit;
  }
`;
