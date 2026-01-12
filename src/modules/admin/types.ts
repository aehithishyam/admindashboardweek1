/**
 * Admin Module Types
 * Defines interfaces for users and form validation
 */

// User entity
export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  address: string;
  phone: string;
  role: 'Admin' | 'Manager' | 'User';
  proficiency: 'Good' | 'Average' | 'Excellent';
  status: 'Active' | 'InActive';
  salary: number;
}

// Form validation errors
export interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  address?: string;
  phone?: string;
  role?: string;
  proficiency?: string;
  status?: string;
  salary?:string;
}

// User form data (without id for create/update)
export type UserFormData = Omit<User, 'id'>;

// Stats card variants
export type StatsVariant = 'primary' | 'success' | 'warning' | 'info';

// Initial sample users
export const INITIAL_USERS: User[] = [
  {
    id: 1,
    name: 'John Smith',
    age: 28,
    email: 'john.smith@example.com',
    address: 'Bangalore',
    phone: '9876543210',
    role: 'Admin',
    proficiency: 'Excellent',
    status: 'Active',
    salary: 75000,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    age: 48,
    email: 'sarah.johnson@example.com',
    address: 'Bangalore',
    phone: '9876543212',
    role: 'Manager',
    proficiency: 'Excellent',
    status: 'InActive',
    salary: 65000,
  },
  {
    id: 3,
    name: 'Michael Brown',
    age: 20,
    email: 'michael.brown@example.com',
    address: 'Bangalore',
    phone: '9876523212',
    role: 'User',
    proficiency: 'Excellent',
    status: 'InActive',
    salary: 60000,
  },
  {
    id: 4,
    name: 'Emily Davis',
    age: 27,
    email: 'emily.davis@example.com',
    address: 'Bangalore',
    phone: '9876543214',
    role: 'User',
    proficiency: 'Good',
    status: 'InActive',
    salary: 45000,
  },
  {
    id: 5,
    name: 'David Wilson',
    age: 24,
    email: 'david.wilson@example.com',
    address: 'Bangalore',
    phone: '9226543214',
    role: 'Manager',
    proficiency: 'Excellent',
    status: 'Active',
    salary: 55000,
  },
  {
    id: 6,
    name: 'Jessica Taylor',
    age: 38,
    email: 'jessica.taylor@example.com',
    address: 'Bangalore',
    phone: '9226543214',
    role: 'Manager',
    proficiency: 'Average',
    status: 'Active',
    salary: 3900,
  },
  {
    id: 7,
    name: 'Christopher Lee',
    age: 38,
    email: 'christopher.lee@example.com',
    address: 'Bangalore',
    phone: '9226533014',
    role: 'Admin',
    proficiency: 'Good',
    status: 'Active',
    salary: 56000,
  },
  {
    id: 8,
    name: 'Amanda Martinez',
    age: 38,
    email: 'amanda.martinez@example.com',
    address: 'Bangalore',
    phone: '9226533014',
    role: 'User',
    proficiency: 'Excellent',
    status: 'Active',
    salary: 65000,
  },
];

// Pagination config
export const PAGE_SIZE = 5;
