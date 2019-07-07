import { Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Distance } from '../entities/distance'
import { Record } from '../entities/record'
import * as selectors from '../state/selectors'
import { AppState } from '../state/store'
import {
  calculateEstimatedKilometerPace,
  calculateEstimatedSeconds,
} from '../utils/estimate'
import { formatSeconds } from '../utils/time'

interface Props {
  distances: Array<Distance>
  records: Array<Record>
  bestRecord?: Record
}

class Estimator extends React.PureComponent<Props, {}> {
  public columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Pace/Km',
      key: 'speed',
      render: (val: any) => {
        const { bestRecord } = this.props
        if (!bestRecord) {
          return '-'
        }

        const distance = val as Distance
        const estimatedPace = calculateEstimatedKilometerPace(
          distance,
          bestRecord
        )
        return formatSeconds(estimatedPace, 'mm:ss')
      },
    },
    {
      title: 'Estimated time',
      key: 'estimate',
      render: (val: any) => {
        const { bestRecord } = this.props
        if (!bestRecord) {
          return '-'
        }

        const distance = val as Distance
        const estimatedSeconds = calculateEstimatedSeconds(distance, bestRecord)
        return formatSeconds(estimatedSeconds)
      },
    },
    {
      title: 'Current time',
      key: 'current',
      render: (val: any) => {
        const { records } = this.props
        if (records.length < 1) {
          return '-'
        }

        const distance = val as Distance
        const record = records.find((r: Record) => r.meters === distance.meters)
        if (!record) {
          return '-'
        }

        return formatSeconds(record.seconds)
      },
    },
  ]

  public render() {
    return (
      <Table
        rowKey="name"
        dataSource={this.props.distances}
        columns={this.columns}
      />
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  distances: state.distances.distances,
  bestRecord: selectors.selectBestRecordByVDOT(state),
  records: state.records.records,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Estimator)
