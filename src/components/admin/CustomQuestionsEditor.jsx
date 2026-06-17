import { FORM_QUESTION_TYPE, FORM_QUESTION_TYPES } from '../../constants/events';

const TYPE_LABELS = {
  [FORM_QUESTION_TYPE.TEXT]: 'Short text',
  [FORM_QUESTION_TYPE.TEXTAREA]: 'Long text',
  [FORM_QUESTION_TYPE.SELECT]: 'Dropdown',
  [FORM_QUESTION_TYPE.CHECKBOX]: 'Checkbox',
};

const createQuestionId = () => `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const CustomQuestionsEditor = ({ customQuestions = [], onChange }) => {
  const addQuestion = () => {
    onChange([
      ...customQuestions,
      {
        id: createQuestionId(),
        label: 'New question',
        type: FORM_QUESTION_TYPE.TEXT,
        required: false,
        options: [],
      },
    ]);
  };

  const updateQuestion = (index, patch) => {
    onChange(customQuestions.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  };

  const removeQuestion = index => {
    onChange(customQuestions.filter((_, i) => i !== index));
  };

  const moveQuestion = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= customQuestions.length) return;
    const next = [...customQuestions];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const updateOptions = (index, raw) => {
    const options = raw
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean);
    updateQuestion(index, { options });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-900">Custom questions</h3>
          <p className="text-xs text-gray-500">
            Add optional questions beyond the identity fields.
          </p>
        </div>
        <button
          type="button"
          onClick={addQuestion}
          className="px-3 py-1.5 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Add question
        </button>
      </div>

      {customQuestions.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No custom questions yet.</p>
      ) : (
        <ul className="space-y-4">
          {customQuestions.map((question, index) => (
            <li key={question.id} className="rounded-lg border border-gray-200 p-4 space-y-3">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs text-gray-500 mb-1">Label</label>
                  <input
                    type="text"
                    value={question.label}
                    onChange={e => updateQuestion(index, { label: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                  />
                </div>
                <div className="w-40">
                  <label className="block text-xs text-gray-500 mb-1">Type</label>
                  <select
                    value={question.type}
                    onChange={e => {
                      const type = e.target.value;
                      const patch = { type };
                      if (type === FORM_QUESTION_TYPE.SELECT && !question.options?.length) {
                        patch.options = ['Option 1'];
                      }
                      updateQuestion(index, patch);
                    }}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                  >
                    {FORM_QUESTION_TYPES.map(type => (
                      <option key={type} value={type}>
                        {TYPE_LABELS[type]}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm text-gray-600 pt-6">
                  <input
                    type="checkbox"
                    checked={Boolean(question.required)}
                    onChange={e => updateQuestion(index, { required: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  Required
                </label>
              </div>

              {question.type === FORM_QUESTION_TYPE.SELECT && (
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Options (one per line)</label>
                  <textarea
                    rows={3}
                    value={(question.options || []).join('\n')}
                    onChange={e => updateOptions(index, e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md"
                  />
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveQuestion(index, -1)}
                  className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-40"
                >
                  Move up
                </button>
                <button
                  type="button"
                  disabled={index === customQuestions.length - 1}
                  onClick={() => moveQuestion(index, 1)}
                  className="px-2 py-1 text-xs bg-gray-100 rounded disabled:opacity-40"
                >
                  Move down
                </button>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="px-2 py-1 text-xs text-red-600 bg-red-50 rounded hover:bg-red-100 ml-auto"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomQuestionsEditor;
