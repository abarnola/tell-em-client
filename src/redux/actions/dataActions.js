import {
  SET_TELLS,
  LOADING_DATA,
  LIKE_TELL,
  UNLIKE_TELL,
  DELETE_TELL,
  POST_TELL,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_TELL,
  SUBMIT_COMMENT
} from '../types'
import axios from 'axios'

//Get all Tells
export const getTells = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get('/tells')
    .then(res => {
      dispatch({
        type: SET_TELLS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_TELLS,
        payload: []
      })
    })
}

export const getTell = tellId => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .get(`/tell/${tellId}`)
    .then(res => {
      dispatch({ type: SET_TELL, payload: res.data })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch(err => console.error(err))
}

//Post a Tell
export const postTell = newTell => dispatch => {
  dispatch({ type: LOADING_UI })
  axios
    .post('/tell', newTell)
    .then(res => {
      dispatch({
        type: POST_TELL,
        payload: res.data
      })
      dispatch({
        type: CLEAR_ERRORS
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

//Like a Tell
export const likeTell = tellId => dispatch => {
  axios
    .get(`/tell/${tellId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_TELL,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}

//Unlike a Tell
export const unlikeTell = tellId => dispatch => {
  axios
    .get(`/tell/${tellId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_TELL,
        payload: res.data
      })
    })
    .catch(err => console.log(err))
}
//Submit a Comment
export const submitComment = (tellId, commentData) => dispatch => {
  axios
    .post(`/tell/${tellId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch(err => {
      //dispatch({ type: SET_ERRORS, payload: err.response.data })
      console.log('error: ' + err)
    })
}
// Delete a Tell
export const deleteTell = tellId => dispatch => {
  axios.get(`/tell/${tellId}`).then(() => {
    dispatch({
      type: DELETE_TELL,
      payload: tellId
    })
  })
}

export const getUserDetails = userName => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios
    .get(`/user/${userName}`)
    .then(res => {
      dispatch({
        type: SET_TELLS,
        payload: res.data.tells
      })
    })
    .catch(() => {
      dispatch({ type: SET_TELLS, payload: null })
    })
}

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS })
}
