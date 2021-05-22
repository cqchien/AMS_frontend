import React from 'react';
import { Table, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import ActionContact from './ActionContact';

const { Column } = Table;
@connect(({ admin, loading }) => {
  return {
    // listContact: admin.contact,
    // listContactMerge: admin.listContactMerge,
    // tags: admin.tags,
    // isLoadingTableContact: loading.effects['admin/queryContacts'],
    // isLoadingTags: loading.effects['admin/getAllTags'],
    // isLoadingSearchContact: loading.effects['admin/searchContact'],
    // isLoadingGetAllContacts: loading.effects['admin/getAllContacts'],
    // currentState: admin.currentState,
    // totalContact: admin.totalContact,
  };
})
class TableContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skip: 1,
      PAGE_SIZE: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'admin/queryContacts',
    //   payload: {
    //     search: '',
    //     status: this.props.currentState,
    //     skip: this.state.skip,
    //     limit: this.state.PAGE_SIZE,
    //   },
    // });
  }

  search = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/searchContact',
      payload: {
        keyword: e.target.value,
        status: this.state.currentState,
      },
    });
  };

  handleClickRow = (id) => {
    this.props.onShowInfor();
    this.props.getContactID(id);
  };

  confirmDelete = (record) => {
    const { dispatch } = this.props;
    const values = { status: 'ARCHIVE' };
    const data = { values, id: record.id };
    dispatch({ type: 'admin/updateContactStatus', payload: data })
      .then((response) => {
        if (response.type && response.type === 'HttpError') {
          message.error(`Failed to archive contact`);
        } else {
          message.success(`Successfully`);
        }
      })
      .catch((error) => {
        message.error(`${error.message}`);
      });
  };

  onChangePaging = (page) => {
    const { dispatch } = this.props;
    this.setState({
      skip: page,
    });
    dispatch({
      type: 'admin/queryContacts',
      payload: {
        search: '',
        status: this.props.currentState,
        skip: page,
        limit: this.state.PAGE_SIZE,
      },
    });
  };

  render() {
    const listClass = [
      {
        "id": "b131c259-7d80-48df-96cb-e9f7ed064b5b",
        "createdAt": "2021-05-03T02:27:27.448Z",
        "updatedAt": "2021-05-03T02:27:27.448Z",
        "deletedAt": null,
        "courseCode": "MIS242.CTTT.L21",
        "type": "THEORY",
        "desc": "string",
        "room": "E4.1",
        "startTime": "2021-03-04T17:00:00.000Z",
        "endTime": "2021-05-04T17:00:00.000Z",
        "qrCode": null,
        "teacher": {
          "name": "Cao Chien"
        }
      },
    ]
    const listClassToRender = listClass.map((classRoom) => ({ ...classRoom, key: classRoom.id }));
    return (
      <div>
        <div>
          <Table
            dataSource={listClassToRender}
            // pagination={{
            //   current: this.state.skip,
            //   pageSize: this.state.PAGE_SIZE,
            //   total: totalContact,
            //   onChange: this.onChangePaging,
            // }}
            bordered
            // loading={
            //   this.props.isLoadingTags ||
            //   this.props.isLoadingTableContact ||
            //   this.props.isLoadingGetAllContacts
            // }
          >
            <Column
              width={250}
              title="Course Code"
              dataIndex="courseCode"
              key="courseCode"
              // render={(text, record) => (
              //   <a onClick={() => this.handleClickRow(record.id)}>{text}</a>
              // )}
            />
            <Column title="Room" dataIndex="room" key="room" />
            <Column title="Type" dataIndex="type" key="type" />
            <Column title="Teacher" dataIndex={['teacher', 'name']} key="teacher" />
            <Column
              title="Start Time"
              dataIndex="startTime"
              key="startTime"
              sorter={(firstDate, secondDate) => {
                return moment(firstDate.startTime) - moment(secondDate.startTime);
              }}
              sortDirections={['descend', 'ascend']}
              render={(date) => <span>{moment(date).format('DD/MM/YYYY')}</span>}
            />
            <Column
              title="End Time"
              dataIndex="endTime"
              key="endTime"
              sorter={(firstDate, secondDate) => {
                return moment(firstDate.endTime) - moment(secondDate.endTime);
              }}
              sortDirections={['descend', 'ascend']}
              render={(date) => <span>{moment(date).format('DD/MM/YYYY')}</span>}
            />
            
            
            
          </Table>
        </div>
      </div>
    );
  }
}

export default TableContact;
