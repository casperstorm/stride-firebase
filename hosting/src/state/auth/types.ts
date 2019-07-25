import firebase from 'firebase/app'

export interface AuthState {
  user?: firebase.User
}

export const SIGN_IN = 'SIGN_IN'
export const SET_USER = 'SET_USER'
export const SIGN_OUT = 'SIGN_OUT'

export interface SetUserAction {
  type: typeof SET_USER
  payload: firebase.User
}

export interface SignOutAction {
  type: typeof SIGN_OUT
}

export interface SignInAction {
  type: typeof SIGN_IN
  payload: { email: string; password: string }
}

export type AuthActionTypes = SetUserAction | SignOutAction | SignInAction
