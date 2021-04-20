import similarityService from '../services/similarity';
import { similarityConstant } from '../constants';
import { alertErrorMessage } from './alert';

export function getSimilarityStart() {
  return {
    type: similarityConstant.GET_SIMILARITY_START
  };
}

export function getSimilaritySuccess(similarity) {
  return {
    type: similarityConstant.GET_SIMILARITY_SUCCESS,
    similarity
  };
}

export function getSimilarityFailure() {
  return {
    type: similarityConstant.GET_SIMILARITY_FAILURE
  };
}


export function getSimilarity(userId) {
  return dispatch => {
    dispatch(getSimilarityStart());
    return similarityService.list(userId)
      .then((response) => {
        dispatch(getSimilaritySuccess(response.data.data));
      })
      .catch(() => {
        dispatch(alertErrorMessage('Error loading similarities'));
        dispatch(getSimilarityFailure());
      });
  };
}
