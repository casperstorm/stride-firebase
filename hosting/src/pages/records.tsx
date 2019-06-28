import { Button } from 'antd'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import React from 'react'

const record = {
  meters: 5000,
  seconds: 1200,
  date: new Date(),
}

const clicked = async () => {
  const user = firebase.auth().currentUser
  if (!user) {
    throw new Error('No user')
  }

  const coll = await firebase
    .firestore()
    .collection('users')
    .doc(user.uid)
    .collection('records')

  await coll.add(record)
}

const records: React.FC = () => (
  <Button onClick={clicked} type="primary">
    Save record
  </Button>
)

export default records
