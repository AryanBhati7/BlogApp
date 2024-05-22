import React from "react";

function LoadingSpinner() {
  return (
    <div className="w-full h-full  bg-transparent flex justify-center items-center">
      <div class="flex items-center justify-center">
        <div
          class="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Your Blog App is loading.. Stay tuned
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
