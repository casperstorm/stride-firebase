import { Record } from '../entities/record'
import { AppState } from './store'

export const selectAllRecords = (state: AppState): Array<Record> => {
  const records = state.records.records
  return records
}
