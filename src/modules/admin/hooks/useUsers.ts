import { useState } from 'react';
import type { User, UserFormData } from '../types';
import { INITIAL_USERS } from '../types';

export function useUsers(
  onNotify?: (message: string, type: 'success' | 'error' | 'info') => void
) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  // Add user
  const addUser = (userData: UserFormData) => {
    const newId = users.length + 1;

    const newUser: User = {
      id: newId,
      ...userData,
    };

    setUsers([...users, newUser]);

    onNotify?.(`User "${userData.name}" added successfully`, 'success');
  };

  // Update user
  const updateUser = (id: number, userData: UserFormData) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, ...userData } : user
    );

    setUsers(updatedUsers);

    onNotify?.(`User "${userData.name}" updated successfully`, 'success');
  };

  // Delete user
  const deleteUser = (id: number) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    onNotify?.('User deleted successfully', 'success');
  };

  // User statistics
  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'Admin').length,
    managers: users.filter(u => u.role === 'Manager').length,
    regular: users.filter(u => u.role === 'User').length,
  };

  return {
    users,
    stats,
    addUser,
    updateUser,
    deleteUser,
  };
}
