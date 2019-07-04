import { calculateVDOT } from '../utils/vdot'

export interface Record {
  key: string
  seconds: number
  meters: number
  date: firebase.firestore.Timestamp
}

export class Record {
  constructor(r: Record) {
    this.key = r.key
    this.seconds = r.seconds
    this.meters = r.meters
    this.date = r.date
  }

  public vdot = (): number => calculateVDOT(this.seconds, this.meters)
}
