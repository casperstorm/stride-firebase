import { metersToMiles } from '../utils/distance'

export interface Record {
  seconds: number
  date: firebase.firestore.Timestamp
}

export interface DistanceProperties {
  meters: number
  record?: Record
}

export class Distance {
  public miles: number
  public meters: number
  public record?: Record

  constructor(d: DistanceProperties) {
    this.meters = d.meters
    this.record = d.record
    this.miles = metersToMiles(d.meters)
  }

  public vdot = (): number => {
    if (!this.record) {
      return 0
    }

    const { seconds } = this.record
    const days: number = seconds / (3600 * 24)
    const percentageOfV02Max: number =
      0.8 +
      0.1894393 * Math.exp(-0.012778 * days * 1440) +
      0.2989558 * Math.exp(-0.1932605 * days * 1440)

    const vdot: number =
      (-4.6 +
        0.182258 * (this.meters / days / 1440) +
        0.000104 * Math.pow(this.meters / days / 1440, 2)) /
      percentageOfV02Max

    return vdot
  }

  public estimatedSecondsForDistance = (distance: Distance): number => {
    if (!this.record) {
      return 0
    }
    return (
      this.record.seconds *
      Math.pow(
        metersToMiles(distance.meters) / metersToMiles(this.meters),
        1.06
      )
    )
  }

  public estimatedKilometerPaceForDistance = (distance: Distance): number => {
    const estimatedSeconds = this.estimatedSecondsForDistance(distance)
    return (estimatedSeconds / distance.meters) * 1000
  }
}
