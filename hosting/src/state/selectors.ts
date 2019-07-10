import { Distance } from '../entities/distance'
import { AppState } from './store'

export const selectBestDistanceByVDOT = (state: AppState) => {
  const distances = state.distance.distances
  if (distances.length < 1) {
    return undefined
  }

  return distances.reduce((prev: Distance, current: Distance) =>
    prev.vdot() > current.vdot() ? prev : current
  )
}
