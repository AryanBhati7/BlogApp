import React from "react";

function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-transparent flex justify-center items-center">
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Your Blog App is loading.. Stay tuned
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
