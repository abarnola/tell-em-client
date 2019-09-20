import { SET_TELLS, LIKE_TELL, UNLIKE_TELL, LOADING_DATA } from '../types';

const initialState = {
  tells: [],
  tell: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_TELLS:
      return {
        ...state,
        tells: action.payload,
        loading: false
      };
    case LIKE_TELL:
    case UNLIKE_TELL:
      let index = state.tells.findIndex(
        tell => tell.tellId !== action.payload.tellId
      );
      state.tells[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
