import * as React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-full w-[22rem] rounded-5 border border-purple bg-white px-9 py-3 focus:border-purpleDark focus:outline-none',
          className,
        )}
        ref={ref}
        autoComplete={type === 'password' ? 'current-password' : ''}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
