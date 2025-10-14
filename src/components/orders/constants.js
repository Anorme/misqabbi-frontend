import { CheckCircle2, Loader2, PackageCheck, Bike, Package, Truck, Home } from 'lucide-react';

// Currency to use across Orders components
export const ORDERS_CURRENCY = 'GHC';

// Single source of truth: step order, labels, and icons
export const ORDER_STEPS = [
  { key: 'accepted', label: 'Order accepted', icon: CheckCircle2 },
  { key: 'processing', label: 'We’re carefully preparing your items', icon: Loader2 },
  { key: 'ready', label: 'Order is ready for dispatch', icon: PackageCheck },
  { key: 'enroute_pickup', label: 'Courier en route to our studio', icon: Bike },
  { key: 'picked_up', label: 'Order picked up by courier', icon: Package },
  { key: 'in_transit', label: 'Your order is on its way', icon: Truck },
  { key: 'arrived', label: 'Courier has arrived', icon: Home },
];

// Uniform status list derived from steps
export const ORDER_STATUS = ORDER_STEPS.map(s => s.key);

// Status → index derived from steps
export const statusToIndex = status => {
  const idx = ORDER_STEPS.findIndex(s => s.key === status);
  return idx >= 0 ? idx : 0;
};

// Status → Tailwind class mapping (derived; customize per key)
export const ORDER_STATUS_CLASSES = ORDER_STATUS.reduce((acc, key) => {
  let cls = 'bg-msq-gold-light/20 text-msq-purple-deep';
  if (key === 'processing' || key === 'ready') cls = 'bg-msq-gold-light/20 text-msq-purple-deep';
  if (key === 'enroute_pickup' || key === 'in_transit') cls = 'bg-blue-100 text-blue-700';
  if (key === 'picked_up') cls = 'bg-purple-100 text-msq-purple-deep';
  if (key === 'arrived') cls = 'bg-emerald-100 text-emerald-700';
  acc[key] = cls;
  return acc;
}, {});
