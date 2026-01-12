import { useState } from 'react';
import type { User, UserFormData, FormErrors } from '../types';

type Proficiency = 'Good' | 'Average' | 'Excellent';
type Status = 'Active' | 'InActive';

interface UserFormProps {
  user: User | null;
  onSave: (userData: UserFormData) => void;
  onCancel: () => void;
}

/* Modal form for creating/editing users */
function UserForm({ user, onSave, onCancel }: UserFormProps) {
  const [name, setName] = useState(user?.name ?? '');
  const [age, setAge] = useState<number>(user?.age ?? 0);
  const [address, setAddress] = useState(user?.address ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [proficiency, setProficiency] =
    useState<Proficiency | ''>(user?.proficiency ?? '');

  const [status, setStatus] =
    useState<Status | ''>(user?.status ?? '');

  const [email, setEmail] = useState(user?.email ?? '');
  const [role, setRole] = useState<'Admin' | 'Manager' | 'User' | ''>(user?.role ?? '');
  const [salary, setSalary] = useState<number>(user?.salary ?? 0);

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!age) {
      newErrors.age = 'Age is required';
    } else if (age < 18) {
      newErrors.age = 'Age must be 18 or above';
    }

    // if (!address.trim()) newErrors.address = 'Address is required';
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    if (!role) {
      newErrors.role = 'Role is required';
    }
    if (!proficiency) {
      newErrors.proficiency = 'Proficiency is required';
    }
    if (!status) newErrors.status = 'Status is required';

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!salary) {
      newErrors.salary = 'Salary is required';
    } else if (salary <= 0) {
      newErrors.salary = 'Salary must be greater than 0';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave({
        name: name.trim(),
        age,
        email: email.trim(),
        address: address.trim(),
        phone: phone.trim(),
        role: role as 'Admin' | 'Manager' | 'User',
        proficiency: proficiency as 'Good' | 'Average' | 'Excellent',
        status: status as Status,
        salary,
      });

    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h2 className="modal-title">{user ? 'Edit User' : 'Create User'}</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter user name"
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Age <span className="required">*</span></label>
                <input
                  type="number"
                  min={0}
                  className={`form-input ${errors.age ? 'error' : ''}`}
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  placeholder="Enter Age"
                />
                {errors.age && <p className="form-error">{errors.age}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
                <input
                  type="text"
                  id="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter address"
                />
                {/* {errors.address && <p className="form-error">{errors.address}</p>} */}
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number <span className="required">*</span></label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  value={phone}
                  onChange={e => {
                    const value = e.target.value;

                    // allow only digits
                    if (!/^\d*$/.test(value)) return;
                    //start 8,9 
                    //if (value.length === 1 && !/[89]/.test(value)) return;
                    // limit to 10 digits
                    if (value.length > 10) return;

                    setPhone(value);
                  }}
                  placeholder="Enter 10-digit phone number"
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">Role <span className="required">*</span></label>
                <select
                  id="role"
                  className={`form-select ${errors.role ? 'error' : ''}`}
                  value={role}
                  onChange={e => setRole(e.target.value as 'Admin' | 'Manager' | 'User' | '')}
                >
                  <option value="">Select a role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="User">User</option>
                </select>
                {errors.role && <p className="form-error">{errors.role}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Proficiency <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.proficiency ? 'error' : ''}`}
                  value={proficiency}
                  onChange={e => setProficiency(e.target.value as Proficiency)}
                >
                  <option value="">Select</option>
                  <option value="Good">Good</option>
                  <option value="Average">Average</option>
                  <option value="Excellent">Excellent</option>
                </select>
                {errors.proficiency && <p className="form-error">{errors.proficiency}</p>}
              </div>
              <div className="form-group">
                <label className="form-label">Salary <span className="required">*</span></label>
                <input
                  type="number"
                  min={1}
                  className={`form-input ${errors.salary ? 'error' : ''}`}
                  value={salary || ''}
                  onChange={e => {
                    const value = Number(e.target.value);
                    if (value < 0) return;
                    setSalary(value);
                  }}
                  placeholder="Enter salary"
                />
                {errors.salary && <p className="form-error">{errors.salary}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">Status <span className="required">*</span></label>
                <select
                  className={`form-select ${errors.status ? 'error' : ''}`}
                  value={status}
                  onChange={e => setStatus(e.target.value as Status)}
                >
                  <option value="">Select</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && <p className="form-error">{errors.status}</p>}
              </div>
            </div>
          </div>
          <footer className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {user ? 'Save Changes' : 'Create User'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
