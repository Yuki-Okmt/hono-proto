import { FC } from 'hono/jsx';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: Event) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
}) => {
  const classes = [
    'w-full px-3 py-2 text-notion-text font-notion',
    'bg-notion-bg border border-notion-border rounded-notion',
    'placeholder:text-notion-text-secondary',
    'focus:outline-none focus:ring-2 focus:ring-notion-blue focus:border-transparent',
    'transition-all duration-200',
    'hover:border-gray-300',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'dark:bg-notion-bg-dark dark:text-notion-text-dark dark:border-notion-border-dark',
    'dark:placeholder:text-notion-text-secondary-dark',
    'dark:hover:border-gray-600',
    className,
  ].join(' ');

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={classes}
      id={id}
      name={name}
    />
  );
};

export default Input;