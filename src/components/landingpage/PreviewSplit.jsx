import MsqButton from './MsqButton';

const PreviewSplit = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      {/* Denim Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1728402525443-92839fc739ed?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <h2 className="text-[64px] font-lato w-[254px]">DENIM</h2>
            <MsqButton label="SHOP DENIM" variant="gold" />
          </div>
        </div>
      </div>

      {/* Ankara Section */}
      <div
        className="relative h-[400px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1663044023009-cfdb6dd6b89c?q=80&w=707&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white space-y-3">
            <h2 className="text-[64px] font-lato w-[254px]">ANKARA</h2>
            <MsqButton label="SHOP ANKARA" variant="gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSplit;
