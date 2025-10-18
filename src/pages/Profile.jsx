import { useState, useEffect } from 'react';
import { MdPerson, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { useAuthState } from '../contexts/auth/useAuth';
import { updateUserProfile } from '../api/auth';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileField from '../components/profile/ProfileField';
import PasswordResetModal from '../components/profile/PasswordResetModal';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const Profile = () => {
  const { currentUser } = useAuthState();
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Show loading briefly while component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Show loading spinner immediately to prevent blank white space
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <LoadingSpinner size={60} color="var(--color-msq-gold-light)" />
          <p className="text-gray-600 mt-4 font-lato">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Extract user data with fallbacks
  const userName = currentUser?.name || currentUser?.displayName || '';
  const userEmail = currentUser?.email || '';
  const userLocation = currentUser?.location || '';
  const userContact = currentUser?.contact || currentUser?.phoneNumber || '';

  const handleSaveField = async (fieldName, value) => {
    const updateData = { [fieldName]: value };
    await updateUserProfile(updateData);
  };

  const handleSaveEmail = value => handleSaveField('email', value);
  const handleSaveLocation = value => handleSaveField('location', value);
  const handleSaveContact = value => handleSaveField('contact', value);

  return (
    <div className="min-h-screen w-screen flex md:items-center justify-center bg-white p-0 m-0 font-lato">
      <div className="w-full flex bg-white rounded-none md:rounded-2xl overflow-visible md:overflow-hidden mx-0 md:mx-4 my-0 md:my-16 min-h-screen md:min-h-0">
        <div className="w-full p-6 sm:p-8 flex flex-col justify-center">
          {/* Profile Header */}
          <ProfileHeader userName={userName} />

          {/* Profile Information Section */}
          <div className="space-y-6">
            <h2 className="font-bebas text-[20px] sm:text-[24px] font-bold uppercase text-msq-purple-rich text-center mb-6">
              Profile Information
            </h2>

            {/* Profile Fields */}
            <div className="space-y-4">
              {/* Full Name - Read Only */}
              <ProfileField
                label="Full Name"
                value={userName}
                icon={<MdPerson size={20} />}
                editable={false}
                placeholder="Your name"
              />

              {/* Email - Editable */}
              <ProfileField
                label="Email"
                value={userEmail}
                icon={<MdEmail size={20} />}
                editable={true}
                type="email"
                placeholder="Add your email address"
                onSave={handleSaveEmail}
              />

              {/* Location - Editable */}
              <ProfileField
                label="Location"
                value={userLocation}
                icon={<MdLocationOn size={20} />}
                editable={true}
                type="text"
                placeholder="Add your location to personalize your experience"
                onSave={handleSaveLocation}
              />

              {/* Contact - Editable */}
              <ProfileField
                label="Contact Number"
                value={userContact}
                icon={<MdPhone size={20} />}
                editable={true}
                type="tel"
                placeholder="Add your contact number for order updates"
                onSave={handleSaveContact}
              />
            </div>

            {/* Password Reset Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => setShowPasswordReset(true)}
                className="w-full sm:w-[60%] mx-auto bg-msq-purple-rich text-white py-3 font-semibold rounded-[18px] hover:bg-msq-purple-light transition-colors duration-200 cursor-pointer"
              >
                Reset Your Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        userEmail={userEmail}
      />
    </div>
  );
};

export default Profile;
