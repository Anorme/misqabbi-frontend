import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 focus:outline-none cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-900 pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp size={24} className="text-msq-purple-rich flex-shrink-0" />
        ) : (
          <ChevronDown size={24} className="text-msq-purple-rich flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
