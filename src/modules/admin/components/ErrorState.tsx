interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

function ErrorState({ message = "Something went wrong", onRetry }: ErrorStateProps) {
  return (
    <div className="error-state">
      <div className="error-icon">⚠️</div>
      <h3 className="error-title">Error</h3>
      <p className="error-text">{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ marginTop: '1rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
