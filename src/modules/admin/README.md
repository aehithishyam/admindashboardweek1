# Admin Module (Dashboard & User Management)

A beginner-friendly admin module with a dashboard overview and user management CRUD operations built with React functional components and hooks.

---

## 🎓 How to Understand the Flow

### Module Structure

```
modules/admin/
├── types.ts              # TypeScript interfaces and constants
├── DashboardPage.tsx     # Dashboard with statistics
├── UsersPage.tsx         # User management with CRUD
├── index.ts              # Public exports
├── hooks/
│   ├── useUsers.ts       # User state and CRUD operations
│   ├── usePagination.ts  # Generic pagination logic
│   └── index.ts          # Hook exports
└── components/
    ├── StatsCard.tsx     # Single statistic display
    ├── UserTable.tsx     # Table of users
    ├── UserRow.tsx       # Single table row
    ├── UserForm.tsx      # Create/edit user modal
    ├── ConfirmDeleteModal.tsx  # Delete confirmation
    ├── Pagination.tsx    # Page navigation
    ├── LoadingState.tsx  # Loading spinner
    ├── EmptyState.tsx    # No data placeholder
    ├── ErrorState.tsx    # Error with retry
    └── index.ts          # Component exports
```

### Step-by-Step: Dashboard Page Flow

```
App.tsx loads
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. useUsers() hook initializes                                 │
│     └── Creates users state with INITIAL_USERS                  │
│     └── Returns users array and stats                           │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. DashboardPage receives users                                │
│     └── Calculates counts: admins, managers, users              │
│     └── Renders StatsCard for each stat                         │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. StatsCard displays                                          │
│     └── Shows icon, label, and value                            │
│     └── Applies variant color (primary, success, etc.)          │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step: User Management CRUD Flow

```
User clicks "+ Add User"
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. UsersPage                                                   │
│     └── setShowForm(true) - opens modal                         │
│     └── setEditingUser(null) - create mode, not edit            │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. UserForm modal appears                                      │
│     └── Empty fields (name,age, email,address,phone,proficiency,
|                          role,status,salary)                    │
│     └── User fills in data                                      │
│     └── Clicks "Create User"                                    │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Form validation                                             │
│     └── Check name not empty                                    │
│     └── Check email format (regex)                              │
│     └── Check role selected (check for required fields)         │
│     └── If errors → show error messages                         │
│     └── If valid → call onSave(userData)                        │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. Back to UsersPage                                           │
│     └── handleFormSave receives userData                        │
│     └── Calls onAddUser (from App.tsx)                          │
│     └── Closes modal                                            │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. App.tsx (or useUsers hook)                                  │
│     └── addUser generates new ID                                │
│     └── Adds user to users array                                │
│     └── Shows success notification                              │
└─────────────────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. React re-renders                                            │
│     └── UserTable shows new user                                │
│     └── Dashboard stats update (+1 user) and charts,table       │
└─────────────────────────────────────────────────────────────────┘
```

### Understanding CRUD Operations

#### CREATE
```tsx
const addUser = (userData) => {
  const newId = Math.max(...users.map(u => u.id), 0) + 1;  // Generate ID
  const newUser = { id: newId, ...userData };
  setUsers([...users, newUser]);  // Add to array
};
```

#### READ
```tsx
// Display all users
{users.map(user => <UserRow key={user.id} user={user} />)}

// Paginated display
const { paginatedItems } = usePagination(users, 5);
```

#### UPDATE
```tsx
const updateUser = (id, userData) => {
  setUsers(users.map(user => 
    user.id === id 
      ? { ...user, ...userData }  // Replace matching user
      : user                       // Keep others unchanged
  ));
};
```

#### DELETE
```tsx
const deleteUser = (id) => {
  setUsers(users.filter(user => user.id !== id));  // Remove by ID
};
```

### Key Files to Read (In Order)

1. **Start here → `types.ts`**
   - See the User interface
   - Understand FormErrors for validation
   - Find initial sample data

2. **Next → `hooks/useUsers.ts`**
   - See CRUD operations
   - Understand state management
   - Learn about callback pattern for notifications

3. **Then → `UsersPage.tsx`**
   - See how state controls the UI
   - Understand modal open/close logic
   - Follow the form submission flow

4. **Then → `components/UserForm.tsx`**
   - See controlled inputs
   - Understand form validation
   - Learn about error display

5. **Finally → `DashboardPage.tsx`**
   - Simple data display
   - Calculating statistics from array

### Understanding Form Validation

```tsx
const validate = () => {
  const newErrors = {};
  
  // Check each field
  if (!name.trim()) {
    newErrors.name = 'Name is required';
  }
  
  if (!email.trim()) {
    newErrors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    newErrors.email = 'Please enter a valid email';
  }
  
  // Update error state
  setErrors(newErrors);
  
  // Return true if no errors
  return Object.keys(newErrors).length === 0;
};
```

### Understanding Pagination

```tsx
function usePagination(items, pageSize) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(items.length / pageSize);
  
  // Get items for current page
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  
  return { currentPage, totalPages, paginatedItems, goToPage };
}

// Usage: 8 users, 5 per page
// Page 1: users[0-4] (indices 0,1,2,3,4)
// Page 2: users[5-7] (indices 5,6,7)
```

## Common Patterns Used

### 1. Controlled Components
All form inputs are controlled by React state:
```tsx
<input 
  value={name}                         // State controls value
  onChange={e => setName(e.target.value)}  // Input updates state
/>
```

### 2. Lifting State Up
User data lives in App.tsx, passed down to pages:
```tsx
// App.tsx
const [users, setUsers] = useState(INITIAL_USERS);

<DashboardPage users={users} />
<UsersPage users={users} onAddUser={addUser} />
```

### 3. Callback Props
Child components report actions to parents:
```tsx
// Parent
<UserForm onSave={handleFormSave} onCancel={handleFormCancel} />

// Child calls when user submits
onSave({ name, email, role });
```

### 4. Conditional Rendering
Show different UI based on state:
```tsx
{isLoading ? <LoadingState /> : <UserTable users={users} />}

{showForm && <UserForm ... />}  // Only render if true

{deletingUser && <ConfirmDeleteModal user={deletingUser} />}
```

## Debugging Tips

1. **Form not submitting?** Check validation errors in state
2. **User not appearing?** Verify addUser is updating state correctly
3. **Pagination broken?** Check totalPages calculation
4. **Modal not closing?** Ensure setShowForm(false) is called

## Hooks Reference

| Hook | Purpose |
|------|---------|
| `useState` | Store users array, form visibility, editing user |
| `useEffect` | Simulate loading delay, cleanup timers |
| `useCallback` | Memoize CRUD functions (in useUsers) |
