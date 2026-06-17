import { useMemo, useState } from 'react';

import { createGuestSession } from '../../api/auth';
import { useAuthState } from '../../contexts/auth/useAuth';
import { useSubmitVolunteerApplication } from '../../hooks/mutations/useEventMutations';
import { validateEventForm } from '../../utils/events/validateEventForm';
import Button from '../ui/Button';
import DynamicEventForm from './DynamicEventForm';

const buildInitialApplicantInfo = (formSchema, currentUser) => {
  const applicantInfo = {};
  const fields = formSchema?.builtinFields || [];

  for (const { field } of fields) {
    if (field === 'name') {
      applicantInfo.name = currentUser?.displayName || currentUser?.name || '';
    } else if (field === 'email') {
      applicantInfo.email = currentUser?.email || '';
    } else if (field === 'phone') {
      applicantInfo.phone = currentUser?.contact || currentUser?.phoneNumber || '';
    }
  }

  return applicantInfo;
};

const getVolunteerErrorMessage = error => {
  const apiMessage = error?.response?.data?.error || error?.response?.data?.message;
  if (apiMessage) return apiMessage;
  return error?.message || 'Failed to submit volunteer application. Please try again.';
};

/**
 * Volunteer application panel — guest session, form validation, and submit.
 *
 * @param {Object} props
 * @param {Object} props.event - Published event from GET /events/:slug
 * @param {(applicantInfo: Object) => void} [props.onSuccess]
 */
const EventVolunteerPanel = ({ event, onSuccess }) => {
  const { currentUser, isAuthenticated } = useAuthState();
  const volunteerMutation = useSubmitVolunteerApplication();

  const volunteerForm = event.volunteerForm;

  const [values, setValues] = useState(() => ({
    applicantInfo: buildInitialApplicantInfo(volunteerForm, currentUser),
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
      applicantInfo: { ...prev.applicantInfo, [field]: value },
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

    const validation = validateEventForm(volunteerForm, {
      identity: values.applicantInfo,
      customAnswers: values.formResponses.customAnswers,
      resolvedEmail,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const payload = {
      applicantInfo: validation.normalized.identity,
      formResponses: { customAnswers: validation.normalized.customAnswers },
    };

    try {
      if (!isAuthenticated) {
        await createGuestSession();
      }

      await volunteerMutation.mutateAsync({
        slug: event.slug,
        body: payload,
      });

      onSuccess?.(payload.applicantInfo);
    } catch (error) {
      setSubmitError(getVolunteerErrorMessage(error));
    }
  };

  if (!volunteerForm) {
    return (
      <section className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Volunteer</h2>
        <p className="text-sm text-gray-500">
          Volunteer applications are not available for this event.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">Volunteer</h2>
      <p className="text-sm text-gray-600 mb-4">
        Interested in helping out? Fill in the form below to apply as a volunteer.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <DynamicEventForm
          formSchema={volunteerForm}
          identityKey="applicantInfo"
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
          disabled={volunteerMutation.isPending}
        >
          {volunteerMutation.isPending ? 'Submitting…' : 'Apply to volunteer'}
        </Button>
      </form>
    </section>
  );
};

export default EventVolunteerPanel;
