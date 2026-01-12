import type { User } from '../types';

interface UserRowProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  showActions?: boolean;
}

function UserRow({ user, onEdit, onDelete, showActions = true }: UserRowProps) {
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'role-badge admin';
      case 'Manager':
        return 'role-badge manager';
      default:
        return 'role-badge user';
    }
  };

  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>{user.proficiency}</td>
      <td>
        <span className={getRoleBadgeClass(user.role)}>{user.role}</span>
      </td>
      <td>{user.status}</td>
      <td>₹{user.salary.toLocaleString()}</td>
      {showActions && (
        <td>
          <div className="table-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => onEdit?.(user)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete?.(user)}>
              Delete
            </button>
          </div>
        </td>
      )}
    </tr>
  );
}

export default UserRow;
