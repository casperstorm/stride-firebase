import { Record } from '../../entities/record'
import { ACTION_TYPES } from '../actions'
export interface RecordsState {
  records: Array<Record>
}

const initialState: RecordsState = {
  records: [],
}

const records = (state: RecordsState = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_RECORDS: {
      return { ...state, records: action.payload.records }
    }
    default:
      return state
  }
}

export default records
