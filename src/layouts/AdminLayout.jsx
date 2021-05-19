import React from 'react';
import { connect } from 'dva';
import styles from './AdminLayout.less';

const AdminLayout = (props) => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = '/management/class';
  }

  const { children } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header} />
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default connect(({ settings }) => ({ ...settings }))(AdminLayout);
