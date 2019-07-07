import { Distance } from '../entities/distance'
import { Record } from '../entities/record'
import { metersToMiles } from './distance'

export const calculateEstimatedSeconds = (
  distance: Distance,
  record: Record
): number =>
  record.seconds *
  Math.pow(metersToMiles(distance.meters) / metersToMiles(record.meters), 1.06)

export const calculateEstimatedKilometerPace = (
  distance: Distance,
  record: Record
): number => {
  const estimatedSeconds = calculateEstimatedSeconds(distance, record)
  return (estimatedSeconds / distance.meters) * 1000
}
