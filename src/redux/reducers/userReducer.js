import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_TELL,
  UNLIKE_TELL
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_TELL:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.credentials.userName,
            tellId: action.payload.tellId
          }
        ]
      };
    case UNLIKE_TELL:
      return {
        ...state,
        likes: state.likes.filter(like => like.tellId !== action.payload.tellId)
      };
    default:
      return state;
  }
}
