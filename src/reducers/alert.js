import { alertsConstant } from '../constants';

export function alert(state={ errorMessage: '' }, action) {
  switch (action.type) {
    // case alertsConstant.ALERT_ERROR_MESSAGE:
    //   return Object.assign({}, state, { errorMessage: action.errorMessage });
    // case alertsConstant.CLEAR:
    //   return Object.assign({}, state, { errorMessage: '' });
    default:
      return state
  }
}
