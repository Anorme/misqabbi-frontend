import { Eye, Edit, Trash2 } from 'lucide-react';

const ActionButton = ({ variant = 'secondary', onClick, children, ...props }) => {
  const baseClasses =
    'inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-msq-purple-rich text-white hover:bg-msq-purple-deep focus:ring-msq-purple-rich',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

// Predefined action buttons
export const ViewButton = ({ onClick }) => (
  <ActionButton variant="secondary" onClick={onClick}>
    <Eye className="h-4 w-4" />
  </ActionButton>
);

export const EditButton = ({ onClick }) => (
  <ActionButton variant="primary" onClick={onClick}>
    <Edit className="h-4 w-4" />
  </ActionButton>
);

export const DeleteButton = ({ onClick }) => (
  <ActionButton variant="danger" onClick={onClick}>
    <Trash2 className="h-4 w-4" />
  </ActionButton>
);

export default ActionButton;
