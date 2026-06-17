import { useState } from 'react';
import TicketTypeForm from './TicketTypeForm';
import { DeleteButton, EditButton } from './ActionButton';
import {
  useCreateAdminTicketType,
  useUpdateAdminTicketType,
  useDeleteAdminTicketType,
} from '../../hooks/mutations/useEventMutations';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import { formatEventDate, pesewasToGhs } from '../../utils/events';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';

const EventTicketTypesPanel = ({ eventId, ticketTypes = [] }) => {
  const createTicket = useCreateAdminTicketType();
  const updateTicket = useUpdateAdminTicketType();
  const deleteTicket = useDeleteAdminTicketType();

  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleCreate = async body => {
    setFormError(null);
    try {
      await createTicket.mutateAsync({ eventId, body });
      showSuccessToast('Ticket type added');
      setShowForm(false);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to add ticket type';
      setFormError(msg);
      showErrorToast(msg);
    }
  };

  const handleUpdate = async body => {
    setFormError(null);
    try {
      await updateTicket.mutateAsync({
        eventId,
        ticketTypeId: editingTicket._id,
        body,
      });
      showSuccessToast('Ticket type updated');
      setEditingTicket(null);
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to update ticket type';
      setFormError(msg);
      showErrorToast(msg);
    }
  };

  const handleDelete = async ticket => {
    if (ticket.soldCount > 0) {
      showErrorToast('Cannot delete a ticket type that has sales');
      return;
    }
    if (!window.confirm(`Delete ticket type "${ticket.name}"?`)) return;
    try {
      await deleteTicket.mutateAsync({ eventId, ticketTypeId: ticket._id });
      showSuccessToast('Ticket type deleted');
    } catch (err) {
      showErrorToast(err?.response?.data?.error || err?.message || 'Failed to delete ticket type');
    }
  };

  const isSaving = createTicket.isPending || updateTicket.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Ticket types</h2>
        {!showForm && !editingTicket && (
          <button
            type="button"
            className="px-3 py-2 text-sm bg-msq-purple-rich text-white rounded-md hover:bg-msq-purple-deep"
            onClick={() => setShowForm(true)}
          >
            Add ticket type
          </button>
        )}
      </div>

      {showForm && (
        <TicketTypeForm
          onSubmit={handleCreate}
          onCancel={() => {
            setShowForm(false);
            setFormError(null);
          }}
          isLoading={isSaving}
          error={formError}
        />
      )}

      {editingTicket && (
        <TicketTypeForm
          initialData={editingTicket}
          onSubmit={handleUpdate}
          onCancel={() => {
            setEditingTicket(null);
            setFormError(null);
          }}
          isLoading={isSaving}
          error={formError}
        />
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {ticketTypes.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">No ticket types yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Price', 'Sold', 'Remaining', 'Expires', 'Active', 'Actions'].map(
                    label => (
                      <th
                        key={label}
                        className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase"
                      >
                        {label}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ticketTypes.map(ticket => {
                  const remaining = Math.max(
                    0,
                    (ticket.maxQuantity || 0) - (ticket.soldCount || 0)
                  );
                  return (
                    <tr key={ticket._id}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{ticket.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {formatCurrency(pesewasToGhs(ticket.pricePesewas))}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{ticket.soldCount || 0}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{remaining}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {ticket.expiresAt ? formatEventDate(ticket.expiresAt) : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {ticket.isActive ? (
                          <span className="text-emerald-700">Yes</span>
                        ) : (
                          <span className="text-gray-500">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <EditButton
                            onClick={() => {
                              setShowForm(false);
                              setEditingTicket(ticket);
                            }}
                            title="Edit"
                          />
                          {ticket.soldCount === 0 && (
                            <DeleteButton onClick={() => handleDelete(ticket)} title="Delete" />
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventTicketTypesPanel;
