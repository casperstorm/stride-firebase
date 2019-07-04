import { Table } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Record } from '../entities/record'
import * as selectors from '../state/selectors'
import { AppState } from '../state/store'

interface Props {
  records: Array<Record>
}

class Records extends React.PureComponent<Props, {}> {
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
      title: 'Time',
      dataIndex: 'seconds',
      key: 'seconds',
      render: (val: any) => {
        const seconds = val as number
        return moment.utc(seconds * 1000).format('HH:mm:ss')
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (val: any) => {
        const date = val as firebase.firestore.Timestamp
        return date.toDate().toDateString()
      },
    },
    {
      title: 'VDOT',
      dataIndex: 'vdot',
      key: 'vdot',
      render: (val: any) => {
        const vdot = val as () => number
        return vdot()
      },
    },
  ]

  public render() {
    const { records } = this.props
    return <Table rowKey="key" dataSource={records} columns={this.columns} />
  }
}

const mapStateToProps = (state: AppState) => ({
  records: selectors.selectAllRecords(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records)
