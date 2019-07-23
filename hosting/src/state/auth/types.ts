import firebase from 'firebase/app'

export interface AuthState {
  user?: firebase.User
}

export const SET_USER = 'SET_USER'
export const CLEAR_USER = 'CLEAR_USER'

export interface SetUserAction {
  type: typeof SET_USER
  payload: firebase.User
}

export interface ClearUserAction {
  type: typeof CLEAR_USER
}

export type AuthActionTypes = SetUserAction | ClearUserAction
