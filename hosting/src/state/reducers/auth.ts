import firebase from 'firebase/app'
import { ACTION_TYPES } from '../actions'

export interface UserState {
  user?: firebase.User
}

const initialState: UserState = {}

const auth = (state: UserState = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER: {
      const { user } = action.payload
      return { ...state, user }
    }
    case ACTION_TYPES.CLEAR_USER: {
      return initialState
    }
    default:
      return state
  }
}

export default auth
