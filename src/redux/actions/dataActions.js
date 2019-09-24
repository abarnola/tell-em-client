import {
  SET_TELLS,
  LOADING_DATA,
  LIKE_TELL,
  UNLIKE_TELL,
  DELETE_TELL
} from '../types';
import axios from 'axios';

//Get all Tells
export const getTells = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/tells')
    .then(res => {
      dispatch({
        type: SET_TELLS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_TELLS,
        payload: []
      });
    });
};

//Like a Tell
export const likeTell = tellId => dispatch => {
  axios
    .get(`/tell/${tellId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_TELL,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//Unlike a Tell
export const unlikeTell = tellId => dispatch => {
  axios
    .get(`/tell/${tellId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_TELL,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Delete a Tell
export const deleteTell = tellId => dispatch => {
  axios.delete(`/tell/${tellId}`).then(() => {
    dispatch({
      type: DELETE_TELL,
      payload: tellId
    });
  });
};
