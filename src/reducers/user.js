import { userConstant } from '../constants/user';

const DEFAULT_STATE = {
  users: [], 
  user: {},
  fetching: false
};

export function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case userConstant.GET_USERS_START:
      return Object.assign({}, state, { fetching: true });
    case userConstant.GET_USERS_SUCCESS:
      return Object.assign({}, state, { fetching: false, users: action.users, user: action.users[0] });
    case userConstant.GET_USERS_FAILURE:
      return Object.assign({}, state, { fetching: false });
    case userConstant.READ_USER_SUCCESS:
      return Object.assign({}, state, { fetching: false, user: action.user });
    default:
      return state
  }
}