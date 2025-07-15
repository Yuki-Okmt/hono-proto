import { FC } from 'hono/jsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'orange';
  size?: 'sm' | 'md';
  className?: string;
}

const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) => {
  const baseClasses = [
    'inline-flex items-center font-medium rounded-notion',
    'transition-all duration-200',
  ];

  const variants = {
    default: 'bg-notion-bg-secondary text-notion-text-secondary border border-notion-border dark:bg-notion-bg-secondary-dark dark:text-notion-text-secondary-dark dark:border-notion-border-dark',
    blue: 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    green: 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
    red: 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    purple: 'bg-purple-100 text-purple-800 border border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800',
    pink: 'bg-pink-100 text-pink-800 border border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    orange: 'bg-orange-100 text-orange-800 border border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  const classes = [
    ...baseClasses,
    variants[variant],
    sizes[size],
    className,
  ].join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;