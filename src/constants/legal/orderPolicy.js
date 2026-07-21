import { LEGAL_META } from './legalMeta';

export const ORDER_POLICY = {
  title: 'Order Policy',
  description: "Learn about Misqabbi's ordering process, payment options, and delivery policies.",
  subtitle:
    'Learn about our ordering process, payment options, and delivery to ensure a seamless experience.',
  canonicalPath: '/order-policy',
  lastUpdated: LEGAL_META.lastUpdated,
  sections: [
    {
      id: 'order-processing',
      title: 'Order Processing',
      icon: 'Clock',
      iconBadge: true,
      paragraphs: [
        'Orders are typically processed within 3 to 5 working days. Once confirmed, your production slot is secured.',
      ],
    },
    {
      id: 'order-slots',
      title: 'Order Slots',
      icon: 'Calendar',
      iconBadge: true,
      paragraphs: [
        'We accept a limited number of orders weekly to maintain quality and attention to detail. If slots are full, you may book an early slot for the following week or wait for availability.',
      ],
    },
    {
      id: 'delivery-and-pickup',
      title: 'Delivery and Pickup',
      icon: 'Truck',
      iconBadge: true,
      paragraphs: [
        'We use third-party couriers for delivery. You may also opt for pickup at designated locations or arrange delivery through your own preferred courier (at your own cost).',
      ],
    },
  ],
  closing: {
    variant: 'gradient',
    title: 'Quality Over Quantity',
    paragraphs: [
      'At Misqabbi, we believe in quality over quantity. Each piece is crafted with intention, care, and precision. By limiting our weekly production slots, we ensure that every order receives the attention it deserves.',
    ],
  },
  contactCta: {
    variant: 'solid',
    title: 'Ready to Place an Order?',
    body: "Have questions about our ordering process? We're here to help you every step of the way.",
    actions: [
      {
        label: 'WhatsApp Us',
        href: LEGAL_META.supportWhatsApp,
        external: true,
        style: 'primary',
      },
      {
        label: 'Email Support',
        href: 'mailto:help@misqabbi.com',
        style: 'secondary',
      },
    ],
  },
};
