import axios from 'axios';

import { SET_USERS } from '../reducer/data_reducer';

export const getUsers = (dispatch) => {
  return axios
    .get('/api/users')
    .then(({ data }) => {
      dispatch({
        type: SET_USERS,
        users: data,
      });
    })
    .catch((err) => console.log(err));
};

export const getUsersByProjectId = (id) => {
  return axios.get(`/api/users/?projectId=${id}`).then((result) => result.data);
};
