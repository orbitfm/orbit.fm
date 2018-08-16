import React from 'react';
import { Provider } from 'react-redux';
import { injectGlobal } from 'emotion';

import createStore from './src/state/createStore';

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

const store = createStore();

export const wrapRootComponent = ({ Root }) => {
  const ConnectedRootComponent = () => (
    <Provider store={store}>
      <Root />
    </Provider>
  );

  return ConnectedRootComponent;
};
