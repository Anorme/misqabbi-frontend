import MsqButton from './MsqButton';

const PreviewBanner = () => {
  return (
    <div
      className="relative w-full h-[500px] bg-cover bg-top mx-auto"
      style={{
        backgroundPosition: 'center -360px',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1648322032202-73cb85f354be?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-4">
          <h1 className="text-[128px] font-lato leading-[71px] w-[854px]">NEW ARRIVAL</h1>
          <MsqButton label="SHOP COLLECTION" variant="gold" className="mt-12" />
        </div>
      </div>
    </div>
  );
};

export default PreviewBanner;
