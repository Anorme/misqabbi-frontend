import { FORM_QUESTION_TYPE } from '../../constants/events';
import { isValidEmail } from '../validation';

const BUILTIN_LABELS = {
  name: 'Full name',
  email: 'Email',
  phone: 'Phone',
};

const isMissing = value => value === undefined || value === null || value === '';

const normalizeString = value => (typeof value === 'string' ? value.trim() : value);

const validateBuiltinField = (field, value, required) => {
  if (required && isMissing(value)) {
    return `${BUILTIN_LABELS[field] || field} is required`;
  }

  if (isMissing(value)) {
    return null;
  }

  const normalized = normalizeString(value);

  if (field === 'email' && !isValidEmail(normalized)) {
    return 'Please enter a valid email address';
  }

  if (field === 'name' && normalized.length === 0) {
    return `${BUILTIN_LABELS.name} is required`;
  }

  if (field === 'phone' && normalized.length === 0) {
    return `${BUILTIN_LABELS.phone} is required`;
  }

  return null;
};

const validateCustomAnswer = (question, value) => {
  const { label, type, required, options = [] } = question;

  if (required && isMissing(value)) {
    return `${label} is required`;
  }

  if (isMissing(value)) {
    return null;
  }

  if (type === FORM_QUESTION_TYPE.TEXT || type === FORM_QUESTION_TYPE.TEXTAREA) {
    if (typeof value !== 'string' || value.trim().length === 0) {
      return `${label} must be answered with text`;
    }
    return null;
  }

  if (type === FORM_QUESTION_TYPE.SELECT) {
    const normalized = normalizeString(value);
    if (!options.includes(normalized)) {
      return `${label} must match one of the configured options`;
    }
    return null;
  }

  if (type === FORM_QUESTION_TYPE.CHECKBOX) {
    if (typeof value !== 'boolean') {
      return `${label} must be answered with true or false`;
    }
    return null;
  }

  return `${label} has an unsupported question type`;
};

const normalizeIdentity = (schemaFields, identity = {}, resolvedEmail) => {
  const normalized = {};

  for (const { field, required } of schemaFields) {
    let value = field === 'email' && resolvedEmail ? resolvedEmail : identity[field];

    if (isMissing(value)) {
      if (!required) continue;
      value = field === 'email' ? resolvedEmail : value;
    }

    if (isMissing(value)) continue;

    normalized[field] = normalizeString(value);
  }

  return normalized;
};

const normalizeCustomAnswers = (questions, answers = {}) => {
  const normalized = {};

  for (const question of questions) {
    const value = answers[question.id];
    if (isMissing(value)) continue;

    if (question.type === FORM_QUESTION_TYPE.CHECKBOX) {
      normalized[question.id] = Boolean(value);
    } else if (
      question.type === FORM_QUESTION_TYPE.TEXT ||
      question.type === FORM_QUESTION_TYPE.TEXTAREA
    ) {
      normalized[question.id] = value.trim();
    } else {
      normalized[question.id] = normalizeString(value);
    }
  }

  return normalized;
};

/**
 * Validates event registration/volunteer form values before submit.
 * Mirrors backend formValidationLogic rules with field-keyed errors for inline UI.
 *
 * @param {Object} formSchema - { builtinFields, customQuestions }
 * @param {Object} options
 * @param {Object} options.identity - guestInfo or applicantInfo values
 * @param {Object} options.customAnswers - custom question answers keyed by question id
 * @param {string} [options.resolvedEmail] - account email when authenticated
 * @returns {{ isValid: boolean, errors: { identity: Object, customAnswers: Object }, normalized: { identity: Object, customAnswers: Object } }}
 */
export const validateEventForm = (
  formSchema,
  { identity = {}, customAnswers = {}, resolvedEmail } = {}
) => {
  const errors = { identity: {}, customAnswers: {} };

  if (!formSchema) {
    return {
      isValid: true,
      errors,
      normalized: { identity: {}, customAnswers: {} },
    };
  }

  const { builtinFields = [], customQuestions = [] } = formSchema;
  const identityInput = { ...identity };

  if (resolvedEmail && isMissing(identityInput.email)) {
    identityInput.email = resolvedEmail;
  }

  for (const { field, required } of builtinFields) {
    const value = field === 'email' ? identityInput.email : identityInput[field];
    const message = validateBuiltinField(field, value, required);
    if (message) {
      errors.identity[field] = message;
    }
  }

  if (!resolvedEmail && !identityInput.email) {
    if (!errors.identity.email && builtinFields.some(f => f.field === 'email' && f.required)) {
      errors.identity.email = `${BUILTIN_LABELS.email} is required`;
    }
  } else if (!resolvedEmail && identityInput.email && !errors.identity.email) {
    if (!isValidEmail(normalizeString(identityInput.email))) {
      errors.identity.email = 'Please enter a valid email address';
    }
  }

  for (const question of customQuestions) {
    const message = validateCustomAnswer(question, customAnswers[question.id]);
    if (message) {
      errors.customAnswers[question.id] = message;
    }
  }

  const hasErrors =
    Object.keys(errors.identity).length > 0 || Object.keys(errors.customAnswers).length > 0;

  return {
    isValid: !hasErrors,
    errors,
    normalized: {
      identity: normalizeIdentity(builtinFields, identityInput, resolvedEmail),
      customAnswers: normalizeCustomAnswers(customQuestions, customAnswers),
    },
  };
};
