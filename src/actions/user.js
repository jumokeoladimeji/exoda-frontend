import userService from '../services/user';
import { userConstant } from '../constants';
import { alertErrorMessage } from './alert';
import { getSimilarity } from './similarity'


export function getUsersStart() {
  return {
    type: userConstant.GET_USERS_START
  };
}

export function getUsersSuccess(users) {
  return {
    type: userConstant.GET_USERS_SUCCESS,
    users
  };
}

export function getUsersFailure() {
  return {
    type: userConstant.GET_USERS_FAILURE
  };
}

export function readUserStart() {
  return {
    type: userConstant.READ_USER_START
  };
}

export function readUserSuccess(user) {
  return {
    type: userConstant.READ_USER_SUCCESS,
    user
  };
}

export function readUserFailure() {
  return {
    type: userConstant.READ_USER_FAILURE
  };
}

export function getUsers() {
  return dispatch => {
    dispatch(getUsersStart());
    return userService.list()
      .then((response) => {
        dispatch(getSimilarity(response.data.data[0].id));
        dispatch(getUsersSuccess(response.data.data));
      })
      .catch(() => {
        dispatch(alertErrorMessage('Error loading users'));
        dispatch(getUsersFailure());
      });
  };
}

export function readUserData(user, props) {
  return dispatch => {
        dispatch(readUserSuccess(user))
  };
}