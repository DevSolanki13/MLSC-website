import { useEffect } from 'react';
import useFavorites from '../hooks/useFavorites';
import styles from './Toast.module.css';
import { FaCheckCircle, FaTrashAlt, FaTimes, FaUndo } from 'react-icons/fa';

const Toast = () => {
  const { toast, undoLastAction, clearToast, canUndo } = useFavorites();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      clearToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  const isRemove = toast.type === 'remove';

  return (
    <div className={styles.toastContainer} role="alert" aria-live="polite">
      <div className={styles.toastContent}>
        {isRemove ? (
          <FaTrashAlt className={`${styles.toastIcon} ${styles.removeIcon}`} />
        ) : (
          <FaCheckCircle className={`${styles.toastIcon} ${styles.addIcon}`} />
        )}
        <span className={styles.toastMessage}>{toast.message}</span>
      </div>

      {isRemove && canUndo && (
        <button
          className={styles.undoBtn}
          onClick={() => {
            undoLastAction();
          }}
          type="button"
        >
          <FaUndo style={{ marginRight: '4px' }} /> Undo
        </button>
      )}

      <button
        className={styles.closeBtn}
        onClick={clearToast}
        aria-label="Close notification"
        type="button"
      >
        <FaTimes size={14} />
      </button>
    </div>
  );
};

export default Toast;
