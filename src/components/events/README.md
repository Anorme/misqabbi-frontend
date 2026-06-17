# Event form schema

Registration and volunteer forms share the same schema shape consumed by `DynamicEventForm`:

```js
{
  builtinFields: [{ field: 'name' | 'email' | 'phone', required: boolean }],
  customQuestions: [
    { id, label, type: 'text' | 'textarea' | 'select' | 'checkbox', required, options? }
  ]
}
```

- **Registration forms** use `identityKey="guestInfo"` — answers live under `guestInfo` at submit time.
- **Volunteer forms** use `identityKey="applicantInfo"` — same builtin fields, different payload key.

Admin editing lives in `EventFormBuilder` (preview + save via `upsertAdminRegistrationForm` / `upsertAdminVolunteerForm`). `DynamicEventForm` is read-only in Branch 4; interactive validation and submission arrive in later branches.

Select questions require at least one option before save (backend enforced). Question `id` values must stay stable once the form is published so existing answers remain addressable.
