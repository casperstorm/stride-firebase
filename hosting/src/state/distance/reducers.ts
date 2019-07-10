import { Distance } from '../../entities/distance'
import { DistanceActionTypes, DistanceState, SET_DISTANCES } from './types'

const initialState: DistanceState = {
  distances: [],
}

const distances = (
  state: DistanceState = initialState,
  action: DistanceActionTypes
): DistanceState => {
  switch (action.type) {
    case SET_DISTANCES: {
      return { ...state, distances: action.payload }
    }
    default:
      return state
  }
}

export default distances
