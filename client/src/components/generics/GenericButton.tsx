import { ButtonHTMLAttributes } from 'react';

interface GenericButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function GenericButton({
  text,
  className,
  ...rest
}: GenericButtonProps) {
  return (
    <button name={text} className={` ${className ?? ''}`} {...rest}>
      {text}
    </button>
  );
}
