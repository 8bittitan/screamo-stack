import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type Props = {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, id, error, ...props }, ref) => (
    <div>
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1">
        <input
          ref={ref}
          id={id || name}
          className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${name}-error` : ''}
          name={name}
          {...props}
        />
        {error && (
          <div className="pt-1 text-red-700" id={`${name}-error`}>
            {error}
          </div>
        )}
      </div>
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
