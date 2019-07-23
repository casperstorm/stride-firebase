import { Distance } from '../../entities/distance'

export interface DistanceState {
  distances: Array<Distance>
}

export const CREATE_DISTANCE = 'CREATE_DISTANCE'
export const DELETE_DISTANCE = 'DELETE_DISTANCE'
export const SET_DISTANCES = 'SET_DISTANCES'
export const SET_DISTANCE_RECORD = 'SET_DISTANCE_RECORD'

export interface SetDistancesAction {
  type: typeof SET_DISTANCES
  payload: Array<Distance>
}

export interface DeleteDistanceAction {
  type: typeof DELETE_DISTANCE
  payload: Distance
}

export interface CreateDistanceAction {
  type: typeof CREATE_DISTANCE
  payload: Distance
}

export interface SetDistanceRecordAction {
  type: typeof SET_DISTANCE_RECORD
  payload: { time: string; distance: Distance }
}

export type DistanceActionTypes =
  | SetDistancesAction
  | DeleteDistanceAction
  | CreateDistanceAction
  | SetDistanceRecordAction
