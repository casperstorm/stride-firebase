import { Distance } from '../../entities/distance'
import {
  CREATE_DISTANCE,
  CreateDistanceAction,
  DELETE_DISTANCE,
  DeleteDistanceAction,
  SET_DISTANCE_RECORD,
  SET_DISTANCES,
  SetDistanceRecordAction,
  SetDistancesAction,
} from './types'

export const setDistances = (
  distances: Array<Distance>
): SetDistancesAction => ({
  type: SET_DISTANCES,
  payload: distances,
})

export const createDistance = (distance: Distance): CreateDistanceAction => ({
  type: CREATE_DISTANCE,
  payload: distance,
})

export const deleteDistance = (distance: Distance): DeleteDistanceAction => ({
  type: DELETE_DISTANCE,
  payload: distance,
})

export const setRecordForDistance = (
  time: string,
  distance: Distance
): SetDistanceRecordAction => ({
  type: SET_DISTANCE_RECORD,
  payload: { time, distance },
})
