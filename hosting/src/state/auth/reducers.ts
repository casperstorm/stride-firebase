import { AuthActionTypes, AuthState, SET_USER, SIGN_OUT } from './types'

const initialState: AuthState = {}

const auth = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case SET_USER: {
      return { ...state, user: action.payload }
    }
    case SIGN_OUT: {
      return initialState
    }
    default:
      return state
  }
}

export default auth
