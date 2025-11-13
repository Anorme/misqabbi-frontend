import { useState } from 'react';
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdNotes } from 'react-icons/md';
import { validateCheckoutForm } from '../../utils/checkoutValidation';
import InputField from '../form/InputField';
import PhoneNumberField from '../form/PhoneNumberField';

const CheckoutForm = ({ onPlaceOrder, userData, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: userData?.name || userData?.displayName || '',
    email: userData?.email || '',
    phone: userData?.contact || userData?.phoneNumber || '',
    countryCode: '+233',
    deliveryAddress: userData?.location || '',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const validation = validateCheckoutForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Call parent's order placement function with validated form data
    onPlaceOrder(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-bebas text-2xl text-msq-purple-rich uppercase tracking-wide">
          Delivery Information
        </h2>

        {/* Full Name */}
        <InputField
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          icon={<MdPerson size={20} />}
          iconPosition="left"
          error={errors.fullName}
          className="rounded-lg focus:ring-msq-purple-rich"
        />

        {/* Email */}
        <InputField
          label={
            <>
              Email Address <span className="text-red-500">*</span>
            </>
          }
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          icon={<MdEmail size={20} />}
          iconPosition="left"
          error={errors.email}
          required
          className="rounded-lg focus:ring-msq-purple-rich"
        />

        {/* Phone Number */}
        <PhoneNumberField
          label={
            <>
              Phone Number <span className="text-red-500">*</span>
            </>
          }
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          icon={<MdPhone size={20} />}
          error={errors.phone}
          required
        />

        {/* Delivery Address */}
        <InputField
          label={
            <>
              Delivery Address <span className="text-red-500">*</span>
            </>
          }
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleInputChange}
          placeholder="Enter your complete delivery address"
          icon={<MdLocationOn size={20} />}
          iconPosition="left"
          error={errors.deliveryAddress}
          required
          as="textarea"
          className="rounded-lg focus:ring-msq-purple-rich"
        />

        {/* Delivery Notes */}
        <InputField
          label="Delivery Instructions (Optional)"
          name="deliveryNotes"
          value={formData.deliveryNotes}
          onChange={handleInputChange}
          placeholder="Any special delivery instructions or notes..."
          icon={<MdNotes size={20} />}
          iconPosition="left"
          as="textarea"
          className="rounded-lg focus:ring-msq-purple-rich"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-msq-purple-rich text-white py-4 px-6 rounded-lg font-lato font-semibold text-lg hover:bg-msq-purple transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md cursor-pointer"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Order...</span>
            </div>
          ) : (
            'Place Order'
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
