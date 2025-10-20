const StatCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-msq-gold p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {Icon && <Icon className="h-8 w-8 text-msq-purple-rich" />}
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && <p className="text-sm text-gray-500 mt-1">{trend}</p>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
