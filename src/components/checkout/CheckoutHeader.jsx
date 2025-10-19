import BackButton from '../layout/BackButton';

const CheckoutHeader = () => {
  return (
    <header className="flex items-center justify-between py-4 px-4 lg:px-0">
      <BackButton />
      <h1 className="font-bebas text-2xl lg:text-3xl text-msq-purple-rich uppercase tracking-wide ml-4">
        Checkout
      </h1>
      <div className="w-8"></div> {/* Spacer for centering */}
    </header>
  );
};

export default CheckoutHeader;
