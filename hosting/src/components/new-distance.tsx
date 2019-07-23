import { InputNumber, Modal, Typography } from 'antd'
import React from 'react'
import { Distance, IDistance } from '../entities/distance'

const { Text } = Typography

interface Props {
  visible: boolean
  confirmLoading?: boolean
  onCancel?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onOk: (distance: Distance) => void
}

interface State {
  meters: number
}

class NewDistance extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      meters: 0,
    }
  }
  public render() {
    const submitButtonDisabled = this.submitButtonDisabled()

    return (
      <Modal
        title="New distance"
        visible={this.props.visible}
        onOk={this.handleOk}
        confirmLoading={this.props.confirmLoading}
        onCancel={this.props.onCancel}
        okButtonProps={{ disabled: submitButtonDisabled }}>
        <Text>{`Input distance in meters`}</Text>
        <InputNumber
          onChange={(meters?: number) => this.onMetersChange(meters)}
          style={{ width: '100%' }}
          placeholder="5000m"
        />
      </Modal>
    )
  }

  private submitButtonDisabled = (): boolean => {
    const { meters } = this.state
    if (meters && meters > 0) {
      return false
    }

    return true
  }

  private handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { meters } = this.state
    if (!meters) {
      return
    }

    const distance: Distance = new Distance(({
      meters,
    } as unknown) as IDistance)
    this.props.onOk(distance)
  }

  private onMetersChange = (meters?: number) => {
    this.setState({
      meters: meters ? meters : 0,
    })
  }
}

export default NewDistance
