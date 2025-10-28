import { Ruler, Lightbulb, Users, Heart } from 'lucide-react';
import sizeChartImage from '../assets/size chart (inches).jpg';

const SizeGuide = () => {
  const measuringTips = [
    {
      icon: Ruler,
      text: 'Use a soft measuring tape and keep it snug but not tight',
    },
    {
      icon: Lightbulb,
      text: 'Wear light clothing or undergarments for the most accurate measurements',
    },
    {
      icon: Users,
      text: 'Ask someone to help you for better precision',
    },
    {
      icon: Heart,
      text: "Stand naturally and don't hold your breath",
    },
  ];

  return (
    <main className="w-full px-4 sm:px-6 lg:px-8 py-12 max-w-6xl mx-auto font-lato">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bebas text-msq-purple-rich mb-4">Size Guide</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find your perfect fit with our comprehensive size chart and measuring tips.
        </p>
      </header>

      {/* Main Content - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Size Chart Image */}
        <div className="order-1">
          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <img src={sizeChartImage} alt="Size Chart" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Measuring Tips */}
        <div className="order-2 space-y-4">
          <h2 className="text-3xl font-bebas text-msq-purple-rich mb-6">
            Tips for Accurate Measuring
          </h2>
          <div className="space-y-4">
            {measuringTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white border-2 border-gray-100 rounded-lg hover:border-msq-purple-light transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-msq-purple-rich/10 rounded-full">
                      <Icon className="w-6 h-6 text-msq-purple-rich" />
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1">{tip.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <section className="mt-12 p-8 bg-gradient-to-br from-msq-purple-light/10 to-msq-purple-rich/10 rounded-xl border border-msq-purple-light/20">
        <h2 className="text-2xl font-bebas text-msq-purple-rich mb-4">Need More Help?</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">
          If you&apos;re unsure about your measurements or need assistance, don&apos;t hesitate to
          reach out. Our team is here to help you find the perfect fit for your made-to-measure
          pieces.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/233507226511"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-msq-purple-rich text-white px-6 py-3 rounded-lg font-semibold hover:bg-msq-purple-deep transition-colors text-center"
          >
            Contact Support
          </a>
          <a
            href="mailto:help@misqabbi.com"
            className="bg-transparent border-2 border-msq-purple-rich text-msq-purple-rich px-6 py-3 rounded-lg font-semibold hover:bg-msq-purple-rich hover:text-white transition-colors text-center"
          >
            Email Us
          </a>
        </div>
      </section>
    </main>
  );
};

export default SizeGuide;
