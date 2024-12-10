import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  helpText,
  fullWidth = true,
  rows = 4,
  resize = 'vertical',
  className = '',
  ...props
}) => {
  const baseStyles = `
    block
    rounded-md
    border-gray-300
    shadow-sm
    focus:border-blue-500 
    focus:ring-blue-500
    disabled:bg-gray-50
    disabled:text-gray-500
    disabled:border-gray-200
    disabled:shadow-none
  `;

  const widthStyles = fullWidth ? 'w-full' : 'w-auto';
  const resizeStyles = `resize-${resize}`;
  const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <textarea
        rows={rows}
        className={`
          ${baseStyles}
          ${widthStyles}
          ${resizeStyles}
          ${errorStyles}
          ${className}
        `}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${props.id}-error` : helpText ? `${props.id}-description` : undefined
        }
        {...props}
      />

      {helpText && !error && (
        <p
          className="mt-1 text-sm text-gray-500"
          id={`${props.id}-description`}
        >
          {helpText}
        </p>
      )}

      {error && (
        <p
          className="mt-1 text-sm text-red-600"
          id={`${props.id}-error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;