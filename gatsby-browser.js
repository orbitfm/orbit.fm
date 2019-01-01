import React from 'react';
import { Provider } from 'react-redux';

import createStore from './src/state/createStore';
import './src/utils/global-styles';
const Layout = require('./src/components/Layout').default;

const store = createStore();

export const wrapRootElement = ({ element }) => {
  const ConnectedRootElement = <Provider store={store}>{element}</Provider>;

  return ConnectedRootElement;
};

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
);
