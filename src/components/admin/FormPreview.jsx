import DynamicEventForm from '../events/DynamicEventForm';

const FormPreview = ({ formSchema, identityKey = 'guestInfo' }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
    <h3 className="text-sm font-medium text-gray-900 mb-3">Preview</h3>
    <DynamicEventForm formSchema={formSchema} identityKey={identityKey} readOnly />
  </div>
);

export default FormPreview;
