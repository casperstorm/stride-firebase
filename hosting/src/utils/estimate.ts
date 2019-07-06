import { Distance } from '../entities/distance'
import { Record } from '../entities/record'
import { metersToMiles } from './distance'

export const calculateEstimate = (distance: Distance, record: Record): number =>
  record.seconds *
  Math.pow(metersToMiles(distance.meters) / metersToMiles(record.meters), 1.06)
