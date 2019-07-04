import { calculateVDOT } from '../utils/vdot'
export interface Record {
  key: string
  seconds: number
  meters: number
  date: firebase.firestore.Timestamp
  vdot(): number
}

export class Record implements Record {
  constructor(data: {
    key: string
    seconds: number
    meters: number
    date: firebase.firestore.Timestamp
  }) {
    this.key = data.key
    this.seconds = data.seconds
    this.meters = data.meters
    this.date = data.date

    console.log(this.seconds)
  }

  public vdot = () => calculateVDOT(this.seconds, this.meters)
}
