import { similarityConstant } from '../constants/similarity';

const DEFAULT_STATE = {
  similarity_user_list: [],
  recurring_trend: [],
  fetching: false 
};


export function similarity(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case similarityConstant.GET_SIMILARITY_START:
      return Object.assign({}, state, { fetching: true });
    case similarityConstant.GET_SIMILARITY_SUCCESS:
        return Object.assign({}, state, { fetching: false, recurring_trend: action.similarity.recurring, similarity_user_list: action.similarity.user_list});
    case similarityConstant.GET_SIMILARITY_FAILURE:
        return Object.assign({}, state, { fetching: false });
    default:
      return state
  }
}