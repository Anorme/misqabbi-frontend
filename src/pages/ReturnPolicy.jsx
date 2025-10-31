import { ShieldCheck, Package, AlertCircle, Phone, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';

const ReturnPolicy = () => {
  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-4xl mx-auto font-lato">
      <SEO
        title="Return Policy"
        description="Understand Misqabbi's return policy for made-to-measure fashion pieces."
        robots="noindex,nofollow"
      />
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bebas text-msq-purple-rich mb-4">Return Policy</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Understand our policies to ensure you have the best experience with Misqabbi.
        </p>
      </header>

      {/* Made-to-Measure Introduction */}
      <section className="mb-12 p-8 bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10 rounded-xl border border-msq-purple-light/20">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Package className="w-10 h-10 text-msq-purple-rich" />
          </div>
          <div>
            <h2 className="text-2xl font-bebas text-msq-purple-rich mb-3">
              Made-to-Measure Excellence
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All Misqabbi pieces are made-to-measure, crafted specifically for you. Each garment is
              designed and tailored to your unique measurements, ensuring a perfect fit that
              celebrates your individual style.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Details */}
      <section className="mb-12">
        <div className="space-y-6">
          {/* Policy 1 */}
          <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-msq-purple-rich" />
            </div>
            <div>
              <h3 className="text-xl font-bebas text-msq-purple-rich mb-2">Our Return Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We do not accept returns or issue refunds unless the item is defective or incorrect.
              </p>
            </div>
          </div>

          {/* Policy 2 */}
          <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <AlertCircle className="w-8 h-8 text-msq-purple-rich" />
            </div>
            <div>
              <h3 className="text-xl font-bebas text-msq-purple-rich mb-2">Inspect Your Order</h3>
              <p className="text-gray-700 leading-relaxed">
                Please inspect your order upon delivery to ensure everything meets your
                expectations.
              </p>
            </div>
          </div>

          {/* Policy 3 */}
          <div className="flex items-start gap-4 p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors">
            <div className="flex-shrink-0">
              <Phone className="w-8 h-8 text-msq-purple-rich" />
            </div>
            <div>
              <h3 className="text-xl font-bebas text-msq-purple-rich mb-2">Need Assistance?</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                If there's an issue, contact us immediately at{' '}
                <a
                  href="tel:+233507226511"
                  className="text-msq-purple-rich hover:text-msq-purple-deep font-semibold underline"
                >
                  +233 50 722 6511
                </a>
              </p>
              <p className="text-gray-600 text-sm">
                We'll work with you to resolve any concerns promptly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Commitment */}
      <section className="mb-12 p-8 bg-msq-purple-rich rounded-xl text-white">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bebas mb-3">Our Commitment to You</h2>
            <p className="leading-relaxed text-white/95">
              We're committed to making things right if something's not as expected. Your confidence
              in Misqabbi is important to us, and we stand behind the quality of every piece we
              create.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Support CTA */}
      <section className="p-8 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-2xl font-bebas text-msq-purple-rich mb-4 text-center">
          Have Questions or Concerns?
        </h3>
        <p className="text-gray-700 text-center mb-6">
          Our support team is here to help you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/233507226511"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-msq-purple-rich text-white px-6 py-3 rounded-lg font-semibold hover:bg-msq-purple-deep transition-colors text-center"
          >
            WhatsApp Support
          </a>
          <a
            href="tel:+233507226511"
            className="bg-transparent border-2 border-msq-purple-rich text-msq-purple-rich px-6 py-3 rounded-lg font-semibold hover:bg-msq-purple-rich hover:text-white transition-colors text-center"
          >
            Call Us Now
          </a>
          <a
            href="mailto:support@misqabbigh.com"
            className="bg-transparent border-2 border-msq-purple-rich text-msq-purple-rich px-6 py-3 rounded-lg font-semibold hover:bg-msq-purple-rich hover:text-white transition-colors text-center"
          >
            Email Support
          </a>
        </div>
      </section>
    </main>
  );
};

export default ReturnPolicy;
