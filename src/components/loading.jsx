import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonHeader} />
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={styles.skeletonCard}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonTextTitle} />
            <div className={styles.skeletonTextBody} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
