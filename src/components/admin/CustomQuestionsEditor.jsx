import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';

import { FORM_QUESTION_TYPE, FORM_QUESTION_TYPES } from '../../constants/events';

const TYPE_LABELS = {
  [FORM_QUESTION_TYPE.TEXT]: 'Short text',
  [FORM_QUESTION_TYPE.TEXTAREA]: 'Long text',
  [FORM_QUESTION_TYPE.SELECT]: 'Dropdown',
  [FORM_QUESTION_TYPE.CHECKBOX]: 'Checkbox',
};

const createQuestionId = () => `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const getQuestionOptions = question => (question.options?.length ? question.options : ['Option 1']);

const inputClass =
  'w-full rounded-md bg-gray-50 px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-gray-100 outline-none transition focus:bg-white focus:ring-2 focus:ring-msq-purple-rich/30';
const labelClass = 'block text-left text-xs font-medium text-gray-500 mb-1';
const iconButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-30';

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

  const updateOption = (questionIndex, optionIndex, value) => {
    const question = customQuestions[questionIndex];
    const options = [...getQuestionOptions(question)];
    options[optionIndex] = value;
    updateQuestion(questionIndex, { options });
  };

  const addOption = questionIndex => {
    const question = customQuestions[questionIndex];
    const options = getQuestionOptions(question);
    updateQuestion(questionIndex, { options: [...options, `Option ${options.length + 1}`] });
  };

  const removeOption = (questionIndex, optionIndex) => {
    const question = customQuestions[questionIndex];
    const options = getQuestionOptions(question);
    if (options.length <= 1) return;
    updateQuestion(questionIndex, { options: options.filter((_, i) => i !== optionIndex) });
  };

  const moveOption = (questionIndex, optionIndex, direction) => {
    const question = customQuestions[questionIndex];
    const options = getQuestionOptions(question);
    const target = optionIndex + direction;
    if (target < 0 || target >= options.length) return;
    const next = [...options];
    [next[optionIndex], next[target]] = [next[target], next[optionIndex]];
    updateQuestion(questionIndex, { options: next });
  };

  const normalizeOptions = questionIndex => {
    const question = customQuestions[questionIndex];
    const options = (question.options || []).map(option => option.trim()).filter(Boolean);
    updateQuestion(questionIndex, { options: options.length ? options : ['Option 1'] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-medium text-gray-900">Custom questions</h3>
        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-800 transition hover:bg-gray-200"
        >
          <Plus className="mr-1 h-4 w-4" />
          Add question
        </button>
      </div>

      {customQuestions.length === 0 ? (
        <p className="text-sm text-gray-500 italic">No custom questions yet.</p>
      ) : (
        <ul className="space-y-4">
          {customQuestions.map((question, index) => (
            <li key={question.id} className="space-y-4 rounded-xl bg-gray-50/60 p-4 shadow-sm">
              <div className="flex flex-wrap items-start gap-3">
                <div className="flex-1 min-w-[200px]">
                  <label className={labelClass}>Label</label>
                  <input
                    type="text"
                    value={question.label}
                    onChange={e => updateQuestion(index, { label: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="w-40">
                  <label className={labelClass}>Type</label>
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
                    className={inputClass}
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
                <div className="space-y-2">
                  <label className={labelClass}>Options</label>
                  <ul className="space-y-2">
                    {getQuestionOptions(question).map((option, optionIndex) => (
                      <li key={optionIndex} className="flex flex-wrap items-center gap-1.5">
                        <input
                          type="text"
                          value={option}
                          onChange={e => updateOption(index, optionIndex, e.target.value)}
                          onBlur={() => normalizeOptions(index)}
                          className={`${inputClass} min-w-[200px] flex-1`}
                        />
                        <button
                          type="button"
                          disabled={optionIndex === 0}
                          onClick={() => moveOption(index, optionIndex, -1)}
                          className={iconButtonClass}
                          aria-label="Move option up"
                          title="Move option up"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={optionIndex === getQuestionOptions(question).length - 1}
                          onClick={() => moveOption(index, optionIndex, 1)}
                          className={iconButtonClass}
                          aria-label="Move option down"
                          title="Move option down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          disabled={getQuestionOptions(question).length <= 1}
                          onClick={() => removeOption(index, optionIndex)}
                          className={`${iconButtonClass} text-red-500 hover:bg-red-50 hover:text-red-600`}
                          aria-label="Remove option"
                          title="Remove option"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => addOption(index)}
                    className="inline-flex items-center rounded-md px-2.5 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add option
                  </button>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveQuestion(index, -1)}
                  className={iconButtonClass}
                  aria-label="Move question up"
                  title="Move question up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={index === customQuestions.length - 1}
                  onClick={() => moveQuestion(index, 1)}
                  className={iconButtonClass}
                  aria-label="Move question down"
                  title="Move question down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className={`${iconButtonClass} text-red-500 hover:bg-red-50 hover:text-red-600`}
                  aria-label="Remove question"
                  title="Remove question"
                >
                  <Trash2 className="h-4 w-4" />
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
