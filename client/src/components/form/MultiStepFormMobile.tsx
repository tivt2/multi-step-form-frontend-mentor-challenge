import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Generic } from '../generics';
import Image from 'next/image';
import { Tform } from '@/app/page';

export function MultiStepFormMobile() {
  const { StepNode, currStep, maxSteps, back, submited, submitMultiStepForm } =
    useMultiStepFormContext<Tform>();

  const onSubmit = (data: Tform) => {
    console.log(data);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div className=" z-[1] absolute top-0 w-full h-44 ">
        <Image
          src={'/images/bg-sidebar-mobile.svg'}
          fill
          priority
          quality={100}
          style={{ objectFit: 'cover' }}
          alt="background image"
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 my-8">
        {Array(maxSteps)
          .fill(0)
          .map((_, idx) => {
            return (
              <div
                key={idx + 1}
                className={`relative z-[2] text-sm font-bold flex items-center justify-center w-8 aspect-square rounded-full ${
                  idx + 1 === currStep
                    ? 'bg-lightBlue text-marineBlue'
                    : 'bg-transparent text-base-100 border border-base-100'
                }`}
              >
                {idx + 1}
              </div>
            );
          })}
      </div>
      <Generic.Container className="relative z-[2] mb-24 max-w-md">
        {StepNode}
      </Generic.Container>
      {!submited ? (
        <div className="fixed z-[3] px-6 py-4 left-0 bottom-0 w-full bg-base-100 flex justify-center text-sm font-medium">
          <div className="w-full max-w-md flex flex-row items-center justify-between">
            {currStep !== 1 ? (
              <Generic.Button
                type="button"
                text="Go Back"
                onClick={() => back()}
                className="text-base-500"
              />
            ) : (
              <div></div>
            )}
            <Generic.Button
              type="submit"
              text={currStep === maxSteps ? 'Confimr' : 'Next Step'}
              form="multi-step"
              onClick={
                currStep === maxSteps
                  ? () => submitMultiStepForm(onSubmit)
                  : () => {}
              }
              className={`px-4 py-2 text-base-400 rounded ${
                currStep === maxSteps ? 'bg-purplishBlue' : 'bg-marineBlue'
              }`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
