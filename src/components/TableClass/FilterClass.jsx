import React from 'react';
import { Input, Radio } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ admin, loading }) => {
  return {
    // listContact: admin.contact,
    // listContactMerge: admin.listContactMerge,
    // tags: admin.tags,
    // isLoadingTableContact: loading.effects['admin/queryContacts'],
    // isLoadingTags: loading.effects['admin/getAllTags'],
    // isLoadingSearchContact: loading.effects['admin/searchContact'],
    // currentState: admin.currentState,
  };
})
class FilterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  search = (e) => {
    const { dispatch, currentState } = this.props;
    if (currentState === 'Duplicate') {
      dispatch({
        type: 'admin/getContactMerge',
        payload: {
          search: e.target.value,
        },
      });
    } else {
      dispatch({
        type: 'admin/queryContacts',
        payload: {
          search: e.target.value,
          skip: 1,
          limit: 10,
          status: currentState,
        },
      });
    }
  };

  onChangeFilterContact = (e) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'admin/queryContacts',
      payload: {
        search: '',
        status: e.target.value,
        skip: 1,
        limit: 10,
      },
    });
    dispatch({
      type: 'admin/currentState',
      payload: e.target.value,
    });
  };

  render() {
    const { currentState } = this.props;

    return (
      <div style={{ display: 'flex' }}>
        <Input.Search
          allowClear
          placeholder="Search by Email or Course Code"
          onPressEnter={this.search}
          className={styles.search}
          style={{ width: '416px' , marginRight: '20px'}}
          // loading={this.props.isLoadingSearchContact}
        />
        <Radio.Group
          style={{ display: 'flex' }}
          value={currentState}
          onChange={this.onChangeFilterContact}
        >
          <Radio.Button className={styles.btnFilter} value="ACTIVE">
            Active
          </Radio.Button>
          <Radio.Button className={styles.btnFilter} value="FINISH">
            Finish
          </Radio.Button>
          <Radio.Button className={styles.btnFilter} value="">
            All
          </Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default FilterClass;
