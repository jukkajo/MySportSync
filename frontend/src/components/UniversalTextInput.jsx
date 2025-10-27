import React from "react";

const UniversalTextInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  maxLength = 100,
}) => {
  const remaining = maxLength - value.length;

  return (
    <div className="flex flex-col space-y-1 w-full">
      <label className="font-semibold text-sm text-gray-700">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value.slice(0, maxLength))
        }
        placeholder={placeholder}
        className=" placeholder:text-gray-300 placeholder:text-sm
                    p-1 rounded-lg text-black border border-gray-300"
      />
      <p
        className={`text-xs text-right ${
          remaining <= 10 ? "text-red-400" : "text-gray-400"
        }`}
      >
        {remaining} characters left
      </p>
    </div>
  );
};

export default UniversalTextInput;

