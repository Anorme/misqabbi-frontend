import { useMemo, useState } from 'react';

import { createGuestSession } from '../../api/auth';
import { useAuthState } from '../../contexts/auth/useAuth';
import { useCheckoutEvent } from '../../hooks/mutations/useEventMutations';
import { formatCurrency } from '../../utils/admin/tableHelpers';
import { pesewasToGhs, validateEventForm } from '../../utils/events';
import Button from '../ui/Button';
import DynamicEventForm from './DynamicEventForm';

const EVENT_CHECKOUT_SLUG_KEY = 'misqabbi_event_checkout_slug';

const buildInitialGuestInfo = (formSchema, currentUser) => {
  const guestInfo = {};
  const fields = formSchema?.builtinFields || [];

  for (const { field } of fields) {
    if (field === 'name') {
      guestInfo.name = currentUser?.displayName || currentUser?.name || '';
    } else if (field === 'email') {
      guestInfo.email = currentUser?.email || '';
    } else if (field === 'phone') {
      guestInfo.phone = currentUser?.contact || currentUser?.phoneNumber || '';
    }
  }

  return guestInfo;
};

const getCheckoutErrorMessage = error => {
  const apiMessage = error?.response?.data?.error || error?.response?.data?.message;
  if (apiMessage) return apiMessage;
  return error?.message || 'Failed to start checkout. Please try again.';
};

/**
 * Paid event ticket checkout — ticket selection, registration form, and Paystack redirect.
 *
 * @param {Object} props
 * @param {Object} props.event - Published paid event from GET /events/:slug
 */
const EventTicketCheckout = ({ event }) => {
  const { currentUser, isAuthenticated } = useAuthState();
  const checkoutMutation = useCheckoutEvent();

  const registrationForm = event.registrationForm;
  const activeTickets = useMemo(
    () => (event.ticketTypes || []).filter(t => t.isActive),
    [event.ticketTypes]
  );

  const defaultTicketId = useMemo(() => {
    const available = activeTickets.find(t => (t.remainingQuantity ?? 0) > 0);
    return available?._id || activeTickets[0]?._id || '';
  }, [activeTickets]);

  const [selectedTicketId, setSelectedTicketId] = useState(defaultTicketId);
  const [quantity, setQuantity] = useState(1);
  const [values, setValues] = useState(() => ({
    guestInfo: buildInitialGuestInfo(registrationForm, currentUser),
    formResponses: { customAnswers: {} },
  }));
  const [errors, setErrors] = useState({ identity: {}, customAnswers: {} });
  const [submitError, setSubmitError] = useState('');

  const selectedTicket = activeTickets.find(t => t._id === selectedTicketId) || null;
  const eventFull = event.spotsRemaining === 0;
  const ticketSoldOut = selectedTicket ? (selectedTicket.remainingQuantity ?? 0) === 0 : true;
  const maxQuantity = selectedTicket
    ? Math.max(1, Math.min(selectedTicket.remainingQuantity ?? 1, event.spotsRemaining ?? 99))
    : 1;

  const lineTotalPesewas = selectedTicket ? Number(selectedTicket.pricePesewas) * quantity : 0;

  const resolvedEmail = useMemo(
    () => (isAuthenticated ? currentUser?.email : undefined),
    [isAuthenticated, currentUser?.email]
  );

  const clearIdentityError = field => {
    setErrors(prev => {
      if (!prev.identity?.[field]) return prev;
      const { [field]: _, ...rest } = prev.identity;
      return { ...prev, identity: rest };
    });
  };

  const clearCustomError = questionId => {
    setErrors(prev => {
      if (!prev.customAnswers?.[questionId]) return prev;
      const { [questionId]: _, ...rest } = prev.customAnswers;
      return { ...prev, customAnswers: rest };
    });
  };

  const handleIdentityFieldChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      guestInfo: { ...prev.guestInfo, [field]: value },
    }));
    clearIdentityError(field);
    if (submitError) setSubmitError('');
  };

  const handleCustomAnswerChange = (questionId, value) => {
    setValues(prev => ({
      ...prev,
      formResponses: {
        customAnswers: {
          ...prev.formResponses.customAnswers,
          [questionId]: value,
        },
      },
    }));
    clearCustomError(questionId);
    if (submitError) setSubmitError('');
  };

  const handleTicketChange = ticketId => {
    setSelectedTicketId(ticketId);
    setQuantity(1);
    if (submitError) setSubmitError('');
  };

  const handleQuantityChange = e => {
    const next = Math.max(1, parseInt(e.target.value, 10) || 1);
    setQuantity(Math.min(next, maxQuantity));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');

    if (!selectedTicket || ticketSoldOut || eventFull) return;

    const validation = validateEventForm(registrationForm, {
      identity: values.guestInfo,
      customAnswers: values.formResponses.customAnswers,
      resolvedEmail,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const payload = {
      ticketTypeId: selectedTicket._id,
      quantity,
      guestInfo: validation.normalized.identity,
      formResponses: { customAnswers: validation.normalized.customAnswers },
    };

    try {
      if (!isAuthenticated) {
        await createGuestSession();
      }

      const response = await checkoutMutation.mutateAsync({
        slug: event.slug,
        body: payload,
      });

      sessionStorage.setItem(EVENT_CHECKOUT_SLUG_KEY, event.slug);
      window.location.href = response.data.authorizationUrl;
    } catch (error) {
      setSubmitError(getCheckoutErrorMessage(error));
    }
  };

  if (activeTickets.length === 0) {
    return (
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Tickets</h2>
        <p className="text-sm text-gray-500">Tickets are not available yet.</p>
      </section>
    );
  }

  if (!registrationForm) {
    return (
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Tickets</h2>
        <p className="text-sm text-gray-500">Registration is not available for this event yet.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Get tickets</h2>
      <p className="text-sm text-gray-600 mb-4">
        Select a ticket type and complete the registration form to proceed to payment.
      </p>

      {eventFull ? (
        <p className="text-sm font-medium text-red-600">This event is full — no spots remaining.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-2">Ticket type</p>
            <ul className="space-y-2">
              {activeTickets.map(ticket => {
                const soldOut = (ticket.remainingQuantity ?? 0) === 0;
                const isSelected = ticket._id === selectedTicketId;
                return (
                  <li key={ticket._id}>
                    <label
                      className={`flex items-start gap-3 rounded-lg border p-3 cursor-pointer ${
                        soldOut
                          ? 'border-gray-200 bg-gray-50 opacity-75 cursor-not-allowed'
                          : isSelected
                            ? 'border-msq-purple-rich ring-1 ring-msq-purple-rich/30'
                            : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="ticketType"
                        value={ticket._id}
                        checked={isSelected}
                        disabled={soldOut}
                        onChange={() => handleTicketChange(ticket._id)}
                        className="mt-1"
                      />
                      <span className="flex-1 min-w-0">
                        <span className="flex items-center justify-between gap-2">
                          <span className="font-medium text-gray-900">{ticket.name}</span>
                          <span className="text-sm text-gray-700 shrink-0">
                            {formatCurrency(pesewasToGhs(ticket.pricePesewas))}
                          </span>
                        </span>
                        {soldOut ? (
                          <span className="inline-block mt-1 text-xs font-medium text-gray-500">
                            Sold out
                          </span>
                        ) : (
                          <span className="block mt-1 text-xs text-gray-500">
                            {ticket.remainingQuantity} available
                          </span>
                        )}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          {selectedTicket && !ticketSoldOut && (
            <>
              <div>
                <label
                  htmlFor="ticket-quantity"
                  className="block text-sm font-medium text-gray-900 mb-1"
                >
                  Quantity
                </label>
                <input
                  id="ticket-quantity"
                  type="number"
                  min={1}
                  max={maxQuantity}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-msq-purple-rich/30"
                />
              </div>

              <div className="rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm">
                <span className="text-gray-600">Total: </span>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(pesewasToGhs(lineTotalPesewas))}
                </span>
              </div>

              <DynamicEventForm
                formSchema={registrationForm}
                identityKey="guestInfo"
                values={values}
                errors={errors}
                readOnly={false}
                onIdentityFieldChange={handleIdentityFieldChange}
                onCustomAnswerChange={handleCustomAnswerChange}
              />

              <p className="text-xs text-gray-500">
                Spots may change while you complete checkout. If capacity runs out, payment will not
                be completed.
              </p>

              {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {submitError}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full px-4 py-3 text-sm"
                disabled={checkoutMutation.isPending || ticketSoldOut || eventFull}
              >
                {checkoutMutation.isPending ? 'Redirecting to payment…' : 'Continue to payment'}
              </Button>
            </>
          )}

          {selectedTicket && ticketSoldOut && !eventFull && (
            <p className="text-sm font-medium text-red-600">
              The selected ticket type is sold out. Choose another ticket type.
            </p>
          )}
        </form>
      )}
    </section>
  );
};

export default EventTicketCheckout;
