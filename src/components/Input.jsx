import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    labelClasses = "",
    type = "text",
    className = "",
    required = false,
    ...props
  },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className={`inline-block mb-1 ${labelClasses} pl-1`}
          htmlFor={id}
        >
          {label}
          {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        style={{ backgroundColor: "white" }}
        className={`input-filled px-3 py-2 rounded-lg  text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        required={required}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
