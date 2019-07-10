import firebase from 'firebase/app'
import 'firebase/firestore'
import { all, select, takeLatest } from 'redux-saga/effects'
import { Distance, DistanceProperties } from '../entities/distance'
import { CREATE_DISTANCE, DistanceActionTypes } from './distance/types'
import { AppState } from './store'

function* createDistance(action: DistanceActionTypes) {
  const user: firebase.User = yield select((state: AppState) => state.auth.user)
  if (!user) {
    return
  }

  const distance = action.payload as Distance
  const plain: DistanceProperties = {
    meters: distance.meters,
  }

  yield firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('distances')
    .add(plain)
}

export default function* root() {
  yield all([takeLatest(CREATE_DISTANCE, createDistance)])
}
