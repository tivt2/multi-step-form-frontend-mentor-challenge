interface TformToggleProps {
  state: boolean;
  onClick: () => void;
}

export function FormToggle({ state, onClick }: TformToggleProps) {
  return (
    <div
      className={
        'flex w-[2.8rem] h-6 p-1 md:scale-90 rounded-full bg-marineBlue cursor-pointer'
      }
      onClick={() => onClick()}
    >
      <div
        className={`${
          state ? 'ml-[1.3rem]' : 'ml-0'
        } h-full transition-all aspect-square rounded-full bg-base-100`}
      />
    </div>
  );
}
