import moment from 'moment'
import { metersToMiles } from '../utils/distance'

export interface IRecord {
  time: moment.Moment
}

export class Distance {
  public id: string
  public meters: number
  public miles: number
  public record: IRecord

  constructor(id: string, meters: number, record: IRecord) {
    this.id = id
    this.meters = meters
    this.miles = metersToMiles(meters)
    this.record = {
      time: moment(record.time ? record.time : '00:00:00', 'HH:mm:ss'),
    }
  }

  public vdot = (): number => {
    if (this.recordInSeconds() < 1) {
      return 0
    }

    const days: number = this.recordInSeconds() / (3600 * 24)
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

  public estimatedSecondsForDistance = (distance: Distance): number =>
    this.recordInSeconds() *
    Math.pow(metersToMiles(distance.meters) / metersToMiles(this.meters), 1.06)

  public estimatedKilometerPaceForDistance = (distance: Distance): number => {
    const estimatedSeconds = this.estimatedSecondsForDistance(distance)
    return (estimatedSeconds / distance.meters) * 1000
  }

  private recordInSeconds = (): number => {
    const hours = this.record.time.hours()
    const minutes = this.record.time.minutes()
    const seconds = this.record.time.seconds()
    return hours * 3600 + minutes * 60 + seconds
  }
}
