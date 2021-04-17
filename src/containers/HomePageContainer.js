import { connect } from 'react-redux';
import HomePage from '../components/HomePage';
import { getUsers, getSimilarity, readUserData } from '../actions';

const mapStateToProps = (state) => {
  const { user, users, fetching } = state.user;
  const { similarity_user_list,
    recurring_trend } = state.similarity;
  const { errorMessage } = state.alert;

  return {
    fetching,
    users,
    user,
    errorMessage,
    similarity_user_list,
    recurring_trend
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => { dispatch(getUsers())},
   readUserData: (user, props) => { dispatch(readUserData(user, props))},
    getSimilarity: (userId) => { dispatch(getSimilarity(userId))} 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);