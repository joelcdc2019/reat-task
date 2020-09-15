import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import loader from './loader';

export default (history) => combineReducers({
  router: connectRouter(history),
  loader
});
