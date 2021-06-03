import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FilterClass from '@/components/TableClass/FilterClass';
import TableClass from '@/components/TableClass';
import DrawerForm from '@/components/NewClass';
import HeaderLayout from '@/components/Header';
import styles from './ClassManagement.less';

@connect(({ classRoom }) => ({
  // fetchCurrentAdmin: loading.effects['user/saveCurrentAdmin'],
  visibleClass: classRoom.visibleCreateClass,
}))
class ClassManagement extends React.Component {
  state = { ClassID: '', visibleMergeClass: false };

  showDrawer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'classRoom/handleVisibleCreateClass',
      payload: true,
    });
  };

  showDrawerCreate = () => {
    const { dispatch } = this.props;
    this.setState({
      ClassID: '',
    });
    dispatch({
      type: 'classRoom/handleVisibleCreateClass',
      payload: true,
    });
  };

  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateClass',
      payload: false,
    });
  };

  showAddModal = () => {
    this.setState({
      modalAddVisible: true,
    });
  };

  showClassID = (ID) => {
    this.setState({
      ClassID: ID,
    });
  };

  handleHandleID = () => {
    this.setState({
      ClassID: '',
    });
  };

  mergeClass = () => {
    this.setState({
      visibleMergeClass: true,
    });
  };

  render() {
    const { visibleClass } = this.props;
    return (
      <>
        <div className={styles.wrapHeader}>
          <HeaderLayout page="Class-management" title="Class Management" />
        </div>
        <div className={styles.applicationManagementContainer}>
          <div className={styles.applicationHeader}>
            <div>
              <FilterClass />
            </div>
            <div className={styles.applicationManagementHeader}>
              <Button
                style={{ transform: 'translate(6%,-270%)' }}
                type="primary"
                onClick={this.showDrawerCreate}
              >
                <PlusOutlined size="small" /> New Class
              </Button>
            </div>
          </div>

          {visibleClass ? (
            <DrawerForm
              cancel={this.handleCancel}
              visibleClass={visibleClass}
              ClassID={this.state.ClassID}
              deleteID={this.handleHandleID}
            />
          ) : null}

          <TableClass />
        </div>
      </>
    );
  }
}

export default ClassManagement;
