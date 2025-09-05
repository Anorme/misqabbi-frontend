import { useState } from 'react';
import { startSignInWithEmailLink } from '../../utils/firebase';
import { isValidEmail } from '../../utils/validation';

export const EmailSignInModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSendLink = async () => {
    if (!isValidEmail(email)) {
      setFeedback('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await startSignInWithEmailLink(email);
      setFeedback('Check your inbox for the sign-in link.');
      setTimeout(onClose, 3000);
    } catch (error) {
      console.warn('Error sending link', error);
      setFeedback('Failed to send link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-msq-purple bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md font-lato">
        <h2 className="text-2xl font-bebas text-msq-purple uppercase mb-4 text-center">
          Continue with Email
        </h2>
        <p className="text-sm text-center mb-4 text-msq-purple">
          Enter your email to begin your style journey — no password needed.
        </p>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full p-3 border border-msq-purple rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-msq-gold"
        />
        <button
          onClick={handleSendLink}
          disabled={loading || !email}
          className="w-full py-2 px-4 bg-msq-gold text-white rounded-md hover:bg-msq-gold-light transition duration-200"
        >
          {loading ? 'Sending…' : 'Send Link'}
        </button>
        {feedback && <p className="text-sm text-center mb-4 text-red-500">{feedback}</p>}
      </div>
    </div>
  );
};
