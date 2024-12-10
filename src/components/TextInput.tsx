import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined';
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helpText,
  fullWidth = true,
  leftIcon,
  rightIcon,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = `
    block
    rounded-md
    shadow-sm
    focus:outline-none
    disabled:bg-gray-50
    disabled:text-gray-500
    disabled:border-gray-200
    disabled:shadow-none
  `;

  const variantStyles = {
    default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    filled: 'bg-gray-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-blue-500',
    outlined: 'bg-transparent border-gray-300 focus:border-blue-500 focus:ring-blue-500',
  };

  const widthStyles = fullWidth ? 'w-full' : 'w-auto';
  const errorStyles = error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : '';
  const iconStyles = leftIcon || rightIcon ? 'pl-10' : '';

  return (
    <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{leftIcon}</span>
          </div>
        )}

        <input
          className={`
            ${baseStyles}
            ${variantStyles[variant]}
            ${widthStyles}
            ${errorStyles}
            ${iconStyles}
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${props.id}-error` : helpText ? `${props.id}-description` : undefined
          }
          {...props}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{rightIcon}</span>
          </div>
        )}
      </div>

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

export default TextInput;