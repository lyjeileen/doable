import axios from 'axios';
import { useApplicationState } from '../hooks/useApplicationData';

import { REMOVE_TASK, ADD_TASK, EDIT_TASK } from '../reducer/data_reducer';

export const getTasksForProject = (id) => {
  return axios.get(`/api/tasks/?projectId=${id}`)
    .then((result) => result.data);
};

export const createTask = (dispatch, task) => {
  return axios.post('/api/tasks', task)
    .then((response) => {
      const { data } = response;
      dispatch({
        type: ADD_TASK,
        task: data.task,
      });
    })
    .catch((err) => console.log("AXIOS PUT ERROR", err.message));
};

export const editTask = (dispatch, id) => {
  return axios.put(`/api/tasks/${id}`)
    .then(() => {
      dispatch({
        type: EDIT_TASK,
        id
      });
    });
};

export const deleteTask = (dispatch, id) => {
  return axios.delete(`/api/tasks/${id}`)
    .then(() => {
      dispatch({
        type: REMOVE_TASK,
        id,
      });
    })
    .catch((err) => console.log(err.message));
};
