import { combineReducers } from 'redux';
import configureStore from './createStore';
import rootSaga from '../sagas';
// import { reducer as search } from './searchRedux';

export default () => {
  const rootReducer = combineReducers({
    search: require('./searchRedux').reducer
  });
  return configureStore(rootReducer, rootSaga);
};
