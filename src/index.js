import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

import authenticationReducer from './reducer/AuthenticationReducer'
import commentReducer from './reducer/CommentReducer'
import forumReducer from './reducer/ForumReducer'
import userReducer from './reducer/UserReducer'

import { BrowserRouter } from 'react-router-dom';
import 'dotenv/config'
const initialState = {}

const reducer = combineReducers({
  authentication: authenticationReducer,
  comment: commentReducer,
  forum: forumReducer,
  user: userReducer
})

const middlewares = [thunk];

const store = createStore(reducer, initialState, applyMiddleware(...middlewares));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
