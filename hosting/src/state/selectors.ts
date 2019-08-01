import _ from 'lodash'
import moment from 'moment'
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

export const selectBestDistanceByDifference = (
  state: AppState
): Distance | undefined => {
  const bestDistance = selectBestDistanceByVDOT(state)
  const distances = state.distance.distances
  if (!bestDistance) {
    return undefined
  }

  return _.maxBy(distances, (d) => {
    const estimatedSeconds = bestDistance.estimatedSecondsForDistance(d)
    const diff = d.record.duration.asSeconds() - estimatedSeconds
    return diff
  })
}
