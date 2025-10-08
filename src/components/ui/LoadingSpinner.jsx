import { LoaderCircle } from 'lucide-react';
import '../../styles/loading-spinner.css';

export const LoadingSpinner = ({ size = 24, color = '#cfb484' }) => (
  <div className="spinner-container">
    <LoaderCircle size={size} color={color} className="spinner" />
  </div>
);
