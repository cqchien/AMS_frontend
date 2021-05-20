import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import DrawerForm from '@/components/NewClass/Class';
import TableClass from '@/components/TableClass';
import HeaderLayout from '@/components/Header';
import styles from './ClassManagement.less';

@connect(({ admin, loading }) => ({
  fetchCurrentAdmin: loading.effects['admin/saveCurrentAdmin'],
  // visibleClass: admin.visibleCreateClass,
}))
class ClassManagement extends React.Component {
  state = { ClassID: '', visibleMergeClass: false };

  showDrawer = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/handleVisibleCreateClass',
      payload: true,
    });
  };

  showDrawerCreate = () => {
    const { dispatch } = this.props;
    this.setState({
      ClassID: '',
    });
    dispatch({
      type: 'admin/handleVisibleCreateClass',
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

  showClassID = ID => {
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
              {/* <FilterClasss /> */}
            </div>
            <div className={styles.applicationManagementHeader}>
              <Button
                style={{ transform: 'translate(6%,-270%)' }}
                type="primary"
                onClick={this.showDrawerCreate}
              >
                <PlusOutlined size="small" /> Create New Class
              </Button>
              <Button
                style={{ transform: 'translate(22%,-270%)' }}
                onClick={this.showAddModal}
                type="primary"
              >
                Import
              </Button>
            </div>
          </div>
          {/* <ClassModal
            {...this.state}
            cancel={() => this.setState({ modalAddVisible: false })}
            onReload={this.onReloadTable}
          /> */}

          {/* <MergeClass
            {...this.state}
            cancel={() => this.setState({ visibleMergeClass: false })}
          /> */}

          {visibleClass ? (
            <DrawerForm
              cancel={this.handleCancel}
              ClassID={this.state.ClassID}
              deleteID={this.handleHandleID}
            />
          ) : null}

          <TableClass onShowInfor={this.showDrawer} getClassID={this.showClassID} />
        </div>
      </>
    );
  }
}

export default ClassManagement;
