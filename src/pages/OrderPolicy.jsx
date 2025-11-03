import { Clock, Calendar, CreditCard, Truck } from 'lucide-react';
import SEO from '../components/SEO';

const OrderPolicy = () => {
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto font-lato">
      <SEO
        title="Order Policy"
        description="Learn about Misqabbi's ordering process, payment options, and delivery policies."
        canonicalPath="/order-policy"
      />
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="font-bebas text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-msq-purple-rich mb-4">
          Order Policy
        </h1>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
          Learn about our ordering process, payment options, and delivery to ensure a seamless
          experience.
        </p>
      </header>

      {/* Policy Sections */}
      <section className="mb-12">
        <div className="space-y-6">
          {/* Order Processing */}
          <div className="flex items-start gap-4 p-4 md:p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-3 bg-msq-purple-rich/10 rounded-full">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bebas text-msq-purple-rich mb-2">
                Order Processing
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                Orders are typically processed within 3 to 5 working days. Once confirmed, your
                production slot is secured.
              </p>
            </div>
          </div>

          {/* Order Slots */}
          <div className="flex items-start gap-4 p-4 md:p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-3 bg-msq-purple-rich/10 rounded-full">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bebas text-msq-purple-rich mb-2">
                Order Slots
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                We accept a limited number of orders weekly to maintain quality and attention to
                detail. If slots are full, you may book an early slot for the following week or wait
                for availability.
              </p>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="flex items-start gap-4 p-4 md:p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-3 bg-msq-purple-rich/10 rounded-full">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bebas text-msq-purple-rich mb-2">
                Payment Terms
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                You may pay 50 percent upfront and 50 percent upon delivery, or pay in full when
                placing your order.
              </p>
            </div>
          </div>

          {/* Delivery and Pickup */}
          <div className="flex items-start gap-4 p-4 md:p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <div className="p-2 sm:p-3 bg-msq-purple-rich/10 rounded-full">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-msq-purple-rich" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg md:text-xl font-bebas text-msq-purple-rich mb-2">
                Delivery and Pickup
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-700 leading-relaxed">
                We use third-party couriers for delivery. You may also opt for pickup at designated
                locations or arrange delivery through your own preferred courier (at your own cost).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="p-4 md:p-8 bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10 rounded-xl border border-msq-purple-light/20">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bebas text-msq-purple-rich mb-2 md:mb-4">
          Quality Over Quantity
        </h2>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          <p className="text-xs sm:text-sm lg:text-base">
            At Misqabbi, we believe in quality over quantity. Each piece is crafted with intention,
            care, and precision. By limiting our weekly production slots, we ensure that every order
            receives the attention it deserves.
          </p>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mt-12 p-4 md:p-8 bg-msq-purple-rich rounded-xl text-white">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bebas mb-2 md:mb-4">
          Ready to Place an Order?
        </h2>
        <p className="text-xs sm:text-sm lg:text-base mb-4 md:mb-6 text-white/95 leading-relaxed">
          Have questions about our ordering process? We're here to help you every step of the way.
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
            href="mailto:help@misqabbi.com"
            className="text-xs sm:text-sm lg:text-base bg-transparent border-2 border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
          >
            Email Support
          </a>
        </div>
      </section>
    </main>
  );
};

export default OrderPolicy;
