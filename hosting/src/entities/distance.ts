import { Record } from '../entities/record'
import { calculateEstimate } from '../utils/estimate'
import { calculateVDOT } from '../utils/vdot'

export interface Distance {
  name: string
  meters: number
}

export class Distance {
  public miles: number
  constructor(name: string, meters: number) {
    this.name = name
    this.meters = meters
    this.miles = meters / 1609.344
  }

  public vdot = (record: Record): number =>
    calculateVDOT(record.seconds, this.meters)

  public estimatedSeconds = (record: Record): number =>
    calculateEstimate(this, record)

  public estimatedPace = (record: Record): number => {
    const estimatedTime = this.estimatedSeconds(record)
    return (estimatedTime / this.meters) * 1000
  }
}
