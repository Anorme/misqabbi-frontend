import { FORM_QUESTION_TYPE } from '../../constants/events';

const BUILTIN_LABELS = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
};

/**
 * Read-only renderer for event registration/volunteer forms.
 * Used in admin preview and public submission (interactive mode added in later branches).
 *
 * @param {Object} props
 * @param {Object} props.formSchema - { builtinFields, customQuestions }
 * @param {'guestInfo'|'applicantInfo'} [props.identityKey='guestInfo'] - Which identity block to show
 * @param {Object} [props.values] - Current field values (read-only display when readOnly=true)
 * @param {boolean} [props.readOnly=true] - Disable inputs (foundation skeleton)
 */
const DynamicEventForm = ({
  formSchema,
  identityKey = 'guestInfo',
  values = {},
  readOnly = true,
}) => {
  if (!formSchema) {
    return <p className="text-sm text-gray-500">No form configured.</p>;
  }

  const { builtinFields = [], customQuestions = [] } = formSchema;
  const identityValues = values[identityKey] || values.guestInfo || values.applicantInfo || {};
  const customAnswers = values.formResponses?.customAnswers || values.customAnswers || {};

  const inputClass =
    'w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-700 text-sm';
  const disabledProps = readOnly ? { disabled: true, readOnly: true } : {};

  const renderBuiltinField = ({ field, required }) => (
    <div key={field} className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {BUILTIN_LABELS[field] || field}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
        value={identityValues[field] ?? ''}
        placeholder={BUILTIN_LABELS[field]}
        className={inputClass}
        {...disabledProps}
      />
    </div>
  );

  const renderCustomQuestion = question => {
    const { id, label, type, required, options = [] } = question;
    const answer = customAnswers[id];

    switch (type) {
      case FORM_QUESTION_TYPE.TEXTAREA:
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={typeof answer === 'string' ? answer : ''}
              rows={3}
              className={inputClass}
              {...disabledProps}
            />
          </div>
        );

      case FORM_QUESTION_TYPE.SELECT:
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              value={typeof answer === 'string' ? answer : ''}
              className={inputClass}
              {...disabledProps}
            >
              <option value="">Select an option</option>
              {options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      case FORM_QUESTION_TYPE.CHECKBOX:
        return (
          <div key={id} className="mb-4 flex items-start gap-2">
            <input
              type="checkbox"
              checked={Boolean(answer)}
              className="mt-1 h-4 w-4 rounded border-gray-300"
              {...disabledProps}
            />
            <label className="text-sm text-gray-700">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case FORM_QUESTION_TYPE.TEXT:
      default:
        return (
          <div key={id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="text"
              value={typeof answer === 'string' ? answer : ''}
              className={inputClass}
              {...disabledProps}
            />
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
