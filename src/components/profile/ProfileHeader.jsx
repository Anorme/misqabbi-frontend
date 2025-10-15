const ProfileHeader = ({ userName }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="font-bebas text-[28px] sm:text-[32px] font-bold uppercase text-msq-purple-rich mb-2">
        Welcome back, {userName}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base font-lato">
        Your personal space to manage your details
      </p>
    </div>
  );
};

export default ProfileHeader;
