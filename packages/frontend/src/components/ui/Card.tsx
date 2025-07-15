import { FC } from 'hono/jsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card: FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const classes = [
    'bg-notion-bg border border-notion-border rounded-notion shadow-notion',
    'dark:bg-notion-bg-dark dark:border-notion-border-dark dark:shadow-notion-dark',
    hover && 'hover:shadow-notion-hover hover:border-gray-300 dark:hover:shadow-notion-hover-dark dark:hover:border-gray-600',
    hover && 'transition-all duration-200 cursor-pointer',
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;