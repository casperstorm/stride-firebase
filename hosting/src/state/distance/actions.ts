import { Distance } from '../../entities/distance'
import {
  CREATE_DISTANCE,
  CreateDistanceAction,
  DELETE_DISTANCE,
  DeleteDistanceAction,
  PURGE_DISTANCES,
  PurgeDistancesAction,
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

export const createDistance = (meters: number): CreateDistanceAction => ({
  type: CREATE_DISTANCE,
  payload: meters,
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

export const purgeDistances = (): PurgeDistancesAction => ({
  type: PURGE_DISTANCES,
})
