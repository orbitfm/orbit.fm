import { createStore as reduxCreateStore } from 'redux';
import reducer from './reducer';

const initialState = {
  url: null,
  isPlaying: false,
  title: null,
  podcast: null,
};

const createStore = () => reduxCreateStore(reducer, initialState);
export default createStore;
