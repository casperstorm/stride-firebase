import { Button, Divider, Popconfirm, Table, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import NewDistance from '../components/new-distance'
import { Distance, IDistance, IRecord } from '../entities/distance'
import {
  createDistance,
  deleteDistance,
  setRecordForDistance,
} from '../state/distance/actions'
import * as selectors from '../state/selectors'
import { AppState } from '../state/store'
import { formatSeconds } from '../utils/time'

interface Props {
  distances: Array<Distance>
  bestDistance?: Distance
  createDistance: (distance: Distance) => void
  deleteDistance: (distance: Distance) => void
  setRecordForDistance: (time: string, distance: Distance) => void
}

interface State {
  newDistanceModalVisible: boolean
}

class Distances extends React.PureComponent<Props, State> {
  public state: State = {
    newDistanceModalVisible: false,
  }

  // TODO: Better typing with antd: https://ant.design/components/table/#Using-in-TypeScript
  public columns = [
    {
      title: 'Distance',
      dataIndex: 'meters',
      key: 'meters',
      render: (val: any) => {
        const meters = val as number
        return `${meters}m`
      },
    },
    {
      title: 'Pace/Km',
      key: 'speed',
      render: (val: any) => {
        const { bestDistance } = this.props
        if (!bestDistance) {
          return '-'
        }

        const distance = val as Distance
        const estimatedPace = bestDistance.estimatedKilometerPaceForDistance(
          distance
        )
        return formatSeconds(estimatedPace, 'mm:ss')
      },
    },
    {
      title: 'Estimated time',
      key: 'estimate',
      render: (val: any) => {
        const { bestDistance } = this.props
        if (!bestDistance) {
          return '-'
        }

        const distance = val as Distance
        const estimatedSeconds = bestDistance.estimatedSecondsForDistance(
          distance
        )
        return formatSeconds(estimatedSeconds)
      },
    },
    {
      title: 'Current record',
      key: 'current',
      render: (val: any) => {
        const distance = val as Distance
        return (
          <TimePicker
            allowClear={false}
            onChange={(time: moment.Moment, timeString: string) => {
              this.props.setRecordForDistance(timeString, distance)
            }}
            defaultValue={distance.record.time}
          />
        )
      },
    },
    {
      title: 'VDOT',
      key: 'vdot',
      render: (val: any) => {
        const distance = val as Distance
        const vdot = distance.vdot()
        if (vdot === 0) {
          return '-'
        }

        return vdot
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (val: any) => {
        const distance = val as Distance
        return (
          <span>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => this.handleDistanceDeleteClick(distance)}
              okText="Yes"
              cancelText="No">
              <Button type="danger" size={'small'}>
                Delete
              </Button>
            </Popconfirm>
          </span>
        )
      },
    },
  ]

  public handleDistanceDeleteClick = (distance: Distance) => {
    this.props.deleteDistance(distance)
  }

  public showNewDistanceModal = () => {
    this.setState({
      newDistanceModalVisible: true,
    })
  }

  public handleNewDistance = (distance: Distance) => {
    this.props.createDistance(distance)
    this.setState({
      newDistanceModalVisible: false,
    })
  }

  public handleCancel = (e: any) => {
    this.setState({
      newDistanceModalVisible: false,
    })
  }

  public render() {
    return (
      <>
        <Table
          size={'small'}
          bordered={true}
          pagination={false}
          rowKey="id"
          dataSource={this.props.distances}
          columns={this.columns}
        />
        <br />
        <div>
          <Button type="primary" onClick={this.showNewDistanceModal}>
            Add new distance
          </Button>
        </div>
        <NewDistance
          visible={this.state.newDistanceModalVisible}
          onOk={this.handleNewDistance}
          onCancel={this.handleCancel}
        />
      </>
    )
  }
}

const mapStateToProps = (state: AppState) => ({
  distances: selectors.selectSortedDistances(state),
  bestDistance: selectors.selectBestDistanceByVDOT(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDistance: (distance: Distance) => dispatch(createDistance(distance)),
  deleteDistance: (distance: Distance) => dispatch(deleteDistance(distance)),
  setRecordForDistance: (time: string, distance: Distance) =>
    dispatch(setRecordForDistance(time, distance)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Distances)
