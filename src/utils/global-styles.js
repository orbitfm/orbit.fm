import { injectGlobal } from 'emotion';
injectGlobal`
  body {
    margin: 0;
    color: white;
    word-wrap: break-word;
    box-sizing: border-box;
    background: #333;
  }
  a {
    color: white;
  }
  a:active,
  a:hover {
    outline-width: 0;
    color: white;
    text-decoration: underline;
  }
  html {
    box-sizing: border-box;
    overflow-y: scroll;
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
