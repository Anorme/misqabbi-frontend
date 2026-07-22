import { LEGAL_META } from './legalMeta';

export const PRIVACY_POLICY = {
  title: 'Privacy Policy',
  description:
    'Learn how Misqabbi collects, uses, and protects your personal data when you shop, create an account, or use our website.',
  subtitle:
    'This Privacy Policy explains how Misqabbi collects, uses, shares, and protects your personal data when you use our website and services.',
  canonicalPath: '/privacy-policy',
  lastUpdated: LEGAL_META.lastUpdated,
  intro: {
    title: 'Your privacy matters',
    body: `Misqabbi ("we", "us", or "our") respects your privacy and is committed to protecting personal data in line with ${LEGAL_META.privacyLaw}. This notice applies to misqabbigh.com and related services we provide online.`,
    icon: 'Shield',
  },
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      icon: 'User',
      paragraphs: [
        `${LEGAL_META.controllerName} is the organisation responsible for deciding how and why your personal data is processed when you use our website, place orders, create an account, join our newsletter, submit forms, or take part in events.`,
        `You can contact us about privacy matters at ${LEGAL_META.contactEmail}.`,
      ],
    },
    {
      id: 'data-we-collect',
      title: 'Data we collect',
      icon: 'Database',
      paragraphs: [
        'We collect personal data that you provide directly, data generated when you use our services, and limited technical data needed to keep the site secure and working.',
      ],
      bullets: [
        'Identity and account data: name or display name, email address, password (stored in hashed form), Google account identifier if you sign in with Google, phone or contact number, and location details you choose to save on your profile.',
        'Order and shipping data: recipient name, email, phone number, delivery address, delivery notes, order items, sizes, discounts, and order history.',
        'Made-to-measure and bespoke data: body measurements you submit for custom sizing, garment preferences, style notes, and reference photos you upload for bespoke requests.',
        'Payment-related data: payment references, amounts, currency, and status information processed through our payment provider. We do not store full card numbers on our servers.',
        'Marketing data: email address when you subscribe to our newsletter.',
        'Support and enquiry data: name, email, and message content from our contact form, and information included in bespoke or support requests.',
        'Events data: name, email, phone number, ticket details, registration answers, and volunteer application responses when you register for or volunteer at an event.',
        'Preferences: products you save as favourites when signed in.',
        'Technical data: authentication cookies, guest session identifiers, shopping cart data stored in your browser, and limited log or security data such as IP address used for rate limiting and monitoring.',
      ],
    },
    {
      id: 'how-we-use-data',
      title: 'How we use data',
      icon: 'FileText',
      paragraphs: ['We use personal data for the following purposes:'],
      bullets: [
        'To create and manage your account, guest checkout session, and sign-in (including Google sign-in).',
        'To process, produce, and deliver orders, including made-to-measure garments.',
        'To take and confirm payments, prevent fraud, and handle payment verification.',
        'To send transactional messages such as order updates and password reset emails.',
        'To respond to contact, bespoke, and support requests.',
        'To run event registrations, paid tickets, and volunteer applications.',
        'To send marketing emails when you have subscribed to our newsletter.',
        'To remember your cart and favourites, improve site reliability, and keep our services secure.',
        'To meet legal, accounting, and dispute-resolution obligations where required.',
      ],
    },
    {
      id: 'legal-bases',
      title: 'Legal bases under Act 843',
      icon: 'Scale',
      paragraphs: [
        `Under ${LEGAL_META.privacyLaw}, we process personal data only where we have a lawful basis. Depending on the activity, this includes:`,
      ],
      bullets: [
        'Processing that is necessary to perform a contract with you, or to take steps at your request before a contract (for example, checkout, payments, delivery, and bespoke requests).',
        'Processing based on your consent (for example, newsletter subscription, and certain optional form submissions). You may withdraw consent at any time where processing is based on consent.',
        'Processing that is necessary for our legitimate interests in running a secure online store, preventing abuse, improving operations, and communicating about orders, provided those interests are not overridden by your rights.',
        'Processing that is necessary to comply with a legal obligation.',
      ],
    },
    {
      id: 'sharing-and-processors',
      title: 'Sharing and processors',
      icon: 'Users',
      paragraphs: [
        'We share personal data with trusted service providers only as needed to operate our business. They process data on our instructions or as independent controllers where they provide payment or identity services.',
      ],
      bullets: [
        'Paystack: payment processing for orders and paid event tickets.',
        'Mailchimp: newsletter subscription management.',
        'Resend: transactional and notification emails, including password resets, order notices, contact form delivery, and bespoke request delivery.',
        'Cloudinary: hosting of product, event, and bespoke reference images.',
        'Google: Google sign-in (OAuth) and loading of website fonts.',
        'Hosting, database, cache, and logging providers that support our website and API infrastructure (including monitoring tools used in production).',
        'Couriers and fulfilment partners: shipping details needed to deliver your order.',
        'Professional advisers or authorities where required by law or to protect our rights.',
      ],
    },
    {
      id: 'cookies-and-local-storage',
      title: 'Cookies and local storage',
      icon: 'Cookie',
      paragraphs: [
        'We use strictly necessary cookies and similar technologies so you can sign in, stay signed in, use guest checkout, and complete purchases. These cookies are required for core site functions and are not used for advertising.',
      ],
      bullets: [
        'Authentication and session cookies: used to keep you signed in, refresh your session, and identify guest checkout sessions.',
        'Local storage: used to save your shopping cart (including any custom size details you enter) on your device.',
        'Session storage: may be used briefly during payment or event checkout flows to complete the journey after redirect.',
        'We do not currently use advertising or analytics tracking cookies such as Google Analytics or Meta Pixel. If that changes, we will update this policy and any required consent practices.',
      ],
    },
    {
      id: 'third-party-processing',
      title: 'Third-party and cross-border processing',
      icon: 'Globe',
      paragraphs: [
        'Some of our service providers may process personal data on servers outside Ghana. When that happens, we take reasonable steps to work with reputable providers and to protect your information in line with this policy and applicable law.',
        'Our website may also load assets from content delivery networks and font providers. Those providers may receive technical information such as your IP address when your browser requests those resources.',
      ],
    },
    {
      id: 'retention',
      title: 'Retention',
      icon: 'Clock',
      paragraphs: [
        'We keep personal data only for as long as needed for the purposes described above, including legal, accounting, and dispute-resolution needs.',
      ],
      bullets: [
        'Guest accounts that are not converted to a full account are cleaned up after a period of inactivity (around 30 days).',
        'Password reset tokens expire shortly after creation (around 30 minutes).',
        'Account, order, payment, and event records are retained as needed to fulfil contracts, keep business records, and comply with law.',
        'Newsletter emails are retained by our email provider until you unsubscribe or ask us to remove them.',
        'Contact and bespoke requests are handled by email. Bespoke reference photos may remain in our media storage until deleted as part of ordinary operations.',
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'Lock',
      paragraphs: [
        'We use technical and organisational measures designed to protect personal data, including encrypted connections where appropriate, hashed passwords, httpOnly authentication cookies, access controls, and monitoring. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.',
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      icon: 'ShieldCheck',
      paragraphs: [
        `Subject to ${LEGAL_META.privacyLaw} and any applicable exceptions, you may have the right to access personal data we hold about you, request correction of inaccurate or incomplete data, object to certain processing, withdraw consent where processing is based on consent, and ask us to stop using your data for direct marketing (including by unsubscribing from our newsletter).`,
        `To exercise these rights, contact us at ${LEGAL_META.contactEmail}. We may need to verify your identity before fulfilling certain requests.`,
      ],
    },
    {
      id: 'children',
      title: 'Children',
      icon: 'Users',
      paragraphs: [
        'Our website and services are intended for adults who can enter into a contract. We do not knowingly collect personal data from children. If you believe a child has provided personal data to us, please contact us and we will take appropriate steps.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      icon: 'FileText',
      paragraphs: [
        'We may update this Privacy Policy from time to time. Continued use of our website after changes are posted means you should review the updated policy.',
      ],
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: 'Mail',
      paragraphs: [
        `To exercise your privacy rights, ask a question, or raise a concern about this Privacy Policy, email ${LEGAL_META.contactEmail}.`,
        'You can also review our [Terms of Service](/terms-of-service) for the rules that apply when you use Misqabbi.',
      ],
    },
  ],
  contactCta: {
    variant: 'muted',
    title: 'Questions about your privacy?',
    body: `Email us at ${LEGAL_META.contactEmail} and we will do our best to help.`,
    actions: [
      {
        label: 'Email Privacy Support',
        href: `mailto:${LEGAL_META.contactEmail}`,
        style: 'primary',
      },
      {
        label: 'Terms of Service',
        to: '/terms-of-service',
        style: 'secondary',
      },
    ],
  },
};
