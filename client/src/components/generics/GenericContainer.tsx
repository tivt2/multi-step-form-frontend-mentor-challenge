import { HTMLAttributes, ReactNode } from 'react';

interface GenericContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GenericContainer({
  children,
  className,
  ...rest
}: GenericContainerProps) {
  return (
    <div
      className={` bg-base-100 rounded-lg md:rounded-xl px-6 py-8 md:p-4 mx-4 ${
        className ?? ''
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
