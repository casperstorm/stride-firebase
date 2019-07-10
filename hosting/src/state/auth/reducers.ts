import { AuthActionTypes, AuthState, CLEAR_USER, SET_USER } from './types'

const initialState: AuthState = {}

const auth = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, user: action.payload }
    }
    case CLEAR_USER: {
      return initialState
    }
    default:
      return state
  }
}

export default auth
