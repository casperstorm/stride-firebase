import { Button, Form, Icon, Input } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import React from 'react'

function hasErrors(fieldsError: any) {
  return Object.keys(fieldsError).some((field) => fieldsError[field])
}

interface Props {
  onSubmit: (values: { email: string; password: string }) => void
}

class LoginForm extends React.PureComponent<Props & FormComponentProps> {
  public render() {
    return this.form()
  }

  public handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values as { email: string; password: string })
      }
    })
  }

  private form = () => {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form

    // Only show error after a field is touched.
    const emailError = isFieldTouched('email') && getFieldError('email')
    const passwordError =
      isFieldTouched('password') && getFieldError('password')
    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item
          validateStatus={emailError ? 'error' : ''}
          help={emailError || ''}>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}>
            {`Log in`}
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create<Props & FormComponentProps>()(LoginForm)
