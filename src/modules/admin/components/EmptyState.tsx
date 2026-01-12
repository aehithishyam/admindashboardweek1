interface EmptyStateProps {
  message?: string;
}

function EmptyState({ message = "No data available" }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-icon">📭</div>
      <p className="empty-text">{message}</p>
    </div>
  );
}

export default EmptyState;
