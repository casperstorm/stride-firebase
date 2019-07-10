import { Distance } from '../../entities/distance'
import { CREATE_DISTANCE, DistanceActionTypes, SET_DISTANCES } from './types'

export const setDistances = (
  distances: Array<Distance>
): DistanceActionTypes => ({
  type: SET_DISTANCES,
  payload: distances,
})

export const createDistance = (distance: Distance): DistanceActionTypes => ({
  type: CREATE_DISTANCE,
  payload: distance,
})
