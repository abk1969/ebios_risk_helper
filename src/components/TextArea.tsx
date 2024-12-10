import React, { forwardRef } from 'react';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  className?: string;
  wrapperClassName?: string;
  id: string; // Assurez-vous que l'ID est obligatoire
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, error, className, wrapperClassName, ...props }, ref) => {
    return (
      <div className={wrapperClassName}>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 sm:text-sm ${
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          } ${className}`}
          rows={4}
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

TextArea.displayName = 'TextArea';

export default TextArea;