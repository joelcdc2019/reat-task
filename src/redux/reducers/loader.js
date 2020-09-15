import actionTypes from '../actionTypes';

const INITIAL_STATE = true

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return true;
    case actionTypes.HIDE_LOADER:
      return false;
    default:
      return state;
  }
};
