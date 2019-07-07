import { metersToMiles } from '../utils/distance'

export interface Distance {
  name: string
  meters: number
}

export class Distance {
  public miles: number
  constructor(name: string, meters: number) {
    this.name = name
    this.meters = meters
    this.miles = metersToMiles(meters)
  }
}
