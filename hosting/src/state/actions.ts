import firebase from 'firebase/app'
import { Record } from '../entities/record'

export enum ACTION_TYPES {
  /* User */
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',

  /* Records */
  SET_RECORDS = 'SET_RECORDS',
}

export const setUser = (user: firebase.User) => ({
  type: ACTION_TYPES.SET_USER,
  payload: { user },
})

export const clearUser = () => ({
  type: ACTION_TYPES.CLEAR_USER,
})

export const setRecords = (records: Array<Record>) => ({
  type: ACTION_TYPES.SET_RECORDS,
  payload: { records },
})
