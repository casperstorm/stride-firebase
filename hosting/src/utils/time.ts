import moment from 'moment'

export const formatSeconds = (seconds: number, format?: string) =>
  moment.utc(seconds * 1000).format(format || 'HH:mm:ss')
