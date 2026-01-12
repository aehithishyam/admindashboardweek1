import { useState, useEffect } from 'react';
import type { User, UserFormData } from './types';
import { PAGE_SIZE } from './types';
import { usePagination } from './hooks';
import {
  UserTable,
  UserForm,
  ConfirmDeleteModal,
  Pagination,
  LoadingState,
  EmptyState,
  ErrorState,
} from './components';

interface UsersPageProps {
  users: User[];
  onAddUser: (userData: UserFormData) => void;
  onUpdateUser: (id: number, userData: UserFormData) => void;
  onDeleteUser: (id: number) => void;
}

/**
 * User management page with CRUD operations
 */
function UsersPage({ users, onAddUser, onUpdateUser, onDeleteUser }: UsersPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedUsers,
    goToPage
  } = usePagination(users, PAGE_SIZE);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateClick = () => {
    setEditingUser(null);
    setShowForm(true);
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDeleteClick = (user: User) => {
    setDeletingUser(user);
  };

  const handleFormSave = (userData: UserFormData) => {
    if (editingUser) {
      onUpdateUser(editingUser.id, userData);
    } else {
      onAddUser(userData);
    }
    setShowForm(false);
    setEditingUser(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingUser) {
      onDeleteUser(deletingUser.id);
      setDeletingUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingUser(null);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  if (isLoading) {
    return (
      <div>
        <h2 className="page-title">User Management</h2>
        <section className="card">
          <LoadingState />
        </section>
      </div>
    );
  }

  if (hasError) {
    return (
      <div>
        <h2 className="page-title">User Management</h2>
        <section className="card">
          <ErrorState message="Failed to load users" onRetry={handleRetry} />
        </section>
      </div>
    );
  }

  return (
    <div>
      <h2 className="page-title">User Management List</h2>
      <section className="card">
        <header className="card-header">
          <h3 className="card-title">Users</h3>
          <button className="btn btn-primary" onClick={handleCreateClick}>
            + Add User
          </button>
        </header>
        {users.length === 0 ? (
          <EmptyState message="No users found. Create your first user to get started." />
        ) : (
          <>
            <UserTable
              users={paginatedUsers}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              showActions
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </>
        )}
      </section>

      {showForm && (
        <UserForm
          user={editingUser}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      )}

      {deletingUser && (
        <ConfirmDeleteModal
          user={deletingUser}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}

export default UsersPage;
