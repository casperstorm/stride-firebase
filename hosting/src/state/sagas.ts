import firebase from 'firebase/app'
import 'firebase/firestore'
import { all, call, select, takeLatest } from 'redux-saga/effects'
import { Distance } from '../entities/distance'
import { CREATE_DISTANCE, DistanceActionTypes } from './distance/types'
import { AppState } from './store'

function* createDistance(action: DistanceActionTypes) {
  const user: firebase.User = yield select((state: AppState) => state.auth.user)
  if (!user) {
    return
  }

  const distance = action.payload as Distance
  yield firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('distances')
    .add({
      meters: distance.meters,
      miles: distance.miles,
    })
}

export default function* root() {
  yield all([takeLatest(CREATE_DISTANCE, createDistance)])
}
