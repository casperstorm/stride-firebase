import { Checkbox, Typography } from 'antd'
import { CheckboxChangeEvent } from 'antd/lib/checkbox'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { setOptions } from '../state/options/actions'
import { OptionsState } from '../state/options/types'
import { AppState } from '../state/store'

const { Text } = Typography

interface Props {
  setOptions: (options: OptionsState) => void
}

class Options extends React.PureComponent<Props> {
  public plainOptions = ['VDOT', 'Tags']

  public render() {
    return (
      <>
        <Text strong>Distance options</Text>
        <Checkbox.Group
          options={this.plainOptions}
          onChange={this.onCheckboxChange}
        />
      </>
    )
  }

  private onCheckboxChange = (checkedValues: Array<CheckboxValueType>) => {
    const options: OptionsState = {
      showVDOT: checkedValues.includes('VDOT'),
      showTags: checkedValues.includes('Tags'),
    }
    this.props.setOptions(options)
  }
}

const mapStateToProps = (state: AppState) => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOptions: (options: OptionsState) => dispatch(setOptions(options)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)
