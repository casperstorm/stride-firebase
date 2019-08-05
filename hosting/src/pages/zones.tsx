import { Checkbox, Typography } from 'antd'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setOptions } from '../state/options/actions'
import { OptionsState } from '../state/options/types'
import { AppState } from '../state/store'

const { Text } = Typography

// interface Props {}

class Zones extends React.PureComponent<{}> {
  public render() {
    return 'hi zones'
  }
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Zones)
