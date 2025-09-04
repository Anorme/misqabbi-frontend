const PreviewPromo = () => {
  return (
    <div
      className="relative w-full h-[417px] bg-cover bg-center"
      style={{
        backgroundPosition: 'center -360px',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1648322032206-888c91d99616?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className=" bg-opacity-40 flex items-center justify-center absolute top-10 inset-x-0">
        <h2 className="text-[96px] font-lato text-white w-[743px] h-[154px]">
          Spring Collection 30% OFF
        </h2>
      </div>
    </div>
  );
};

export default PreviewPromo;
