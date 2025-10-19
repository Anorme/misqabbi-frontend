import { useState } from 'react';
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdNotes } from 'react-icons/md';
import { validateCheckoutForm } from '../../utils/checkoutValidation';

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

  const inputClasses =
    'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent transition-colors duration-200 font-lato';
  const errorClasses = 'text-red-500 text-sm mt-1 font-lato';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h2 className="font-bebas text-2xl text-msq-purple-rich uppercase tracking-wide">
          Delivery Information
        </h2>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-lato">
            Full Name
          </label>
          <div className="relative">
            <MdPerson
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={formData.fullName}
              onChange={e => handleInputChange('fullName', e.target.value)}
              className={`${inputClasses} pl-10`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && <p className={errorClasses}>{errors.fullName}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-lato">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MdEmail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={`${inputClasses} pl-10`}
              placeholder="Enter your email address"
              required
            />
          </div>
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-lato">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex">
            <select
              className="px-3 py-3 border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-msq-purple-rich focus:border-transparent transition-colors duration-200 font-lato cursor-pointer bg-gray-50"
              value={formData.countryCode || '+233'}
              onChange={e => handleInputChange('countryCode', e.target.value)}
            >
              <option value="+233">🇬🇭 +233</option>
            </select>
            <div className="relative flex-1">
              <MdPhone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleInputChange('phone', e.target.value)}
                className={`${inputClasses} pl-10 rounded-l-none border-l-0`}
                placeholder="241234567"
                pattern="[0-9]*"
                inputMode="numeric"
                required
              />
            </div>
          </div>
          {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-lato">
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MdLocationOn className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              value={formData.deliveryAddress}
              onChange={e => handleInputChange('deliveryAddress', e.target.value)}
              className={`${inputClasses} pl-10 min-h-[80px] resize-none`}
              placeholder="Enter your complete delivery address"
              required
            />
          </div>
          {errors.deliveryAddress && <p className={errorClasses}>{errors.deliveryAddress}</p>}
        </div>

        {/* Delivery Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 font-lato">
            Delivery Instructions (Optional)
          </label>
          <div className="relative">
            <MdNotes className="absolute left-3 top-3 text-gray-400" size={20} />
            <textarea
              value={formData.deliveryNotes}
              onChange={e => handleInputChange('deliveryNotes', e.target.value)}
              className={`${inputClasses} pl-10 min-h-[80px] resize-none`}
              placeholder="Any special delivery instructions or notes..."
            />
          </div>
        </div>
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
