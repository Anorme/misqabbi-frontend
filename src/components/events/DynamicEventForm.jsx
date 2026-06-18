import { FORM_QUESTION_TYPE } from '../../constants/events';

const BUILTIN_LABELS = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
};

/**
 * Renders event registration/volunteer forms for admin preview and public submission.
 *
 * @param {Object} props
 * @param {Object} props.formSchema - { builtinFields, customQuestions }
 * @param {'guestInfo'|'applicantInfo'} [props.identityKey='guestInfo']
 * @param {Object} [props.values] - { guestInfo|applicantInfo, formResponses: { customAnswers } }
 * @param {boolean} [props.readOnly=true]
 * @param {Object} [props.errors] - { identity: { field: message }, customAnswers: { questionId: message } }
 * @param {(field: string, value: string) => void} [props.onIdentityFieldChange]
 * @param {(questionId: string, value: string|boolean) => void} [props.onCustomAnswerChange]
 */
const DynamicEventForm = ({
  formSchema,
  identityKey = 'guestInfo',
  values = {},
  readOnly = true,
  errors = {},
  onIdentityFieldChange,
  onCustomAnswerChange,
}) => {
  if (!formSchema) {
    return <p className="text-sm text-gray-500">No form configured.</p>;
  }

  const { builtinFields = [], customQuestions = [] } = formSchema;
  const identityValues = values[identityKey] || values.guestInfo || values.applicantInfo || {};
  const customAnswers = values.formResponses?.customAnswers || values.customAnswers || {};
  const identityErrors = errors.identity || {};
  const customErrors = errors.customAnswers || {};

  const baseInputClass =
    'w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-msq-purple-rich/30';
  const readOnlyInputClass = `${baseInputClass} border-gray-200 bg-gray-50 text-gray-700`;
  const interactiveInputClass = fieldError =>
    `${baseInputClass} bg-white text-gray-900 ${fieldError ? 'border-red-500' : 'border-gray-300'}`;

  const renderBuiltinField = ({ field, required }) => {
    const fieldError = identityErrors[field];

    return (
      <div key={field} className="mb-4">
        <label
          htmlFor={`${identityKey}-${field}`}
          className="mb-1 block text-left text-sm font-medium text-gray-700"
        >
          {BUILTIN_LABELS[field] || field}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          id={`${identityKey}-${field}`}
          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={identityValues[field] ?? ''}
          placeholder={BUILTIN_LABELS[field]}
          className={readOnly ? readOnlyInputClass : interactiveInputClass(fieldError)}
          disabled={readOnly}
          readOnly={readOnly}
          onChange={readOnly ? undefined : e => onIdentityFieldChange?.(field, e.target.value)}
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? `${identityKey}-${field}-error` : undefined}
        />
        {fieldError && (
          <p id={`${identityKey}-${field}-error`} className="mt-1 text-xs text-red-600">
            {fieldError}
          </p>
        )}
      </div>
    );
  };

  const renderCustomQuestion = question => {
    const { id, label, type, required, options = [] } = question;
    const answer = customAnswers[id];
    const fieldError = customErrors[id];
    const inputClass = readOnly ? readOnlyInputClass : interactiveInputClass(fieldError);

    switch (type) {
      case FORM_QUESTION_TYPE.TEXTAREA:
        return (
          <div key={id} className="mb-4">
            <label
              htmlFor={`question-${id}`}
              className="mb-1 block text-left text-sm font-medium text-gray-700"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              id={`question-${id}`}
              value={typeof answer === 'string' ? answer : ''}
              rows={3}
              className={inputClass}
              disabled={readOnly}
              readOnly={readOnly}
              onChange={readOnly ? undefined : e => onCustomAnswerChange?.(id, e.target.value)}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={fieldError ? `question-${id}-error` : undefined}
            />
            {fieldError && (
              <p id={`question-${id}-error`} className="mt-1 text-xs text-red-600">
                {fieldError}
              </p>
            )}
          </div>
        );

      case FORM_QUESTION_TYPE.SELECT:
        return (
          <div key={id} className="mb-4">
            <label
              htmlFor={`question-${id}`}
              className="mb-1 block text-left text-sm font-medium text-gray-700"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              id={`question-${id}`}
              value={typeof answer === 'string' ? answer : ''}
              className={inputClass}
              disabled={readOnly}
              onChange={readOnly ? undefined : e => onCustomAnswerChange?.(id, e.target.value)}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={fieldError ? `question-${id}-error` : undefined}
            >
              <option value="">Select an option</option>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldError && (
              <p id={`question-${id}-error`} className="mt-1 text-xs text-red-600">
                {fieldError}
              </p>
            )}
          </div>
        );

      case FORM_QUESTION_TYPE.CHECKBOX:
        return (
          <div key={id} className="mb-4">
            <div className="flex items-start gap-2">
              <input
                id={`question-${id}`}
                type="checkbox"
                checked={Boolean(answer)}
                className="mt-1 h-4 w-4 rounded border-gray-300"
                disabled={readOnly}
                onChange={readOnly ? undefined : e => onCustomAnswerChange?.(id, e.target.checked)}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? `question-${id}-error` : undefined}
              />
              <label htmlFor={`question-${id}`} className="text-sm text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
            {fieldError && (
              <p id={`question-${id}-error`} className="mt-1 text-xs text-red-600">
                {fieldError}
              </p>
            )}
          </div>
        );

      case FORM_QUESTION_TYPE.TEXT:
      default:
        return (
          <div key={id} className="mb-4">
            <label
              htmlFor={`question-${id}`}
              className="mb-1 block text-left text-sm font-medium text-gray-700"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              id={`question-${id}`}
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              className={inputClass}
              disabled={readOnly}
              readOnly={readOnly}
              onChange={readOnly ? undefined : e => onCustomAnswerChange?.(id, e.target.value)}
              aria-invalid={Boolean(fieldError)}
              aria-describedby={fieldError ? `question-${id}-error` : undefined}
            />
            {fieldError && (
              <p id={`question-${id}-error`} className="mt-1 text-xs text-red-600">
                {fieldError}
              </p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-1">
      {builtinFields.map(renderBuiltinField)}
      {customQuestions.map(renderCustomQuestion)}
    </div>
  );
};

export default DynamicEventForm;
