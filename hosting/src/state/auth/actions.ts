import firebase from 'firebase/app'
import { AuthActionTypes, CLEAR_USER, SET_USER } from './types'

export const setUser = (user: firebase.User): AuthActionTypes => ({
  type: SET_USER,
  payload: user,
})

export const clearUser = (): AuthActionTypes => ({
  type: CLEAR_USER,
})
