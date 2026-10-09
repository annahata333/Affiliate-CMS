import styles from "./ConfirmModal.module.css";

type ConFirmModalProps = {
  setConfirmModalOpen: (value: boolean) => void;
  deleteProduct: () => Promise<void>;
};

export default function ConfirmModal({
  setConfirmModalOpen,
  deleteProduct,
}: ConFirmModalProps) {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2 className={styles.title}>Delete product?</h2>

        <p className={styles.message}>
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>

        <div className={styles.actions}>
          <button className="cancel" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="delete"
            onClick={() => deleteProduct()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
