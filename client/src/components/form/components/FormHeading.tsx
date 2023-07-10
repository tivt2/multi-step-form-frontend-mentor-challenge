interface FormHeadingProps {
  title: string;
  text: string;
}

export function FormHeading({ title, text }: FormHeadingProps) {
  return (
    <div className="mb-5 md:mb-10 w-full">
      <h1 className="text-marineBlue text-2xl md:text-3xl font-bold leading-none">
        {title}
      </h1>
      <p className="text-base-500 mt-3">{text}</p>
    </div>
  );
}
