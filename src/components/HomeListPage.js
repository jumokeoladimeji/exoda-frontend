import React, { useState, useEffect } from 'react';
import userService from '../services/user';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [users] = useState({});

  useEffect(() => {
    userService.list();
  }, []);

  const readUser = () => {
    let newUsers = { users }
    return newUsers;
  }

  const renderedUsers = Object.values(users).map(user => {
    return (
         <div className="list-group test-style" key={user.id} >
                <div className="list-group-item btn-group" onClick={readUser(user)} >
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
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedUsers}
    </div>
  );
};

