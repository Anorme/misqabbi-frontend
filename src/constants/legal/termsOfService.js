import { LEGAL_META } from './legalMeta';

export const TERMS_OF_SERVICE = {
  title: 'Terms of Service',
  description:
    'Read the terms that govern your use of the Misqabbi website, purchases, events, and related services.',
  subtitle:
    'These Terms of Service govern your access to and use of the Misqabbi website, products, events, and related services.',
  canonicalPath: '/terms-of-service',
  lastUpdated: LEGAL_META.lastUpdated,
  intro: {
    title: 'Agreement to these terms',
    body: `By accessing or using misqabbigh.com, creating an account, placing an order, registering for an event, or otherwise using Misqabbi services, you agree to these Terms of Service and our [Privacy Policy](/privacy-policy). If you do not agree, please do not use our services. Electronic contracts and records are recognised under ${LEGAL_META.electronicTransactionsLaw}.`,
    icon: 'FileText',
  },
  sections: [
    {
      id: 'acceptance',
      title: 'Acceptance of terms',
      icon: 'CheckCircle',
      paragraphs: [
        'These Terms form a binding agreement between you and Misqabbi. We may update these Terms from time to time. The "Last updated" date at the top of this page shows the latest revision. If you continue to use the site after changes are posted, you should review the updated Terms.',
      ],
    },
    {
      id: 'about-and-eligibility',
      title: 'About Misqabbi and eligibility',
      icon: 'User',
      paragraphs: [
        'Misqabbi offers made-to-measure and ready fashion products, bespoke request services, and event-related experiences through our website.',
        'You must be able to form a legally binding contract under the laws of Ghana to use our services. If you use the site on behalf of someone else, you confirm that you have authority to bind them to these Terms.',
      ],
    },
    {
      id: 'accounts-and-guest-checkout',
      title: 'Accounts and guest checkout',
      icon: 'Lock',
      paragraphs: [
        'You may browse as a visitor, check out as a guest, or create an account with email and password or Google sign-in. You are responsible for keeping your login details confidential and for activity on your account.',
        'Provide accurate information and update it when it changes. We may suspend or close accounts that are used in a way that breaches these Terms or creates security or fraud risk.',
      ],
    },
    {
      id: 'orders-and-pricing',
      title: 'Orders, pricing, and made-to-measure',
      icon: 'Package',
      paragraphs: [
        'Product displays, prices, and availability on the website are invitations to order and may change. Prices are shown in Ghana Cedis (GHS) unless stated otherwise.',
        'An order is accepted when we confirm it and process payment successfully, subject to availability and our production capacity. We may cancel or refuse an order if there is an obvious pricing or stock error, suspected fraud, or an inability to fulfil the order.',
        'Many Misqabbi pieces are made-to-measure or produced in limited weekly slots. Measurements and size selections you provide must be accurate. Fit issues that result from incorrect measurements you supplied are your responsibility, except where the item is defective or incorrect as described in our Return Policy.',
      ],
    },
    {
      id: 'payments',
      title: 'Payments',
      icon: 'ShieldCheck',
      paragraphs: [
        'Payments are processed by Paystack. By completing checkout, you authorise the applicable charges for your order or event ticket.',
        'You must provide valid payment details and ensure sufficient funds. We are not responsible for payment failures caused by your bank, card issuer, or the payment provider, but we will help you understand the status of a failed or pending payment where we can.',
      ],
    },
    {
      id: 'shipping-and-delivery',
      title: 'Shipping and delivery',
      icon: 'Truck',
      paragraphs: [
        'Delivery timelines, couriers, and pickup options are described in our [Order Policy](/order-policy). Delivery uses third-party couriers unless you arrange pickup or your own courier.',
        'Risk in goods passes in accordance with applicable Ghana sale-of-goods principles and the delivery method you choose. Please inspect items promptly on receipt.',
      ],
    },
    {
      id: 'returns-and-refunds',
      title: 'Returns and refunds',
      icon: 'AlertCircle',
      paragraphs: [
        'Because many items are made-to-measure, returns and refunds are limited. Our [Return Policy](/return-policy) explains when returns or remedies may apply, typically for defective or incorrect items.',
        'If you believe an item is defective or incorrect, contact us promptly using the details in the Return Policy so we can help resolve the issue.',
      ],
    },
    {
      id: 'events-and-tickets',
      title: 'Events, tickets, and volunteer applications',
      icon: 'Calendar',
      paragraphs: [
        'Event pages may allow registration, paid tickets, or volunteer applications. Event details, pricing, capacity, and any additional rules shown on the event page form part of your agreement for that event.',
        'Ticket purchases are subject to successful payment. Unless an event page states otherwise, tickets and registrations are generally non-transferable and refundable only if Misqabbi cancels or materially changes the event.',
        'Volunteer applications are subject to review and do not guarantee a volunteer role.',
      ],
    },
    {
      id: 'bespoke-and-measurements',
      title: 'Bespoke and custom measurements',
      icon: 'Package',
      paragraphs: [
        'Bespoke request forms and custom size fields let you share measurements, preferences, notes, and reference images. Submitting a request does not always create a binding production order until we confirm scope, pricing, and next steps with you.',
        "You confirm that you have the right to share any images or materials you upload and that they do not infringe someone else's rights.",
      ],
    },
    {
      id: 'acceptable-use-and-ip',
      title: 'Acceptable use and intellectual property',
      icon: 'Scale',
      paragraphs: [
        "You may use the website only for lawful purposes. You must not attempt to disrupt the site, scrape it abusively, probe our systems without authorisation, submit malware, or misuse another person's account or personal data.",
        'All Misqabbi branding, product imagery, text, designs, and other site content are owned by Misqabbi or our licensors. You may not copy, modify, or commercially exploit that content without our prior written permission, except for ordinary personal use of the website.',
      ],
    },
    {
      id: 'disclaimers-and-liability',
      title: 'Disclaimers and limitation of liability',
      icon: 'Shield',
      paragraphs: [
        'We aim to keep the website accurate and available, but we do not warrant that it will be uninterrupted, error-free, or free of harmful components. Product colours and details may vary slightly from on-screen images because of device display differences and the handmade or made-to-measure nature of our work.',
        'To the fullest extent permitted by the laws of Ghana, Misqabbi is not liable for indirect, incidental, or consequential losses arising from your use of the site or products. Nothing in these Terms excludes or limits liability that cannot be excluded under applicable Ghana consumer or other mandatory law, including liability for fraud or personal injury caused by negligence where such exclusion is not allowed.',
        'Our total liability for any claim arising out of an order is limited to the amount you paid for that order, except where a higher liability cannot be limited by law.',
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: 'Lock',
      paragraphs: [
        'Our collection and use of personal data are described in our [Privacy Policy](/privacy-policy). By using the site, you acknowledge that policy. Where consent is required for a specific processing activity, we will ask for it in the relevant flow.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes',
      icon: 'FileText',
      paragraphs: [
        'We may modify these Terms, product offerings, pricing, or site features at any time. Material changes to these Terms will be reflected by updating the date on this page. Ongoing use of the services after an update constitutes acceptance of the revised Terms, except where applicable law requires a different process.',
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law and jurisdiction',
      icon: 'Globe',
      paragraphs: [
        `These Terms are governed by ${LEGAL_META.governingLaw}. You and Misqabbi agree that disputes arising out of or in connection with these Terms or your use of the services will be subject to the jurisdiction of ${LEGAL_META.jurisdiction}, without prejudice to any mandatory consumer protections that apply to you.`,
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: 'Mail',
      paragraphs: [
        `For questions about these Terms, contact us at ${LEGAL_META.contactEmail} or [${LEGAL_META.supportPhoneDisplay}](tel:${LEGAL_META.supportPhoneTel}).`,
        'Related policies: [Privacy Policy](/privacy-policy), [Order Policy](/order-policy), and [Return Policy](/return-policy).',
      ],
    },
  ],
  contactCta: {
    variant: 'solid',
    title: 'Need help with an order or these terms?',
    body: 'Our support team is available if you have questions about your purchase, account, or these Terms of Service.',
    actions: [
      {
        label: 'Email Support',
        href: `mailto:${LEGAL_META.contactEmail}`,
        style: 'primary',
      },
      {
        label: 'Privacy Policy',
        to: '/privacy-policy',
        style: 'secondary',
      },
    ],
  },
};
