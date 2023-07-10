import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Generic } from '../generics';
import Image from 'next/image';
import { Tform } from '@/app/page';

const formStepNames = ['YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'];

export function MultiStepFormDesktop() {
  const { StepNode, currStep, maxSteps, back, submited, submitMultiStepForm } =
    useMultiStepFormContext<Tform>();

  const onSubmit = (data: Tform) => {
    console.log(data);
  };

  return (
    <Generic.Container className="flex flex-row max-w-[880px] w-full">
      <div className=" relative w-[274px] h-[568px] rounded-lg overflow-hidden min-w-[274px] ">
        <Image
          src={'/images/bg-sidebar-desktop.svg'}
          fill
          style={{ objectFit: 'cover' }}
          alt="sidebar image"
        />
        <div className="z-[1] flex flex-col p-8 gap-8">
          {Array(maxSteps)
            .fill(0)
            .map((_, idx) => {
              return (
                <div className="relative z-[2] flex flex-row items-center gap-4">
                  <div
                    key={idx + 1}
                    className={` text-sm font-bold flex items-center justify-center w-8 aspect-square rounded-full ${
                      idx + 1 === currStep
                        ? 'bg-lightBlue text-marineBlue'
                        : 'bg-transparent text-base-100 border border-base-100'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className=" flex flex-col justify-center leading-none gap-1">
                    <span className="text-sm text-pastelBlue">
                      STEP {idx + 1}
                    </span>
                    <span className=" text-base-300 font-bold">
                      {formStepNames[idx]}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-full flex flex-col justify-between pt-8 pb-4 px-14 ml-6">
        {StepNode}
        {!submited ? (
          <div className="w-full flex flex-row items-center justify-between text-sm font-medium">
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
              text={currStep === maxSteps ? 'Confirm' : 'Next Step'}
              form="multi-step"
              onClick={
                currStep === maxSteps
                  ? () => submitMultiStepForm(onSubmit)
                  : () => {}
              }
              className={`px-4 py-2 md:px-6 md:py-3 text-base-400 rounded md:rounded-lg ${
                currStep === maxSteps ? 'bg-purplishBlue' : 'bg-marineBlue'
              } hover:brightness-125`}
            />
          </div>
        ) : null}
      </div>
    </Generic.Container>
  );
}
