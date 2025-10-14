import { ORDER_STATUS_CLASSES } from './constants';

const StatusBadge = ({ status }) => {
  const cls = ORDER_STATUS_CLASSES[status] || ORDER_STATUS_CLASSES.pending;
  return <span className={`text-xs px-2 py-1 rounded-full ${cls}`}>{status}</span>;
};

export default StatusBadge;
