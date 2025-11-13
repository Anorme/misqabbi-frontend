import { useState } from 'react';
import { User, Mail, MessageSquare, Phone, MessageCircle } from 'lucide-react';
import { submitContactForm } from '../../api/contact';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { isValidEmail } from '../../utils/validation';
import InputField from '../form/InputField';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      showSuccessToast('Thank you for reaching out! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      showErrorToast(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Custom styling classes for ContactForm inputs
  // Note: Don't include horizontal padding (px/pl/pr) here - InputField handles it based on icon position
  const customInputClasses =
    'py-2 sm:py-2.5 text-sm border-gray-200 rounded-lg bg-gray-50/50 focus:bg-white focus:border-msq-purple-rich focus:ring-1 focus:ring-msq-purple-rich/20 text-gray-900 placeholder:text-gray-400';
  const customTextareaClasses = `${customInputClasses} min-h-[80px] sm:min-h-[100px]`;

  return (
    <div className="w-full px-2 sm:px-3 lg:px-6 py-4 sm:py-6 lg:py-10 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h1 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-msq-purple-rich uppercase tracking-wider mb-2 sm:mb-3 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto font-lato leading-relaxed font-light px-2 hidden sm:block">
            We're here to help you feel confident, beautiful, and uniquely you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl p-3 sm:p-4 lg:p-6 border border-gray-100">
            <div className="mb-3 sm:mb-4">
              <h2 className="font-bebas text-xl sm:text-2xl lg:text-3xl text-msq-purple-rich uppercase tracking-wide mb-1.5 sm:mb-2">
                Send us a Message
              </h2>
              <p className="text-xs md:text-base text-gray-600 font-lato leading-snug hidden sm:block">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 text-left">
              {/* Name Field */}
              <div className="group">
                <InputField
                  label={
                    <>
                      Name <span className="text-red-500">*</span>
                    </>
                  }
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  icon={<User size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                  iconPosition="left"
                  error={errors.name}
                  required
                  className={customInputClasses}
                  labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                  aria-required="true"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <InputField
                  label={
                    <>
                      Email <span className="text-red-500">*</span>
                    </>
                  }
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  icon={<Mail size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                  iconPosition="left"
                  error={errors.email}
                  required
                  className={customInputClasses}
                  labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>

              {/* Message Field */}
              <div className="group">
                <InputField
                  label={
                    <>
                      Message <span className="text-red-500">*</span>
                    </>
                  }
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  icon={<MessageSquare size={14} strokeWidth={1.5} className="sm:w-4 sm:h-4" />}
                  iconPosition="left"
                  error={errors.message}
                  required
                  as="textarea"
                  className={customTextareaClasses}
                  labelClassName="text-xs font-medium text-gray-700 mb-1 sm:mb-1.5"
                  aria-required="true"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-0.5 sm:pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-msq-purple-rich to-msq-purple text-white py-2 sm:py-2.5 lg:py-3 px-5 sm:px-6 rounded-lg font-lato font-semibold text-sm tracking-wide hover:shadow-lg hover:shadow-msq-purple-rich/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group relative overflow-hidden"
                  aria-label={isLoading ? 'Sending message...' : 'Send message'}
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    {isLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:translate-x-0.5 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </>
                    )}
                  </span>
                  {!isLoading && (
                    <span className="absolute inset-0 bg-gradient-to-r from-msq-purple to-msq-purple-rich opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column - Get in Touch Section */}
          <div className="bg-gradient-to-br from-msq-purple-rich to-msq-purple-deep rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl p-3 sm:p-4 lg:p-6 text-white flex flex-col border border-msq-purple-rich/20">
            <div className="mb-4 sm:mb-5">
              <h2 className="font-bebas text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide mb-1.5 sm:mb-2">
                Connect with Us
              </h2>
              <p className="text-white/90 text-xs md:text-base font-lato leading-snug font-light hidden sm:block">
                Prefer a more direct conversation? Reach out through any of these channels.
              </p>
            </div>

            <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 flex-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/233507226511"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-md hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/15 rounded-lg flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <MessageCircle
                    size={16}
                    className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-0.5 font-lato group-hover:text-white transition-colors">
                    WhatsApp
                  </h3>
                  <p className="text-white/80 text-xs font-lato group-hover:text-white/90 transition-colors">
                    +233 50 722 6511
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@misqabbigh.com"
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-md hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/15 rounded-lg flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Mail
                    size={16}
                    className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-0.5 font-lato group-hover:text-white transition-colors">
                    Email
                  </h3>
                  <p className="text-white/80 text-xs font-lato group-hover:text-white/90 transition-colors break-all">
                    info@misqabbigh.com
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+233507226511"
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-md hover:shadow-white/10 hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/15 rounded-lg flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-md">
                  <Phone
                    size={16}
                    className="text-white sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs sm:text-sm lg:text-base mb-0.5 font-lato group-hover:text-white transition-colors">
                    Phone
                  </h3>
                  <p className="text-white/80 text-xs font-lato group-hover:text-white/90 transition-colors">
                    +233 50 722 6511
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </a>
            </div>

            {/* Closing Message */}
            <div className="mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 lg:pt-5 border-t border-white/20">
              <p className="text-white/90 italic font-lato text-center leading-snug text-xs sm:text-sm">
                "Made with love, made for you."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
