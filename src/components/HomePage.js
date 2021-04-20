import React, { Component } from 'react';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
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
    errorMessage: '',
    fetching: false
  }

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this)
    this.state = {
      key: 0
    };
  }

  componentDidMount() {
    this.props.getUsers()
  }

  handleSelect = (key) => {
    this.setState({ key });
    this.readSimilarity(this.props.users[key].id)
  }

  readSimilarity(userId) {
    this.props.getSimilarity(userId)
  }   

    displayReccurring(reccurringCategories) {
        return reccurringCategories.map((category, i) => {
            return (
               <img alt="" src={category.icon_url} className="img-thumbnail category-img colorBlue" key={i} />
            )
        });
    }

     displayUsersLike() {
        return this.props.similarity_user_list && this.props.similarity_user_list.length > 0 &&
            this.props.similarity_user_list.map((user, i) => {
            return (
                <div key={i}>
                    <div className="row display-like">
                        <div className="col-6">
                            <div className="col-sm">
                               {this.props.recurring_trend && this.displayReccurring(this.props.recurring_trend)}
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

     viewUser() {
         return this.props.users.map((user, i) => {
            return (
                <div key={i}>
                    <Tab.Content>
                    <Tab.Pane eventKey={i}>
                        <div className="col-8 userDiv">  
                            <img alt="" src={user.avatar} className="img-thumbnail userImage" />
                            <div>
                                <p className="card-text">{user.full_name}</p>
                                <span> {user.transactions_count} transactions . Joined {user.months_ago} months ago </span>
                            </div>
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
                    <div className="row similarity">
                        <div className="col-6">
                            <p>RECURRING EXPENSES</p>
                        </div>
                        <div className="col-6">
                            <p>USERS LIKE {user.full_name}</p>
                        </div>
                         { !this.props.fetching && this.props.similarity_user_list.length === 0 && this.props.recurring_trend.length === 0 && <div>NO SIMILAR USER</div> }
                        { this.props.similarity_user_list.length > 0 && this.props.recurring_trend.length > 0 && this.displayUsersLike() }
        
                        </div>
                        </div>
                    </Tab.Pane>
                    </Tab.Content>
                </div>
            )
            
        })
    }

    displaySideNav() {
        return this.props.users &&
            this.props.users.length > 0 &&
            this.props.users.map((user, i) => {
            return (
                <div key={i}> 
                    <Nav.Item>
                        <Nav.Link eventKey={i}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <img alt="" src={user.avatar} className="img-thumbnail userImage" />
                                </div>
                                <div className="col-sm-8">
                                    <p className="card-text">{user.full_name}</p>
                                    <span> {user.transactions_count} transactions . Joined {user.months_ago} months ago </span>
                                </div>
                                </div>
                        </Nav.Link>
                    </Nav.Item>
                </div>
            )
        })
    
    }

    render() {
        const { fetching } = this.props;

        if (fetching) return <Loader />;
        
        return (
            <div className="container dasboardDiv">
                <Alert errorMessage={this.props.errorMessage} />
                <Tab.Container id="" defaultActiveKey={this.state.key} onSelect={this.handleSelect}>
                    <Row className="userListDiv">
                        <Col sm={4}>
                            <Nav variant="tabs" className="flex-column">
                                {this.displaySideNav()}
                            </Nav>
                        </Col>
                        <Col sm={8} className="userDiv">
                            {this.viewUser()}
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
}

export default HomePage;
