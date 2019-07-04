export const calculateVDOT = (seconds: number, meters: number): number => {
  const days: number = seconds / (3600 * 24)
  const percentageOfV02Max: number =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * days * 1440) +
    0.2989558 * Math.exp(-0.1932605 * days * 1440)

  const vdot: number =
    (-4.6 +
      0.182258 * (meters / days / 1440) +
      0.000104 * Math.pow(meters / days / 1440, 2)) /
    percentageOfV02Max

  return vdot
}
