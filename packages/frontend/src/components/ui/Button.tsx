import { FC } from 'hono/jsx';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
}) => {
  const baseClasses = [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'rounded-notion',
  ];

  const variants = {
    primary: [
      'bg-notion-blue text-white shadow-notion',
      'hover:bg-blue-600 hover:shadow-notion-hover',
      'focus:ring-notion-blue',
      'dark:shadow-notion-dark dark:hover:shadow-notion-hover-dark',
    ],
    secondary: [
      'bg-notion-bg-secondary text-notion-text border border-notion-border',
      'hover:bg-notion-bg-hover hover:shadow-notion-hover',
      'focus:ring-notion-blue',
      'dark:bg-notion-bg-secondary-dark dark:text-notion-text-dark dark:border-notion-border-dark',
      'dark:hover:bg-notion-bg-hover-dark dark:shadow-notion-dark dark:hover:shadow-notion-hover-dark',
    ],
    ghost: [
      'text-notion-text-secondary hover:text-notion-text hover:bg-notion-bg-hover',
      'focus:ring-notion-blue',
      'dark:text-notion-text-secondary-dark dark:hover:text-notion-text-dark dark:hover:bg-notion-bg-hover-dark',
    ],
    danger: [
      'bg-notion-red text-white shadow-notion',
      'hover:bg-red-600 hover:shadow-notion-hover',
      'focus:ring-notion-red',
      'dark:shadow-notion-dark dark:hover:shadow-notion-hover-dark',
    ],
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = [
    ...baseClasses,
    ...variants[variant],
    sizes[size],
    className,
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;