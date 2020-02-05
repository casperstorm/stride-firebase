import { Checkbox, Typography } from 'antd'
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
  showVDOT: boolean
  showTags: boolean
}

class Options extends React.PureComponent<Props> {
  public plainOptions = ['VDOT', 'Tags']

  public render() {
    const { showVDOT, showTags } = this.props
    const defaultValues = []
    if (showTags) {
      defaultValues.push('Tags')
    }

    if (showVDOT) {
      defaultValues.push('VDOT')
    }

    return (
      <>
        <Text strong>Distance options</Text>
        <Checkbox.Group
          defaultValue={defaultValues}
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

const mapStateToProps = (state: AppState) => ({
  showVDOT: state.options.showVDOT,
  showTags: state.options.showTags,
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setOptions: (options: OptionsState) => dispatch(setOptions(options)),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)
