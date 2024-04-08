export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white p-5 rounded-md w-[80vw] h-[80vh] shadow-sm relative overflow-y-auto">
    {children}
  </div>
);
