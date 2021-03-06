import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button } from 'antd';
import styles from './index.less';

@connect()
class AdminSignIn extends React.Component {
  formRef = React.createRef();

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: values,
    });
  };

  render() {
    return (
      <div className={styles.rectangle}>
        <div className={styles.appName}>
          <p style={{ marginBottom: '0' }}>Apollo</p>
        </div>
        <Form
          id="admin-login-form"
          className={styles.loginForm}
          onFinish={this.handleSubmit}
          ref={this.formRef}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              form="admin-login-form"
              type="primary"
              htmlType="submit"
              className={styles.loginButton}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AdminSignIn;
