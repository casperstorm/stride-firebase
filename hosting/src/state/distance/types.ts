import { Distance } from '../../entities/distance'

export interface DistanceState {
  distances: Array<Distance>
}

export const CREATE_DISTANCE = 'CREATE_DISTANCE'
export const SET_DISTANCES = 'SET_DISTANCES'

interface SetDistancesAction {
  type: typeof SET_DISTANCES
  payload: Array<Distance>
}

interface CreateDistanceAction {
  type: typeof CREATE_DISTANCE
  payload: Distance
}

export type DistanceActionTypes = CreateDistanceAction | SetDistancesAction
