import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { StatsCard } from './components';
import UserTable from './components/UserTable';
import type { User } from './types';

interface DashboardPageProps {
  users: User[];
}

function DashboardPage({ users }: DashboardPageProps) {
  const totalUsers = users.length;
  const adminCount = users.filter(user => user.role === 'Admin').length;
  const managerCount = users.filter(user => user.role === 'Manager').length;
  const regularCount = users.filter(user => user.role === 'User').length;
  const salaryByRole = users.reduce(
  (acc, user) => {
    acc[user.role].total += user.salary;
    acc[user.role].count += 1;
    return acc;
  },
  {
    Admin: { total: 0, count: 0 },
    Manager: { total: 0, count: 0 },
    User: { total: 0, count: 0 },
  }
);

const salaryRoleData = Object.entries(salaryByRole).map(
  ([role, data]) => ({
    role,
    averageSalary: data.count ? Math.round(data.total / data.count) : 0,
  })
);

  const proficiencyCount = users.reduce(
    (acc, user) => {
      acc[user.proficiency] += 1;
      return acc;
    },
    { Good: 0, Average: 0, Excellent: 0 }
  );

  const proficiencyData = [
    { name: 'Good', value: proficiencyCount.Good },
    { name: 'Average', value: proficiencyCount.Average },
    { name: 'Excellent', value: proficiencyCount.Excellent },
  ];
  const ROLE_COLORS: Record<string, string> = {
  Admin: '#4caf50',
  Manager: '#2196f3',
  User: '#FF6347',
};


  return (
    <div>
      <h2 className="page-title">Welcome to the Admin Dashboard</h2>
      <section className="stats-grid">
        <StatsCard
          label="Total Users"
          value={totalUsers}
          icon="👥"
          variant="primary"
        />
        <StatsCard
          label="Admins"
          value={adminCount}
          icon="🛡️"
          variant="info"
        />
        <StatsCard
          label="Managers"
          value={managerCount}
          icon="📋"
          variant="warning"
        />
        <StatsCard
          label="Regular Users"
          value={regularCount}
          icon="👤"
          variant="success"
        />
      </section>
      {/* <section className="card">
        <header className="card-header">
          <h3 className="card-title">Quick Overview</h3>
        </header>
        <div className="card-body">
          <p>Welcome to the Admin Dashboard. Use the sidebar to navigate between pages.</p>
          <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', listStyle: 'disc' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Dashboard:</strong> View user statistics at a glance
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <strong>Users:</strong> Manage user accounts, create new users, and assign roles
            </li>
          </ul>
        </div>
      </section> */}
      <section className="dashboard-grid">
        {/* Salary vs Role */}
        <div className="card">
          <header className="card-header">
            <h3 className="card-title">Salary vs Role</h3>
          </header>
          <div className="card-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salaryRoleData}
                margin={{ top: 20, right: 20, left: 40, bottom: 20 }}
              >
                <XAxis
                  dataKey="role"
                  label={{ value: '*Role*', position: 'insideBottom', offset: -8 }}
                />
                <YAxis
                  label={{
                    value: 'Salary (₹)',
                    angle: -90,
                    position: 'insideLeft',
                    offset: -10,
                  }}
                  tickFormatter={(value) => `₹${value}`}
                />

                <Tooltip formatter={(value) => `₹${value}`} />

                <Bar dataKey="averageSalary" barSize={30}>
                  {salaryRoleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={ROLE_COLORS[entry.role]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proficiency Pie */}
        <div className="card">
          <header className="card-header">
            <h3 className="card-title">Proficiency Breakdown</h3>
          </header>

          <div className="card-body" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={proficiencyData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  {proficiencyData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={['#8A2BE2', '#1E90FF', '#FB923C'][index]}
                    />
                  ))}
                </Pie>

                <Legend
                  verticalAlign="bottom"
                  wrapperStyle={{ marginTop: 20 }}
                />

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>



      <section className="card">
        <header className="card-header">
          <h3 className="card-title">Users</h3>
        </header>
        <div className="card-body">
          <UserTable users={users} showActions={false} />
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
