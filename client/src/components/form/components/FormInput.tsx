import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput = forwardRef(
  (
    { label, error, className, ...rest }: FormInputProps,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) => {
    return (
      <div className={`flex flex-col font-medium md:gap-1 ${className ?? ''}`}>
        <div className="flex flex-row items-center justify-between">
          <label className=" text-xs md:text-sm text-marineBlue">{label}</label>
          {error ? (
            <span className="text-xs md:text-sm text-strawberryRed">
              {error}
            </span>
          ) : null}
        </div>
        <input
          className={`w-full border text-marineBlue px-4 py-2 md:py-3 leading-none rounded md:rounded-lg bg-base-100 focus:border-purplishBlue outline-none placeholder:font-normal placeholder:text-base-500 ${
            error ? 'border-strawberryRed' : 'border-base-400'
          }`}
          ref={ref}
          {...rest}
        />
      </div>
    );
  },
);
