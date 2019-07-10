import _ from 'lodash'
import { Distance } from '../entities/distance'
import { AppState } from './store'

export const selectBestDistanceByVDOT = (
  state: AppState
): Distance | undefined => {
  const distances = state.distance.distances
  if (distances.length < 1) {
    return undefined
  }

  return distances.reduce((prev: Distance, current: Distance) =>
    prev.vdot() > current.vdot() ? prev : current
  )
}

export const selectSortedDistances = (state: AppState): Array<Distance> => {
  const distances = state.distance.distances
  return _.sortBy(distances, 'meters')
}
