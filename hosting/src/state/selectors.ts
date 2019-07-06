import { Record } from '../entities/record'
import { AppState } from './store'

export const selectBestRecordByVDOT = (state: AppState) => {
  const records = state.records.records
  if (records.length < 1) {
    return null
  }

  const record = records.reduce((prev: Record, current: Record) =>
    prev.vdot() > current.vdot() ? prev : current
  )

  return record
}
