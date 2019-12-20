import React from 'react';
import styles from '../../assets/styles/components/loading.module.scss';

const Loading = () => {
  return (
    <>
      <div className={`${styles.loaderContainer}`}>
        <div className={`${styles.loader}`} />
      </div>
    </>
  );
};

export default Loading;
