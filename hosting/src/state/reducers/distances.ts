import { Distance } from '../../entities/distance'
import { ACTION_TYPES } from '../actions'
export interface DistancesState {
  distances: Array<Distance>
}

const initialState: DistancesState = {
  distances: [
    new Distance('Marathon', 42195),
    new Distance('1/2 Marathon', 21097.5),
    new Distance('10K', 10000),
    new Distance('5K', 5000),
    new Distance('3K', 3000),
  ],
}

const records = (state: DistancesState = initialState, action: any) => {
  switch (action.type) {
    default:
      return state
  }
}

export default records
