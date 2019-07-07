import { Record } from '../entities/record'
import { calculateVDOT } from '../utils/vdot'
import { AppState } from './store'

export const selectBestRecordByVDOT = (state: AppState) => {
  const records = state.records.records
  if (records.length < 1) {
    return null
  }

  const record = records.reduce((prev: Record, current: Record) => {
    const p = calculateVDOT(prev.seconds, prev.meters)
    const c = calculateVDOT(current.seconds, current.meters)
    return p > c ? prev : current
  })

  return record
}
