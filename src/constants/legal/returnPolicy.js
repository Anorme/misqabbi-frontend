import { LEGAL_META } from './legalMeta';

export const RETURN_POLICY = {
  title: 'Return Policy',
  description: "Understand Misqabbi's return policy for made-to-measure fashion pieces.",
  subtitle: 'Understand our policies to ensure you have the best experience with Misqabbi.',
  canonicalPath: '/return-policy',
  lastUpdated: LEGAL_META.lastUpdated,
  intro: {
    title: 'Made-to-Measure Excellence',
    body: 'All Misqabbi pieces are made-to-measure, crafted specifically for you. Each garment is designed and tailored to your unique measurements, ensuring a perfect fit that celebrates your individual style.',
    icon: 'Package',
  },
  sections: [
    {
      id: 'our-return-policy',
      title: 'Our Return Policy',
      icon: 'ShieldCheck',
      paragraphs: [
        'We do not accept returns or issue refunds unless the item is defective or incorrect.',
      ],
    },
    {
      id: 'inspect-your-order',
      title: 'Inspect Your Order',
      icon: 'AlertCircle',
      paragraphs: [
        'Please inspect your order upon delivery to ensure everything meets your expectations.',
      ],
    },
    {
      id: 'need-assistance',
      title: 'Need Assistance?',
      icon: 'Phone',
      paragraphs: [
        `If there's an issue, contact us immediately at [${LEGAL_META.supportPhoneDisplay}](tel:${LEGAL_META.supportPhoneTel}).`,
        "We'll work with you to resolve any concerns promptly.",
      ],
    },
  ],
  closing: {
    variant: 'solid',
    icon: 'CheckCircle',
    title: 'Our Commitment to You',
    body: "We're committed to making things right if something's not as expected. Your confidence in Misqabbi is important to us, and we stand behind the quality of every piece we create.",
  },
  contactCta: {
    variant: 'muted',
    title: 'Have Questions or Concerns?',
    body: 'Our support team is here to help you every step of the way.',
    actions: [
      {
        label: 'WhatsApp Support',
        href: LEGAL_META.supportWhatsApp,
        external: true,
        style: 'primary',
      },
      {
        label: 'Call Us Now',
        href: `tel:${LEGAL_META.supportPhoneTel}`,
        style: 'secondary',
      },
      {
        label: 'Email Support',
        href: 'mailto:info@misqabbigh.com',
        style: 'secondary',
      },
    ],
  },
};
