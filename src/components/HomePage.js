import React, { Component } from 'react';
import '../App.css';
import Loader from './Loader.js';
import Alert from './Alert.js';

import PropTypes from 'prop-types';

export class HomePage extends Component {
  static propTypes = {
    users: PropTypes.array,
    errorMessage: PropTypes.string,
    fetching: PropTypes.bool,
    getUsers: PropTypes.func,
    readUserData: PropTypes.func,
    user: PropTypes.shape({
      full_name: PropTypes.string,
      id: PropTypes.number,
      avatar: PropTypes.string,
      months_ago: PropTypes.number,
      total_spent: PropTypes.string,
      total_income: PropTypes.string,
      transactions_count: PropTypes.string
    }),
    similarity_user_list: PropTypes.array,
    recurring_trend: PropTypes.array
  }

  static defaultProps = {
    getUsers: () => {},
    readUserData: () => {},
    errorMessage: '',
    fetching: false
  }

  constructor(props) {
    super(props);
    this.readUser = this.readUser.bind(this);
  }

  componentDidMount() {
    this.props.getUsers();
  }

  readUser(user) {
    this.props.readUserData(user, this.props);
  }

  readSimilarity(userId) {
    this.props.getSimilarity(userId)
  }

  displayUsers(users) {
    if (users) {
        return users.map((user, i) => {
        
        return (
            <div className="list-group test-style" key={i} >
                <div className="list-group-item btn-group" onClick={() => { this.readUser(user) }} >
                    <div className="row">
                    <div className="col-sm-4">
                        <img alt="" src={user.avatar} className="img-thumbnail userImage" />
                    </div>
                    <div className="col-sm-8">
                        <p className="card-text">{user.full_name}</p>
                        <span> {user.transactions_count} transactions . Joined {user.months_ago} months ago </span>
                </div>
                </div>
                </div>
            </div>
        )
        });
    }
  }

    viewUser(user) {
        return (
            <div>
                <img alt="" src={user.avatar} className="img-thumbnail userImage" />
                <div>
                    <p className="card-text">{user.full_name}</p>
                    <span> {user.transactions_count} transactions . Joined {user.months_ago} months ago </span>
                </div>
            </div>
            
        )
    }

    displayReccurring(reccurringCategories) {
        return reccurringCategories.map((category, i) => {
            return (
               <img alt="" src={category.icon_url} className="img-thumbnail" key={i} />
            )
        });
    }

     displayUsersLike(users) {
        if (users) {
            return users.map((user, i) => {
            return (
                <div key={i}>
                    <div className="row">
                        <div className="col-6">
                            <div className="col-sm">
                           {this.displayReccurring(this.props.recurring_trend)}
                           </div>
                        </div>
                        <div className="col-6">
                             <div className="list-group" >
                                <div className="list-group-item btn-group">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <img alt="" src={user.avatar} className="img-thumbnail userImage" />
                                        </div>
                                        <div className="col-sm-8">
                                            <p className="card-text">{user.full_name}</p>
                                            <span> {user.transactions_count} transactions . Joined {user.months_ago} months ago </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            });
        }
    }

  displayDashboard() {
    const { fetching, users } = this.props;

    if (this.props.user.id) {
       this.readSimilarity(this.props.user.id);
    }

    if (fetching && this.props.similarity_user_list.length === 0 && this.props.recurring_trend.length === 0) return <Loader />;
    
    return(
        <div> 
            <div className="row userListDiv">
                <div className="col-4">
                <b>USERS</b>
                { this.displayUsers(users) }
                </div>
                <div className="col-8 userDiv">  
                { this.viewUser(this.props.user) }
                    <div className="row">
                        <div className="col-sm">
                            <div className="card">
                            <div className="card-body">
                                <span className="card-title">TOTAL SPENT</span>
                                <p className="card-text moneyFont"><b>N{this.props.user.total_spent}</b></p>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card">
                            <div className="card-body">
                                <span className="card-title">TOTAL INCOME</span>
                                <p className="card-text moneyFont"><b>N{this.props.user.total_income}</b></p>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="card">
                                <div className="card-body">
                                    <span className="card-title">TRANSACTIONS</span>
                                    <p className="card-text moneyFont"><b>N{this.props.user.transactions_count}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <p>RECURRING EXPENSES</p>
                        </div>
                        <div className="col-6">
                            <p>USERS LIKE {this.props.user.full_name}</p>
                        </div>
                        { this.props.similarity_user_list.length > 0 && this.props.recurring_trend.length > 0 && this.displayUsersLike(this.props.similarity_user_list) }
        
                    </div>
                </div>
            </div>
        </div>
    )
  }

  render() {
    return (
      <div className="container dasboardDiv">
        <Alert errorMessage={this.props.errorMessage} />
        {this.displayDashboard()}
      </div>
    );
  }
}

export default HomePage;
