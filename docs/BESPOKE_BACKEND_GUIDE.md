# Backend brief: Bespoke request API

## 1. Endpoint and method

- **Method:** `POST`
- **Path:** `/bespoke` (or `/api/v1/bespoke` if you use a versioned base like the rest of the app).
- **Base URL:** Same as other APIs; frontend uses `VITE_API_URL` (e.g. `http://localhost:5000/api/v1`).
- **Request format:** **`multipart/form-data`** so reference images can be received and included in the outgoing email (e.g. as attachments or linked after upload).
- **Credentials:** Request must support **cookies** (`withCredentials: true`). Both **guests** and **logged-in users** can submit; no auth required for the route.

---

## 2. Request body (multipart/form-data)

All fields are sent as form fields. The frontend will build a `FormData` and send it. Backend should accept:

| Field name         | Type   | Required | Notes                                                                                                                                                                                                                            |
| ------------------ | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fullName`         | string | Yes      | Guest: from form. Logged-in: from session.                                                                                                                                                                                       |
| `email`            | string | Yes      | Valid email. Guest: from form. Logged-in: from session.                                                                                                                                                                          |
| `phone`            | string | No       | Guest only when provided. Optional.                                                                                                                                                                                              |
| `garmentType`      | string | No       | One of: `pants`, `skirts`, `dresses`, `dungarees`, or **`other`**. Empty string if not selected.                                                                                                                                 |
| `garmentTypeOther` | string | No       | **Only when `garmentType` is `other`.** Free text for custom garment type (e.g. "Blouse", "Cape", "Jumpsuit").                                                                                                                   |
| `measurements`     | string | No       | **Either:** (1) **JSON string** of an object when `garmentType` is a known category (see measurement keys below), or (2) **plain string** (free-form text) when `garmentType` is `other`. Omitted when no garment type selected. |
| `styleNotes`       | string | No       | Free text.                                                                                                                                                                                                                       |
| `description`      | string | Yes      | Min length 10. Sanitized on frontend.                                                                                                                                                                                            |
| `referencePhotos`  | files  | No       | **Multiple file parts** with the same name (e.g. `referencePhotos` or `referencePhotos[]`). Images only. Max **5** files, each max **10 MB**.                                                                                    |

---

## 3. Garment type "Other"

- When the user selects **Other**, the frontend sends:
  - `garmentType`: `"other"`
  - `garmentTypeOther`: optional string (e.g. "Blouse", "Cape") if the user filled it in.
  - `measurements`: **plain string** (free-form), e.g. "bust 34, waist 28, length 42 (inches)" or any format the user prefers. Not JSON.

- When `garmentType` is one of the known categories (`pants`, `skirts`, `dresses`, `dungarees`), `measurements` is a **JSON string** of an object (see below). `garmentTypeOther` is not sent.

---

## 4. Measurements (when garmentType is a known category)

When `garmentType` is one of `pants`, `skirts`, `dresses`, `dungarees`, `measurements` is a **JSON string** of an object. All values are in **inches** (numbers or empty string). Keys depend on category:

- **pants / skirts:** `waist`, `hip`, `length`
- **dresses:** `bust`, `waist`, `hip`, `shoulderWidth`, `length`
- **dungarees:** `bust`, `torsoLength`, `waist`, `hip`, `length`

Example (dresses):  
`{"bust":34,"waist":28,"hip":38,"shoulderWidth":14,"length":42}`

Empty fields may be `""` or omitted.

---

## 5. Validation (align with frontend)

- **fullName:** required, non-empty.
- **email:** required, valid email format.
- **description:** required, min length 10.
- **referencePhotos:** optional; if present: max 5 files, each max 10 MB, image types only (e.g. image/\*).
- **garmentType:** if present, must be one of: `pants`, `skirts`, `dresses`, `dungarees`, `other`; otherwise can be empty.
- **garmentTypeOther:** optional; only meaningful when `garmentType === 'other'`.
- **measurements:** if present and `garmentType` is not `other`, must be valid JSON; if `garmentType` is `other`, accept any non-empty string. Structure can be validated per category when `garmentType` is a known category.

Return **4xx** with a clear `message` (or equivalent) so the frontend can show `error.message` in a toast.

---

## 6. Response

**Success (e.g. 201 or 200):**

- Body should include at least:  
  `{ "success": true, "message": "…" }`
- Frontend shows a success toast and clears the form; it does not depend on extra fields.

**Error (4xx/5xx):**

- Frontend shows `error.message` (e.g. from `response.data.message` or your standard error payload). Prefer a single, user-friendly string in a `message` field.

---

## 7. Business logic (no persistence)

**Bespoke requests are not persisted on the backend.** They are turned into an email and sent to **the same recipient** as the contact form.

- **Transform** the submission (fullName, email, phone, garmentType, garmentTypeOther, measurements, styleNotes, description) into an email.
- **Send** that email to the **same recipient** used for contact form submissions.
- **Reference photos:** include them in the email (e.g. as attachments, or upload to a provider like Cloudinary and put the image URLs in the email body). Do not persist the request or the images in your own storage beyond what is needed to send the email.

---

## 8. Frontend integration note

The frontend will send a **multipart/form-data** request:

1. Build a `FormData` and append each scalar field as a string.
2. When `garmentType === 'other'`: append `garmentTypeOther` (if any) and append `measurements` as the **plain string** (free-form text).
3. When `garmentType` is a known category: append `measurements` as **`JSON.stringify(measurementsObject)`**.
4. Append each reference image file (same field name for multiple files).
5. POST the `FormData` with **no** manual `Content-Type` (so the browser sets `multipart/form-data` with boundary).
6. Use the same base URL and cookie credentials (`withCredentials: true`).
