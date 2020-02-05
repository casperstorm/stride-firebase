import {
  DistanceActionTypes,
  DistanceState,
  PURGE_DISTANCES,
  SET_DISTANCES,
} from './types'

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
    case PURGE_DISTANCES: {
      return initialState
    }
    default:
      return state
  }
}

export default distances
