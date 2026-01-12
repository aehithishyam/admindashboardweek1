import type { User } from '../types';
import UserRow from './UserRow';

interface UserTableProps {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  showActions?: boolean;
}

/**Table displaying user list with edit/delete actions */
function UserTable({
  users,
  onEdit,
  onDelete,
  showActions = true,
}: UserTableProps) {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Proficiency</th>
            <th>Role</th>
            <th>Status</th>
            <th>Salary</th>
            {showActions && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <UserRow
              key={user.id}
              user={user}
              onEdit={onEdit}
              onDelete={onDelete}
              showActions={showActions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
