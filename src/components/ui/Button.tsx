import { Link } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type Variant = 'primary' | 'secondary' | 'ghost' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  to?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  to,
  children,
  fullWidth,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = `btn btn-${variant}${fullWidth ? ' btn-full' : ''} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
