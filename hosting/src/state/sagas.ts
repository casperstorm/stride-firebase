import firebase from 'firebase/app'
import 'firebase/firestore'
import { all, select, takeLatest } from 'redux-saga/effects'
import { Distance } from '../entities/distance'
import { SIGN_IN, SignInAction } from './auth/types'
import {
  CREATE_DISTANCE,
  CreateDistanceAction,
  DELETE_DISTANCE,
  DeleteDistanceAction,
  SET_DISTANCE_RECORD,
  SetDistanceRecordAction,
} from './distance/types'
import { AppState } from './store'

function* createDistance(action: CreateDistanceAction) {
  const user: firebase.User = yield select((state: AppState) => state.auth.user)
  if (!user) {
    return
  }

  const meters = action.payload as number
  const raw = {
    meters,
    record: {
      time: '00:00:00',
    },
  }

  yield firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('distances')
    .add(raw)
}

function* deleteDistance(action: DeleteDistanceAction) {
  const user: firebase.User = yield select((state: AppState) => state.auth.user)
  if (!user) {
    return
  }

  const distance = action.payload as Distance
  const store = firebase.firestore()
  yield store
    .collection('users')
    .doc(user.uid)
    .collection('distances')
    .doc(distance.id)
    .delete()
}

function* setDistanceRecord(action: SetDistanceRecordAction) {
  const user: firebase.User = yield select((state: AppState) => state.auth.user)
  if (!user) {
    return
  }

  const { seconds, distance } = action.payload
  yield firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('distances')
    .doc(distance.id)
    .update({ record: { duration: seconds } })
}

function* signIn(action: SignInAction) {
  const { email, password } = action.payload
  yield firebase.auth().signInWithEmailAndPassword(email, password)
}

export default function* root() {
  yield all([
    takeLatest(CREATE_DISTANCE, createDistance),
    takeLatest(DELETE_DISTANCE, deleteDistance),
    takeLatest(SET_DISTANCE_RECORD, setDistanceRecord),
    takeLatest(SIGN_IN, signIn),
  ])
}
