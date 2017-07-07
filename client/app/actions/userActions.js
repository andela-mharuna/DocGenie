import axios from 'axios';
import jwt from 'jwt-decode';
import { browserHistory } from 'react-router';
import { CREATE_USER, SIGNIN_USER, CREATE_USER_ERROR, SIGNIN_USER_ERROR,
  LOGOUT_USER, VIEW_USERS, VIEW_USERS_ERROR } from '../actionTypes';

export const createUser = (user) => {
  return (dispatch) => {
    return axios.post('/auth/api/users', user)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: CREATE_USER, user: response.data.user });
        browserHistory.push('/dashboard/documents');
      }).catch((error) => {
        dispatch({ type: CREATE_USER_ERROR,
          error: error.response.data.message || error.response.data });
        return Promise.reject(error);
      });
  };
};
export const signInUser = (user) => {
  return (dispatch) => {
    return axios.post('/auth/api/users/login', user)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: SIGNIN_USER, user: response.data.user });
        browserHistory.push('/dashboard/documents');
      }).catch((error) => {
        dispatch({ type: SIGNIN_USER_ERROR,
          error: error.response.data.message || error.response.data });
        return Promise.reject(error);
      });
  };
};
export const getUser = () => {
  const token = localStorage.getItem('token');
  const userId = jwt(token).userId;
  const config = {
    headers: { authorization: token }
  };
  return (dispatch) => {
    return axios.get(`/api/users/${userId}`, config)
      .then((response) => {
        dispatch({ type: CREATE_USER, user: response.data });
      }).catch((error) => {
        dispatch({ type: CREATE_USER_ERROR,
          error: error.response.data.message || error.response.data });
        return Promise.reject(error);
      });
  };
};

export const logoutUser = () => {
  // Return action
  return {
    type: LOGOUT_USER,
  };
};

export const updateProfile = (user) => {
  const token = localStorage.getItem('token');
  const userId = jwt(token).userId;
  const config = {
    headers: { authorization: token }
  };

  return (dispatch) => {
    return axios.put(`/api/users/${userId}`, user, config)
      .then((response) => {
        dispatch({ type: CREATE_USER, user: response.data });
      }).catch((error) => {
        dispatch({ type: CREATE_USER_ERROR,
          error: error.response.data.message || error.response.data });
      });
  };
};
export const viewAllUsers = (page = '') => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { authorization: token }
  };
  return (dispatch) => {
    return axios.get(`/api/users/?page=${page}`, config)
      .then((response) => {
        dispatch({ type: VIEW_USERS,
          users: response.data.users,
          pagination: response.data.pagination });
      }).catch((error) => {
        dispatch({ type: VIEW_USERS_ERROR,
          error: error.response.data.message || error.response.data });
      });
  };
};
