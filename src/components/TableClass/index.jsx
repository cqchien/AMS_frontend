import React from 'react';
import { Table, message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const { Column } = Table;
@connect(({ classRoom, loading }) => {
  return {
    listClasses: classRoom.classRooms,
    metaPaging: classRoom.meta,
    isLoadingTableClass: loading.effects['classRoom/getAllClasses'],
  };
})
class TableContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'ASC',
      page: 1,
      take: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'classRoom/getAllClasses',
      payload: {
        order: this.state.order,
        page: this.state.page,
        take: this.state.take,
        isFinish: false,
      },
    });
  }

  // search = (e) => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'class/getAllClasses',
  //     payload: {
  //       keyword: e.target.value,
  //       status: this.state.currentState,
  //     },
  //   });
  // };

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

  onChangePaging = (currenPage) => {
    const { dispatch } = this.props;
    this.setState({
      page: currenPage,
    });
    dispatch({
      type: 'classRoom/getAllClasses',
      payload: {
        order: this.state.order,
        page: currenPage,
        take: this.state.take,
        isFinish: false,
      },
    });
  };

  handleData = (classes) => {
    const classRooms = classes.map((classRoom) => ({ ...classRoom, key: classRoom.id }));
    return classRooms.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );

  };

  render() {
    const { listClasses, metaPaging } = this.props;
    const listClassToRender = this.handleData(listClasses);
    return (
      <div>
        <div>
          <Table
            dataSource={listClassToRender}
            pagination={{
              current: this.state.page,
              pageSize: this.state.take,
              total: metaPaging?.itemCount,
              onChange: this.onChangePaging,
            }}
            bordered
            loading={this.props.isLoadingTableClass}
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
                return -moment(firstDate.updatedAt) + moment(secondDate.updatedAt);
              }}
              sortDirections={['ascend', 'descend']}
              render={(date) => <span>{moment(date).format('DD/MM/YYYY')}</span>}
            />
            <Column
              title="End Time"
              dataIndex="endTime"
              key="endTime"
              sorter={(firstDate, secondDate) => {
                return -moment(firstDate.updatedAt) + moment(secondDate.updatedAt);
              }}
              sortDirections={['ascend', 'descend']}
              render={(date) => <span>{moment(date).format('DD/MM/YYYY')}</span>}
            />
          </Table>
        </div>
      </div>
    );
  }
}

export default TableContact;
