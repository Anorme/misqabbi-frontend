import { useState } from 'react';

import FAQItem from '../components/ui/FAQItem';
import SEO from '../components/SEO';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'What is the order process?',
      answer:
        'Orders are processed within 3 to 5 working days. Once confirmed, your production slot for the week is secured.',
    },
    {
      question: 'How do I know if my order is accepted?',
      answer: "You'll receive a confirmation once your slot is booked.",
    },
    {
      question: 'Can I return an item?',
      answer: 'Returns are only accepted for defective or incorrect items.',
    },
    {
      question: 'What are the payment options?',
      answer:
        'You may pay 50 percent upfront and 50 percent upon delivery, or pay in full when ordering.',
    },
    {
      question: 'How does delivery work?',
      answer: 'We use third-party couriers. You may also arrange your own pickup.',
    },
    {
      question: 'How do I contact support?',
      answer:
        'Call or WhatsApp +233 50 722 6511 or send an email to info@misqabbigh.com and we will help you out',
    },
  ];

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about ordering, delivery, returns, and payment options at Misqabbi."
        canonicalPath="/faqs"
      />
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-msq-purple-rich mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about ordering, delivery, and returns.
        </p>
      </header>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>

      {/* Additional Help Section */}
      <section className="mt-16 p-4 md:p-8 bg-msq-purple-rich rounded-lg text-white">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bebas mb-2 md:mb-4">
          Still have questions?
        </h2>
        <p className=" text-xs sm:text-sm lg:text-base mb-2 md:mb-4">
          Can't find the answer you're looking for? Please reach out to our friendly support team.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
          <a
            href="https://wa.me/233507226511"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm lg:text-base bg-white text-msq-purple-rich px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
          >
            WhatsApp Us
          </a>
          <a
            href="mailto:info@misqabbigh.com"
            className="text-xs sm:text-sm lg:text-base bg-transparent border-2 border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
          >
            Email Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default FAQs;
