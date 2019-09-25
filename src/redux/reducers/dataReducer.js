import {
  SET_TELLS,
  LIKE_TELL,
  UNLIKE_TELL,
  LOADING_DATA,
  DELETE_TELL,
  POST_TELL
} from '../types'

const initialState = {
  tells: [],
  tell: {},
  loading: false
}

export default function(state = initialState, action) {
  let index
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_TELLS:
      return {
        ...state,
        tells: action.payload,
        loading: false
      }
    case POST_TELL:
      return {
        ...state,
        tells: [action.payload, ...state.tells]
      }
    case LIKE_TELL:
    case UNLIKE_TELL:
      index = state.tells.findIndex(
        tell => tell.tellId === action.payload.tellId
      )
      state.tells[index] = action.payload
      return {
        ...state
      }
    case DELETE_TELL:
      index = state.tells.findIndex(tell => tell.tellId === action.payload)
      state.tells.splice(index, 1)
      return {
        ...state
      }
    default:
      return state
  }
}
