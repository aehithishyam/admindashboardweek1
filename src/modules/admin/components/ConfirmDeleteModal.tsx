import type { User } from '../types';

interface ConfirmDeleteModalProps {
  user: User;
  onConfirm: () => void;
  onCancel: () => void;
}

/* Confirmation modal for deleting a user */
function ConfirmDeleteModal({ user, onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h2 className="modal-title">Confirm Delete</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </header>
        <div className="modal-body">
          <p>
            Are you sure you want to delete <strong>{user.name}</strong>?
            This action cannot be undone.
          </p>
        </div>
        <footer className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
