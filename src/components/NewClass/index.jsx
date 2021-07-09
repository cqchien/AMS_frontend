import React from 'react';
import { Drawer, Form, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import style from './class.less';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

@connect(({ loading }) => ({
  isCreateClass: loading.effects['classRoom/createNewClass'],
}))
class ClassForm extends React.Component {
  formRef = React.createRef();

  componentDidMount() {
    // const { dispatch, listContact } = this.props;
    // dispatch({ type: 'admin/getAllContacts' });
    // dispatch({ type: 'admin/getAllTags' });
    // dispatch({
    //   type: 'admin/fetchFilteredContactsByFullName',
    //      // const search = listContact.find(contact => contact.id === this.props.contactID);
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const formValues = { ...values };

    dispatch({
      type: 'classRoom/createNewClass',
      payload: {
        ...formValues,
        startTime: moment(formValues.startTime).format('MM/DD/YYYY'),
        endTime: moment(formValues.endTime).format('MM/DD/YYYY'),
      },
    });
  };

  handleCancel = () => {
    this.formRef.current.resetFields();
    const { dispatch } = this.props;
    dispatch({
      type: 'classRoom/handleVisibleCreateClass',
      payload: false,
    });
  };

  filter = (inputValue, path) => {
    return path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
  };

  render() {
    const { visibleClass } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <>
        <Drawer
          title=" Create New Class "
          width={720}
          onClose={this.handleCancel}
          visible={visibleClass}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            />
          }
        >
          <Form {...formItemLayout} ref={this.formRef} onFinish={this.handleSubmit}>
            <Form.Item
              label="Course Code"
              name="courseCode"
              rules={[{ required: true, message: 'Please input your full name' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Room"
              name="room"
              rules={[
                {
                  required: true,
                  message: 'Please input your room!',
                },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="type"
              label="Type"
              rules={[
                {
                  required: true,
                },
              ]}
              initialValue={'THEORY'}
            >
              <Select style={{ width: '100%' }}>
                <Option value={'THEORY'}>Theory</Option>
                <Option value={'PRACTICE'}>Practice</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Start Time"
              name="startTime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="End Time"
              name="endTime"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item name="teacherId" label="Teacher" initialValue={''}>
              <Select style={{ width: '100%' }}>
                <Option value={'THEORY'}>Theory</Option>
                <Option value={'PRACTICE'}>Practice</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Description" name="desc" initialValue={''}>
              <TextArea />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <div>
                <Button onClick={this.handleCancel} className={style.buttonCancel}>
                  Cancel
                </Button>
                {this.props.contactID ? (
                  <Button type="primary" htmlType="submit">
                    Update contact
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit" loading={this.props.isCreateClass}>
                    Create contact
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        </Drawer>
      </>
    );
  }
}

export default ClassForm;
