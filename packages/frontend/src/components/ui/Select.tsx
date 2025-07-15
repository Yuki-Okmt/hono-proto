import { FC } from 'hono/jsx';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (e: Event) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  id,
  name,
}) => {
  const classes = [
    'w-full px-3 py-2 text-notion-text font-notion',
    'bg-notion-bg border border-notion-border rounded-notion',
    'focus:outline-none focus:ring-2 focus:ring-notion-blue focus:border-transparent',
    'transition-all duration-200',
    'hover:border-gray-300',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'dark:bg-notion-bg-dark dark:text-notion-text-dark dark:border-notion-border-dark',
    'dark:hover:border-gray-600',
    className,
  ].join(' ');

  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={classes}
      id={id}
      name={name}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;