import React, { PropsWithChildren } from 'react';

interface ButtonProps
  extends PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  className = '',
  ...props
}) => {
  // Styles de base pour le bouton
  const baseStyles = `
    inline-flex items-center justify-center
    border border-transparent
    font-medium rounded-md
    focus:outline-none focus:ring-2 focus:ring-offset-2
    transition duration-150 ease-in-out
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  // Styles spécifiques à chaque variant
  const variantStyles = {
    primary:
      'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    secondary:
      'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500',
    success:
      'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    warning:
      'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500',
    info: 'bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-500',
    light:
      'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-800',
    link: 'text-blue-600 hover:text-blue-700 underline',
  };

  // Styles spécifiques à chaque taille
  const sizeStyles = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        sizeStyles[size]
      } ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          {/* Icône de chargement (spinner) */}
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {/* Texte de chargement (si fourni) */}
          {loadingText || 'Chargement...'}
        </>
      ) : (
        // Contenu du bouton (children)
        children
      )}
    </button>
  );
};

export default Button;