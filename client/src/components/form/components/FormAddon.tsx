import { HTMLAttributes } from 'react';
import { Icon } from '../../icons';
import { TaddonsValues } from '../PickAddonsForm';

interface FormAddonProps extends HTMLAttributes<HTMLDivElement> {
  addon: TaddonsValues;
  montly: boolean;
}

export function FormAddon({
  addon,
  montly,
  className,
  ...rest
}: FormAddonProps) {
  const { included, title, text, price } = addon;

  return (
    <div
      className={` w-full p-4 md:py-6 md:px-5 flex flex-row items-center gap-4 md:gap-6 border rounded-md md:rounded-lg hover:bg-purplishBlue/5 transition-all cursor-pointer ${
        included
          ? 'bg-pastelBlue/10 border-purplishBlue'
          : 'border-base-400 bg-base-100'
      } ${className ?? ''}`}
      {...rest}
    >
      <div
        className={`w-5 rounded flex items-center justify-center aspect-square ${
          included ? 'bg-purplishBlue' : 'bg-base-100 border border-base-400'
        }`}
      >
        {included ? <Icon.Check /> : null}
      </div>
      <div className=" flex flex-col gap-1 text-sm font-medium leading-none">
        <h4 className="text-marineBlue font-bold">{title}</h4>
        <span className="text-base-500">{text}</span>
      </div>
      <span className="text-xs text-purplishBlue ml-auto">
        +${price * (montly ? 1 : 10)}/{montly ? 'mo' : 'yr'}
      </span>
    </div>
  );
}
