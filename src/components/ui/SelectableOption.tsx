import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './SelectableOption.css';

interface SelectableOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  title: string;
  description?: string;
  children?: ReactNode;
  multi?: boolean;
}

export function SelectableOption({
  selected,
  title,
  description,
  children,
  multi,
  className = '',
  ...props
}: SelectableOptionProps) {
  return (
    <button
      type="button"
      className={`selectable ${selected ? 'is-selected' : ''} ${className}`.trim()}
      aria-pressed={selected}
      {...props}
    >
      <span className="selectable-indicator" aria-hidden>
        {multi ? (selected ? '✓' : '') : selected ? '●' : '○'}
      </span>
      <span className="selectable-body">
        <span className="selectable-title">{title}</span>
        {description && <span className="selectable-desc">{description}</span>}
        {children}
      </span>
    </button>
  );
}
