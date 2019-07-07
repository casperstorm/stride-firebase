import { metersToMiles } from '../utils/distance'

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
    this.miles = metersToMiles(r.meters)
  }
}
