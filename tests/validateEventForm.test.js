import { describe, expect, test } from 'vitest';

import { FORM_QUESTION_TYPE } from '../src/constants/events';
import { validateEventForm } from '../src/utils/events/validateEventForm';

const baseSchema = {
  builtinFields: [
    { field: 'name', required: true },
    { field: 'email', required: true },
  ],
  customQuestions: [
    {
      id: 'diet',
      label: 'Dietary requirements',
      type: FORM_QUESTION_TYPE.TEXT,
      required: false,
    },
    {
      id: 'terms',
      label: 'Accept terms',
      type: FORM_QUESTION_TYPE.CHECKBOX,
      required: true,
    },
  ],
};

describe('validateEventForm', () => {
  test('returns valid for complete identity and custom answers', () => {
    const result = validateEventForm(baseSchema, {
      identity: { name: 'Ama Mensah', email: 'ama@example.com' },
      customAnswers: { terms: true },
    });

    expect(result.isValid).toBe(true);
    expect(result.normalized.identity).toEqual({
      name: 'Ama Mensah',
      email: 'ama@example.com',
    });
    expect(result.normalized.customAnswers).toEqual({ terms: true });
  });

  test('flags missing required builtin fields', () => {
    const result = validateEventForm(baseSchema, {
      identity: { name: '', email: '' },
      customAnswers: {},
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.identity.name).toBe('Full name is required');
    expect(result.errors.identity.email).toBe('Email is required');
  });

  test('uses resolvedEmail for authenticated users without email field value', () => {
    const result = validateEventForm(baseSchema, {
      identity: { name: 'Ama Mensah' },
      customAnswers: { terms: true },
      resolvedEmail: 'ama@example.com',
    });

    expect(result.isValid).toBe(true);
    expect(result.normalized.identity.email).toBe('ama@example.com');
  });

  test('validates select options and required custom questions', () => {
    const schema = {
      builtinFields: [{ field: 'email', required: true }],
      customQuestions: [
        {
          id: 'size',
          label: 'T-shirt size',
          type: FORM_QUESTION_TYPE.SELECT,
          required: true,
          options: ['S', 'M', 'L'],
        },
      ],
    };

    const invalid = validateEventForm(schema, {
      identity: { email: 'ama@example.com' },
      customAnswers: { size: 'XL' },
    });
    expect(invalid.isValid).toBe(false);
    expect(invalid.errors.customAnswers.size).toContain('configured options');

    const missing = validateEventForm(schema, {
      identity: { email: 'ama@example.com' },
      customAnswers: {},
    });
    expect(missing.isValid).toBe(false);
    expect(missing.errors.customAnswers.size).toBe('T-shirt size is required');
  });
});
