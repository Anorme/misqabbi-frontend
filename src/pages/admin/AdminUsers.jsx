import { useState } from 'react';
import { mockUsers, generateId } from '../../utils/admin/mockData';
import { paginateData, getRoleColor } from '../../utils/admin/tableHelpers';
import { userRoles } from '../../utils/admin/mockData';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const itemsPerPage = 8;

  // Filter users by search term
  const filteredUsers = searchTerm
    ? users.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const { paginatedData, totalPages } = paginateData(filteredUsers, currentPage, itemsPerPage);

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, user) => (
        <div>
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: value => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(value)}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'joinedDate',
      label: 'Joined',
      render: value => new Date(value).toLocaleDateString(),
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      render: value => <span className="text-sm text-gray-600">{value}</span>,
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: value => (
        <span className="text-sm font-medium text-gray-900">GHC {value.toFixed(2)}</span>
      ),
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: value => (
        <span className="text-sm text-gray-500">{new Date(value).toLocaleDateString()}</span>
      ),
    },
  ];

  const actions = [
    {
      component: ViewButton,
      onClick: user => handleViewUser(user),
      title: 'View User',
    },
    {
      component: EditButton,
      onClick: user => handleEditUser(user),
      title: 'Edit User',
    },
    {
      component: DeleteButton,
      onClick: user => handleDeleteUser(user),
      title: 'Delete User',
    },
  ];

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
    });
    setIsModalOpen(true);
  };

  const handleEditUser = user => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleViewUser = user => {
    const userDetails = `
User: ${user.name}
Email: ${user.email}
Role: ${user.role}
Joined: ${new Date(user.joinedDate).toLocaleDateString()}
Last Login: ${new Date(user.lastLogin).toLocaleDateString()}
Total Orders: ${user.totalOrders}
Total Spent: GHC ${user.totalSpent.toFixed(2)}
    `;
    alert(userDetails);
  };

  const handleDeleteUser = user => {
    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      setUsers(users.filter(u => u.id !== user.id));
      showSuccessToast('User deleted successfully');
    }
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email || !formData.role) {
      showErrorToast('Please fill in all required fields');
      return;
    }

    // Check if email already exists (for new users)
    if (!editingUser && users.some(u => u.email === formData.email)) {
      showErrorToast('Email already exists');
      return;
    }

    const userData = {
      ...formData,
      totalOrders: editingUser?.totalOrders || 0,
      totalSpent: editingUser?.totalSpent || 0,
      lastLogin: editingUser?.lastLogin || new Date().toISOString().split('T')[0],
    };

    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...userData } : u)));
      showSuccessToast('User updated successfully');
    } else {
      // Add new user
      const newUser = {
        id: generateId(),
        ...userData,
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setUsers([newUser, ...users]);
      showSuccessToast('User added successfully');
    }

    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: '',
    });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Users Management" actionLabel="Add User" onAction={handleAddUser} />

      {/* Search and Stats */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Search:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or email..."
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent w-64"
            />
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>

      <DataTable columns={columns} data={paginatedData} actions={actions} />

      {totalPages > 1 && (
        <PaginationLocal
          page={currentPage}
          totalPages={totalPages}
          onPrev={() => handlePageChange(currentPage - 1)}
          onNext={() => handlePageChange(currentPage + 1)}
        />
      )}

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
      >
        <div className="space-y-4">
          <FormField
            label="Full Name"
            value={formData.name}
            onChange={value => setFormData({ ...formData, name: value })}
            placeholder="Enter full name"
            required
          />

          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={value => setFormData({ ...formData, email: value })}
            placeholder="Enter email address"
            required
          />

          <FormField
            label="Role"
            type="select"
            value={formData.role}
            onChange={value => setFormData({ ...formData, role: value })}
            options={userRoles}
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveUser}
              className="px-4 py-2 text-sm font-medium text-white bg-msq-purple-rich rounded-md hover:bg-msq-purple-deep transition-colors"
            >
              {editingUser ? 'Update User' : 'Add User'}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminUsers;
