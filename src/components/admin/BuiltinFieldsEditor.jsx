import { BUILTIN_FORM_FIELDS, BUILTIN_FORM_FIELD } from '../../constants/events';

const FIELD_LABELS = {
  [BUILTIN_FORM_FIELD.NAME]: 'Full Name',
  [BUILTIN_FORM_FIELD.EMAIL]: 'Email',
  [BUILTIN_FORM_FIELD.PHONE]: 'Phone',
};

const BuiltinFieldsEditor = ({ builtinFields = [], onChange }) => {
  const isEnabled = field => builtinFields.some(item => item.field === field);

  const isRequired = field => {
    const item = builtinFields.find(entry => entry.field === field);
    return item?.required ?? false;
  };

  const toggleField = field => {
    if (isEnabled(field)) {
      onChange(builtinFields.filter(item => item.field !== field));
      return;
    }
    onChange([...builtinFields, { field, required: field !== BUILTIN_FORM_FIELD.PHONE }]);
  };

  const toggleRequired = field => {
    onChange(
      builtinFields.map(item =>
        item.field === field ? { ...item, required: !item.required } : item
      )
    );
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-900">Identity fields</h3>
      <ul className="space-y-2">
        {BUILTIN_FORM_FIELDS.map(field => {
          const enabled = isEnabled(field);
          return (
            <li
              key={field}
              className="flex flex-wrap items-center gap-3 rounded-lg bg-gray-50/60 px-3 py-2 shadow-sm"
            >
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => toggleField(field)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                {FIELD_LABELS[field]}
              </label>
              {enabled && (
                <label className="flex items-center gap-2 text-sm text-gray-600 ml-auto">
                  <input
                    type="checkbox"
                    checked={isRequired(field)}
                    onChange={() => toggleRequired(field)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Required
                </label>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BuiltinFieldsEditor;
