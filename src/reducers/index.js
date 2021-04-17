import { combineReducers } from 'redux';
import { user } from './user';
import { similarity } from './similarity';
import { alert } from './alert';


const rootReducer = combineReducers({
  similarity,
  user,
  alert
});

export default rootReducer;