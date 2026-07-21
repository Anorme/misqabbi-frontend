import { useMemo, useState } from 'react';

import { createGuestSession } from '../../api/auth';
import { useAuthState } from '../../contexts/auth/useAuth';
import { useRegisterForEvent } from '../../hooks/mutations/useEventMutations';
import {
  isEventRegistrationOpen,
  REGISTRATION_CLOSED_MESSAGE,
  validateEventForm,
} from '../../utils/events';
import Button from '../ui/Button';
import DynamicEventForm from './DynamicEventForm';

const panelClass = 'rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-6';

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

const getRegistrationErrorMessage = error => {
  const apiMessage = error?.response?.data?.error || error?.response?.data?.message;
  if (apiMessage) return apiMessage;
  return error?.message || 'Failed to register for this event. Please try again.';
};

/**
 * Free event RSVP panel — guest session, form validation, and registration submit.
 *
 * @param {Object} props
 * @param {Object} props.event - Published event from GET /events/:slug
 * @param {(registration: Object, payload: Object) => void} [props.onSuccess]
 */
const EventRegistrationPanel = ({ event, onSuccess }) => {
  const { currentUser, isAuthenticated } = useAuthState();
  const registerMutation = useRegisterForEvent();

  const registrationForm = event.registrationForm;
  const isClosed = !isEventRegistrationOpen(event);
  const isFull = event.spotsRemaining === 0;

  const [values, setValues] = useState(() => ({
    guestInfo: buildInitialGuestInfo(registrationForm, currentUser),
    formResponses: { customAnswers: {} },
  }));
  const [errors, setErrors] = useState({ identity: {}, customAnswers: {} });
  const [submitError, setSubmitError] = useState('');

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

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitError('');

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
      guestInfo: validation.normalized.identity,
      formResponses: { customAnswers: validation.normalized.customAnswers },
    };

    try {
      if (!isAuthenticated) {
        await createGuestSession();
      }

      const response = await registerMutation.mutateAsync({
        slug: event.slug,
        body: payload,
      });

      onSuccess?.(response.data, payload);
    } catch (error) {
      setSubmitError(getRegistrationErrorMessage(error));
    }
  };

  if (!registrationForm) {
    return (
      <section className={panelClass}>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Registration</h2>
        <p className="text-sm text-gray-500">Registration is not available for this event yet.</p>
      </section>
    );
  }

  return (
    <section className={panelClass}>
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Registration</h2>
      <p className="text-sm text-gray-600 mb-4">
        Reserve your spot for this free event. Fill in the details below to register.
      </p>

      {isClosed ? (
        <p className="text-sm font-medium text-gray-600">{REGISTRATION_CLOSED_MESSAGE}.</p>
      ) : isFull ? (
        <p className="text-sm font-medium text-red-600">This event is full — no spots remaining.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <DynamicEventForm
            formSchema={registrationForm}
            identityKey="guestInfo"
            values={values}
            errors={errors}
            readOnly={false}
            onIdentityFieldChange={handleIdentityFieldChange}
            onCustomAnswerChange={handleCustomAnswerChange}
          />

          {submitError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {submitError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full px-4 py-3 text-sm"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Registering…' : 'Register for event'}
          </Button>
        </form>
      )}
    </section>
  );
};

export default EventRegistrationPanel;
