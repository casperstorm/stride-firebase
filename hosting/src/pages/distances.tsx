import { Button, Popconfirm, Table, Tag, TimePicker } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import NewDistance from '../components/new-distance'
import { Distance } from '../entities/distance'
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
  bestDistanceByVDOT?: Distance
  bestDistanceByDifference?: Distance
  createDistance: (meters: number) => void
  deleteDistance: (distance: Distance) => void
  setRecordForDistance: (seconds: number, distance: Distance) => void
  showVDOTColumn: boolean
  showTagsColumn: boolean
}

interface State {
  newDistanceModalVisible: boolean
}

class Distances extends React.PureComponent<Props, State> {
  public state: State = {
    newDistanceModalVisible: false,
  }

  public handleDistanceDeleteClick = (distance: Distance) => {
    this.props.deleteDistance(distance)
  }

  public showNewDistanceModal = () => {
    this.setState({
      newDistanceModalVisible: true,
    })
  }

  public handleNewDistance = (meters: number) => {
    this.props.createDistance(meters)
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
        <Table<Distance>
          rowKey={`id`}
          size={'small'}
          pagination={false}
          dataSource={this.props.distances}
          columns={this.constructTableColumns()}
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
  private constructTableColumns = (): Array<ColumnProps<Distance>> => {
    const { showTagsColumn, showVDOTColumn } = this.props
    const columns: Array<ColumnProps<Distance>> = []

    columns.push({
      title: 'Distance',
      dataIndex: 'meters',
      key: 'meters',
      render: (text: unknown, record: Distance, index: number) =>
        `${record.meters}m`,
    })

    columns.push({
      title: 'Pace/Km',
      key: 'speed',
      render: (text: unknown, record: Distance, index: number) => {
        const { bestDistanceByVDOT } = this.props
        if (!bestDistanceByVDOT) {
          return '-'
        }
        const estimatedPace = bestDistanceByVDOT.estimatedKilometerPaceForDistance(
          record
        )
        return formatSeconds(estimatedPace, 'mm:ss')
      },
    })

    columns.push({
      title: 'Estimated time',
      key: 'estimate',
      render: (text: unknown, record: Distance, index: number) => {
        const { bestDistanceByVDOT } = this.props
        if (!bestDistanceByVDOT) {
          return '-'
        }

        const estimatedSeconds = bestDistanceByVDOT.estimatedSecondsForDistance(
          record
        )
        return formatSeconds(estimatedSeconds)
      },
    })

    columns.push({
      title: 'Current record',
      key: 'current',
      render: (text: unknown, record: Distance, index: number) => (
        <TimePicker
          allowClear={false}
          onChange={(time: moment.Moment, timeString: string) => {
            this.props.setRecordForDistance(
              moment.duration(timeString).asSeconds(),
              record
            )
          }}
          defaultValue={moment.utc(record.record.duration.as('milliseconds'))}
        />
      ),
    })

    if (showTagsColumn) {
      columns.push({
        title: 'Tags',
        key: 'tags',
        render: (text: unknown, record: Distance, index: number) => {
          const { bestDistanceByVDOT, bestDistanceByDifference } = this.props
          const tags = []
          if (bestDistanceByVDOT && bestDistanceByVDOT.id === record.id) {
            tags.push(<Tag color="green">{`Best record`}</Tag>)
          }

          if (
            bestDistanceByDifference &&
            bestDistanceByDifference.id === record.id
          ) {
            tags.push(<Tag color="orange">{`Weakest record`}</Tag>)
          }

          if (record.record.duration.asSeconds() === 0) {
            tags.push(<Tag>{`No record`}</Tag>)
          }

          return tags
        },
      })
    }

    if (showVDOTColumn) {
      columns.push({
        title: 'VDOT',
        key: 'vdot',
        render: (text: unknown, record: Distance, index: number) => {
          const vdot = record.vdot()
          if (vdot === 0) {
            return '-'
          }

          return vdot.toFixed(1)
        },
      })
    }

    columns.push({
      title: 'Action',
      key: 'action',
      render: (text: unknown, record: Distance, index: number) => (
        <span>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => this.handleDistanceDeleteClick(record)}
            okText="Yes"
            cancelText="No">
            <Button type="danger" size={'small'}>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    })

    return columns
  }
}

const mapStateToProps = (state: AppState) => ({
  distances: selectors.selectSortedDistances(state),
  bestDistanceByVDOT: selectors.selectBestDistanceByVDOT(state),
  bestDistanceByDifference: selectors.selectBestDistanceByDifference(state),
  showVDOTColumn: state.options.showVDOT,
  showTagsColumn: state.options.showTags,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createDistance: (meters: number) => dispatch(createDistance(meters)),
  deleteDistance: (distance: Distance) => dispatch(deleteDistance(distance)),
  setRecordForDistance: (seconds: number, distance: Distance) =>
    dispatch(setRecordForDistance(seconds, distance)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Distances)
