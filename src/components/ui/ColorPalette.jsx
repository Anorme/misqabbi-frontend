function ColorPalette() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl">Color</h2>
      <div className="flex gap-2 py-3">
        <div className="h-8 w-8 rounded-full bg-blue-700"></div>
        <div className="h-8 w-8 rounded-full bg-[#C08D61]"></div>
        <div className="h-8 w-8 rounded-full bg-black"></div>
      </div>
    </div>
  );
}

export default ColorPalette;
