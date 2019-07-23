import firebase from 'firebase/app'
import { CLEAR_USER, ClearUserAction, SET_USER, SetUserAction } from './types'

export const setUser = (user: firebase.User): SetUserAction => ({
  type: SET_USER,
  payload: user,
})

export const clearUser = (): ClearUserAction => ({
  type: CLEAR_USER,
})
