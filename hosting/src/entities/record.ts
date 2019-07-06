import { calculateVDOT } from '../utils/vdot'

export interface Record {
  key: string
  seconds: number
  meters: number
  date: firebase.firestore.Timestamp
}

export class Record {
  public miles: number

  constructor(r: Record) {
    this.key = r.key
    this.seconds = r.seconds
    this.meters = r.meters
    this.date = r.date
    this.miles = r.meters / 1609.344
  }

  public vdot = (): number => calculateVDOT(this.seconds, this.meters)
}
