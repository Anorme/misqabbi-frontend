import { useState } from 'react';
import { User, Mail, MessageSquare, Phone, MessageCircle } from 'lucide-react';
import { submitContactForm } from '../../api/contact';
import { showSuccessToast, showErrorToast } from '../../utils/showToast';
import { isValidEmail } from '../../utils/validation';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
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

  const inputClasses =
    'w-full px-4 py-3.5 pl-12 border border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white focus:border-msq-purple-rich focus:ring-2 focus:ring-msq-purple-rich/20 focus:outline-none transition-all duration-300 font-lato text-gray-900 placeholder:text-gray-400';
  const textareaClasses = `${inputClasses} min-h-[140px] resize-none pt-3.5`;
  const errorClasses = 'text-red-500 text-sm mt-1.5 font-lato flex items-center gap-1';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-2.5 font-lato';

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-msq-purple-rich mx-auto mb-4"></div>
          </div>
          <h1 className="font-bebas text-5xl md:text-6xl lg:text-7xl text-msq-purple-rich uppercase tracking-wider mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-lato leading-relaxed font-light">
            We're here to help you feel confident, beautiful, and uniquely you. Whether you have a
            question about our made-to-measure pieces, need styling advice, or simply want to
            connect, we'd love to hear from you.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-10 lg:p-12 border border-gray-100">
            <div className="mb-8">
              <h2 className="font-bebas text-3xl md:text-4xl text-msq-purple-rich uppercase tracking-wide mb-3">
                Send us a Message
              </h2>
              <p className="text-gray-600 font-lato leading-relaxed text-base">
                Fill out the form below and we'll get back to you as soon as possible. Your voice
                matters to us.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name Field */}
              <div className="group">
                <label htmlFor="name" className={labelClasses}>
                  Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-msq-purple-rich transition-colors duration-300">
                    <User size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    className={inputClasses}
                    placeholder="Your name"
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </div>
                {errors.name && (
                  <p id="name-error" className={errorClasses} role="alert">
                    <span className="text-red-500">•</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="group">
                <label htmlFor="email" className={labelClasses}>
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-msq-purple-rich transition-colors duration-300">
                    <Mail size={20} strokeWidth={1.5} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className={inputClasses}
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className={errorClasses} role="alert">
                    <span className="text-red-500">•</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div className="group">
                <label htmlFor="message" className={labelClasses}>
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-msq-purple-rich transition-colors duration-300">
                    <MessageSquare size={20} strokeWidth={1.5} />
                  </div>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={e => handleInputChange('message', e.target.value)}
                    className={textareaClasses}
                    placeholder="Tell us how we can help you..."
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                </div>
                {errors.message && (
                  <p id="message-error" className={errorClasses} role="alert">
                    <span className="text-red-500">•</span>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer bg-gradient-to-r from-msq-purple-rich to-msq-purple text-white py-4 px-8 rounded-xl font-lato font-semibold text-base tracking-wide hover:shadow-xl hover:shadow-msq-purple-rich/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none group relative overflow-hidden"
                  aria-label={isLoading ? 'Sending message...' : 'Send message'}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
          <div className="bg-gradient-to-br from-msq-purple-rich to-msq-purple-deep rounded-2xl shadow-2xl p-10 lg:p-12 text-white flex flex-col border border-msq-purple-rich/20">
            <div className="mb-10">
              <div className="inline-block mb-4">
                <div className="w-12 h-1 bg-white/40"></div>
              </div>
              <h2 className="font-bebas text-3xl md:text-4xl uppercase tracking-wide mb-4">
                Connect with Us
              </h2>
              <p className="text-white/90 text-base font-lato leading-relaxed font-light">
                Prefer a more direct conversation? Reach out to us through any of these channels.
                We're always here to support you on your style journey.
              </p>
            </div>

            <div className="space-y-4 flex-1">
              {/* WhatsApp */}
              <a
                href="https://wa.me/233507226511"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <MessageCircle size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 font-lato group-hover:text-white transition-colors">
                    WhatsApp
                  </h3>
                  <p className="text-white/80 text-sm font-lato group-hover:text-white/90 transition-colors">
                    +233 50 722 6511
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-white/60"
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
                href="mailto:support@misqabbigh.com"
                className="flex items-center gap-5 p-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Mail size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 font-lato group-hover:text-white transition-colors">
                    Email
                  </h3>
                  <p className="text-white/80 text-sm font-lato group-hover:text-white/90 transition-colors break-all">
                    support@misqabbigh.com
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-white/60"
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
                className="flex items-center gap-5 p-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-xl transition-all duration-300 group border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center group-hover:bg-white/25 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Phone size={26} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 font-lato group-hover:text-white transition-colors">
                    Phone
                  </h3>
                  <p className="text-white/80 text-sm font-lato group-hover:text-white/90 transition-colors">
                    +233 50 722 6511
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-5 h-5 text-white/60"
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
            <div className="mt-10 pt-8 border-t border-white/20">
              <p className="text-white/90 italic font-lato text-center leading-relaxed text-base">
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
