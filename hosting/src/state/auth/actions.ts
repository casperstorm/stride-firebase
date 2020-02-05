import firebase from 'firebase/app'
import {
  SET_USER,
  SetUserAction,
  SIGN_IN,
  SIGN_OUT,
  SignInAction,
  SignOutAction,
} from './types'

export const setUser = (user: firebase.User): SetUserAction => ({
  type: SET_USER,
  payload: user,
})

export const signOut = (): SignOutAction => ({
  type: SIGN_OUT,
})

export const signIn = (email: string, password: string): SignInAction => ({
  type: SIGN_IN,
  payload: { email, password },
})
