import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'umi';
import styles from './AdminLayout.less';

const AdminLayout = (props) => {
  const { pathname } = window.location;
  const authority = localStorage.getItem('authority');
  if (pathname !== '/user/login' && (!authority || !authority.length)) {
    <Redirect to={'/user/login'} />;
  } else {
    <Redirect to={'/management/class'} />;
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
