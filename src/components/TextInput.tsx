import React, { forwardRef } from 'react';

interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string; // Ajout de "name" pour une meilleure accessibilité
  id: string; // Ajout de "id" pour une meilleure accessibilité
  error?: string;
  className?: string;
  wrapperClassName?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      name,
      id,
      error,
      className,
      wrapperClassName,
      placeholder,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <input
          type="text"
          name={name}
          id={id}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } ${className}`}
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;