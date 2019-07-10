import { Button, Table } from 'antd'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import NewDistance from '../components/new-distance'
import { Distance } from '../entities/distance'
import { createDistance } from '../state/distance/actions'
import * as selectors from '../state/selectors'
import { AppState } from '../state/store'
import { formatSeconds } from '../utils/time'

interface Props {
  distances: Array<Distance>
  bestDistance?: Distance
  createDistance: (distance: Distance) => void
}

interface State {
  visible: boolean
}

class Distances extends React.PureComponent<Props, State> {
  public state: State = { visible: false }

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
        if (!distance.record) {
          return '-'
        }

        return formatSeconds(distance.record.seconds)
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
  ]

  public showModal = () => {
    this.setState({
      visible: true,
    })
  }

  public handleOk = (distance: Distance) => {
    this.props.createDistance(distance)
    this.setState({
      visible: false,
    })
  }

  public handleCancel = (e: any) => {
    console.log(e)
    this.setState({
      visible: false,
    })
  }

  public render() {
    return (
      <>
        <Table
          size={'small'}
          bordered={true}
          pagination={false}
          rowKey="meters"
          dataSource={this.props.distances}
          columns={this.columns}
        />
        <br />
        <div>
          <Button type="primary" onClick={this.showModal}>
            Add new distance
          </Button>
          <NewDistance
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          />
        </div>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Distances)
