import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getRoleColor } from '../../utils/admin/tableHelpers';
import { userRoles } from '../../utils/admin/mockData';
import DataTable from '../../components/admin/DataTable';
import AdminModal from '../../components/admin/AdminModal';
import FormField from '../../components/admin/FormField';
import PageHeader from '../../components/admin/PageHeader';
import { ViewButton, EditButton, DeleteButton } from '../../components/admin/ActionButton';
import PaginationLocal from '../../components/orders/PaginationLocal';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { fetchAdminUsers, updateAdminUserRole, deleteAdminUser } from '../../api/users';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    role: '',
  });

  // Filter users by search term
  const filteredUsers = searchTerm
    ? users.filter(user => {
        const name = (user.displayName || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        const term = searchTerm.toLowerCase();
        return name.includes(term) || email.includes(term);
      })
    : users;

  const columns = [
    {
      key: 'displayName',
      label: 'Name',
      render: (value, user) => (
        <div>
          <p className="font-medium text-gray-900">{value || user.displayName}</p>
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
      key: 'createdAt',
      label: 'Joined',
      render: value => (value ? new Date(value).toLocaleDateString() : '-'),
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
      title: 'Edit Role',
    },
    {
      component: DeleteButton,
      onClick: user => handleDeleteUser(user),
      title: 'Delete User',
    },
  ];

  const handleEditUser = user => {
    setEditingUser(user);
    setFormData({
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = user => {
    setDeleteTarget(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteUser = async () => {
    if (!deleteTarget?._id) return;
    setIsDeleting(true);
    try {
      await deleteAdminUser(deleteTarget._id);
      showSuccessToast('User deleted successfully');
      const res = await fetchAdminUsers({ page: currentPage, limit });
      setUsers(res?.data || []);
      setTotalPages(Number(res?.totalPages) || 1);
      setIsDeleteModalOpen(false);
      setDeleteTarget(null);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to delete user';
      showErrorToast(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewUser = user => {
    navigate(`/admin/users/${user._id}`);
  };

  const handleSaveUser = async () => {
    if (!formData.role) {
      showErrorToast('Please select a role');
      return;
    }
    try {
      await updateAdminUserRole(editingUser._id || editingUser.id, formData.role);
      showSuccessToast('User role updated successfully');
      setIsModalOpen(false);
      // Refetch current page
      setLoading(true);
      const res = await fetchAdminUsers({ page: currentPage, limit });
      setUsers(res?.data || []);
      setTotalPages(Number(res?.totalPages) || 1);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || 'Failed to update user role';
      showErrorToast(msg);
    } finally {
      setLoading(false);
      setFormData({ role: '' });
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchAdminUsers({ page: currentPage, limit });
        if (!cancelled) {
          setUsers(res?.data || []);
          setTotalPages(Number(res?.totalPages) || 1);
        }
      } catch (e) {
        if (!cancelled)
          setError(e?.response?.data?.message || e?.message || 'Failed to load users');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [currentPage, limit]);

  return (
    <div className="space-y-6">
      <PageHeader title="Users Management" />

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

      {error && <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">{error}</div>}

      {loading ? (
        <div className="py-10 flex items-center justify-center">
          <span className="text-sm text-gray-500">Loading users...</span>
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={filteredUsers} actions={actions} />
          {!error && filteredUsers.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-6">No users found.</div>
          )}
        </>
      )}

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
        title={editingUser ? 'Edit User Role' : 'Edit User Role'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              value={editingUser?.displayName || ''}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              value={editingUser?.email || ''}
              readOnly
              className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-600 cursor-not-allowed"
            />
          </div>

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
              {'Update Role'}
            </button>
          </div>
        </div>
      </AdminModal>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => (!isDeleting ? setIsDeleteModalOpen(false) : null)}
        title="Delete User"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete
            <span className="font-medium"> {deleteTarget?.displayName}</span>? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDeleteUser}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default AdminUsers;
