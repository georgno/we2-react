import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import './App.css';
import UserManagement from './components/UserManagement.js'
import ForumManagement from './components/ForumManagement.js'
import Forum from './components/Forum';
import ForumOverview from './components/ForumOverview';

const mapStateToProps = state => {
  return state;
}

class App extends Component {
  render() {

    const accessToken = this.props.authentication.accessToken;

    if(accessToken) {
      return (
          <Routes>
            <Route path="/" exact element={<ForumOverview/>} />
            <Route path="/userManagement"  exact element={<UserManagement/>} />
            <Route path="/forumManagement" exact element={<ForumManagement/>} />
            <Route path="forum/:forumID" exact element={<Forum/>}/>
          </Routes>
      );
    } else {
      return (
          <Routes>
            <Route path="/" exact element={<ForumOverview/>} />
            <Route path="*" exact element= {<Navigate to="/" />}/>
            <Route path="forum/:forumID" element={<Forum/>}/>
          </Routes>
      );
    }
  }
}

export default connect(mapStateToProps)(App);
