import { Table } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Record } from '../entities/record'
import * as ACTIONS from '../state/actions'
import * as selectors from '../state/selectors'
import { AppState } from '../state/store'

interface Props {
  user?: firebase.User
  records: Array<Record>
  setRecords: (records: Array<Record>) => void
}

class Records extends React.PureComponent<Props, {}> {
  public documentRef?: firebase.firestore.DocumentReference
  public observer?: () => void

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

  constructor(props: Props) {
    super(props)

    const { user } = this.props
    if (!user) {
      return
    }

    this.documentRef = firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
  }

  public componentDidMount = async () => {
    if (!this.documentRef) {
      return
    }

    this.observer = this.documentRef
      .collection('records')
      .onSnapshot(this.onRecordsUpdate)
  }

  public componentWillUnmount() {
    if (this.observer) {
      this.observer()
    }
  }

  public render() {
    const { records } = this.props
    console.log(records)
    return <Table rowKey="key" dataSource={records} columns={this.columns} />
  }

  private onRecordsUpdate = (snapshot: firebase.firestore.QuerySnapshot) => {
    const records: Array<Record> = []
    snapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const rawRecord = doc.data() as Record
      const data = { ...rawRecord, key: doc.id }
      const record: Record = new Record(data)
      records.push(record)
    })

    this.props.setRecords(records)
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  records: selectors.selectAllRecords(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setRecords: (records: Array<Record>) => dispatch(ACTIONS.setRecords(records)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records)
