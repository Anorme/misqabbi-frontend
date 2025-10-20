import { Plus } from 'lucide-react';

const PageHeader = ({ title, actionLabel, onAction }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bebas text-msq-purple-rich uppercase tracking-wide">
          {title}
        </h1>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="inline-flex items-center px-4 py-2 bg-msq-purple-rich text-white text-sm font-medium rounded-md hover:bg-msq-purple-deep transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
