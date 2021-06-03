import React from 'react';
import { Drawer, Form, Input, Tooltip, Select, Button, Radio, Spin } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash/debounce';
import style from './class.less';
// import LinkedContact from '../LinkedContact';

const { TextArea } = Input;
const { Option } = Select;

@connect((state) => {
  return {};
})
class ClassForm extends React.Component {
  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.fetchContactsByFullName = debounce(this.fetchContactsByFullName, 500);
  }

  componentDidMount() {
    // const { dispatch, listContact } = this.props;
    // const search = listContact.find(contact => contact.id === this.props.contactID);
    // dispatch({ type: 'admin/getAllContacts' });
    // dispatch({ type: 'admin/getAllTags' });
    // dispatch({
    //   type: 'admin/fetchFilteredContactsByFullName',
    //   payload: {
    //     search: search?.referrer?.fullName,
    //     status: '',
    //     skip: 1,
    //     limit: 20,
    //   },
    // });
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const newValues = { ...values, status: 'ACTIVE' };
    if (this.props.contactID) {
      const data = { newValues, id: this.props.contactID };
      dispatch({
        type: 'admin/updateContact',
        payload: data,
      });
    } else {
      dispatch({
        type: 'admin/sendNewContact',
        payload: newValues,
      });
    }
  };

  fetchContactsByFullName = (textSearch) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/fetchFilteredContactsByFullName',
      payload: {
        search: textSearch,
        status: '',
        skip: 1,
        limit: 20,
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
    const contact = [];
    console.log(visibleClass);
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
              label={
                <span>
                  Full Name&nbsp;
                  <Tooltip title="What do you want others to call you?" />
                </span>
              }
              name="name"
              rules={[{ required: true, message: 'Please input your full name' }]}
              initialValue={contact ? contact.fullName : null}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              initialValue={contact ? contact.phone : null}
              rules={[
                {
                  required: true,
                  message: 'Please input your phone!',
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                  message: 'Invalid phone number',
                },
              ]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
              initialValue={contact ? contact.email : null}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Other Channel"
              name="otherChannel"
              initialValue={contact ? contact.otherChannel : null}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Gender"
              name="gender"
              initialValue={contact ? contact.gender : 'MALE'}
            >
              <Radio.Group>
                <Radio value="MALE">Male</Radio>
                <Radio value="FEMALE">Female</Radio>
                <Radio value="OTHER">Other</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Source Notes"
              name="referrerNotes"
              initialValue={contact ? contact.referrerNotes : null}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              label="General Notes"
              name="notes"
              initialValue={contact ? contact.notes : null}
            >
              <TextArea />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <div>
                <Button onClick={this.handleCancel} className={style.buttonCancel}>
                  Cancel
                </Button>
                {this.props.contactID ? (
                  <Button type="primary" htmlType="submit" >
                    Update contact
                  </Button>
                ) : (
                  <Button type="primary" htmlType="submit" >
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
