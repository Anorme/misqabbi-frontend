import { Link } from 'react-router';

import MsqButton from './MsqButton';

const PreviewSplit = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Denim Section */}
        <div
          className="relative w-full h-[422px] md:h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1756485161657-e005fc9e4393?q=80&w=708&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white md:space-y-3">
              <h2 className="text-[38px] md:text-[64px] font-lato ">DRESSES</h2>
              <Link to="/category/dresses">
                <MsqButton label="SHOP DRESSES" variant="purple-rich" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ankara Section */}
        <div
          className="relative w-full h-[422px] md:h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1713845784488-f81dbf2b1e81?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute bottom-5 inset-x-0 bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white  md:space-y-3">
              <h2 className="text-[38px] md:text-[64px] font-lato ">SKIRTS</h2>
              <Link to="/category/skirts">
                <MsqButton label="SHOP SKIRTS" variant="purple-rich" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewSplit;
