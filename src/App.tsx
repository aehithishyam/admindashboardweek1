import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Notification from './components/Notification';
import { DashboardPage, UsersPage, useUsers } from './modules/admin';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';

interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  const { users, addUser, updateUser, deleteUser } = useUsers(showNotification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Dashboard Environment';
      case 'users':
        return 'User Management';
      default:
        return 'Admin Dashboard';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage users={users} />;
      case 'users':
        return (
          <UsersPage
            users={users}
            onAddUser={addUser}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
        );
      default:
        return <DashboardPage users={users} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <Header
        title={getPageTitle()}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <main className="main-content">
        {renderPage()}
      </main>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;
