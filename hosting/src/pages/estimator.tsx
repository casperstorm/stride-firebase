import React from 'react'

const calculateVDOT = (seconds: number, distance: number) => {
  const days = seconds / (3600 * 24)
  const percentageOfV02Max =
    0.8 +
    0.1894393 * Math.exp(-0.012778 * days * 1440) +
    0.2989558 * Math.exp(-0.1932605 * days * 1440)

  const vdot =
    (-4.6 +
      0.182258 * (distance / days / 1440) +
      0.000104 * Math.pow(distance / days / 1440, 2)) /
    percentageOfV02Max

  return vdot.toFixed(1)
}

const estimator: React.FC = () => (
  <>
    <p>{`vdot: ${calculateVDOT(900, 5000)}`}</p>
  </>
)

export default estimator
