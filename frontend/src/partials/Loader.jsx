import { Spiral } from "ldrs/react";
import "ldrs/react/Spiral.css";

const Loader = () => {
  return (
    <div className="flex justify-center h-screen bg-gray-800 items-center">
      <div className="text-4xl text-green-400 flex-col gap-8 font-mono font-bold flex items-center justify-center">
        <Spiral size="150" speed="0.9" color="#0CDF24" />
        Loading...
      </div>
    </div>
  );
};

export default Loader;
