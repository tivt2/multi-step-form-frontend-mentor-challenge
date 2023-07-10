import Link from 'next/link';
import { Form } from './components';
import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Tform } from '@/app/page';

interface FinishingUpFormProps {}

export function FinishingUpForm(props: FinishingUpFormProps) {
  const { masterData, jumpTo } = useMultiStepFormContext<Tform>();
  const { monthly, plan, addons } = masterData;

  const priceUnit = monthly ? 'mo' : 'yr';
  const priceMultiplier = monthly ? 1 : 10;
  const totalPrice =
    plan.price +
    Object.values(addons).reduce(
      (acc, addon) => (addon.included ? acc + addon.price : acc),
      0,
    );

  return (
    <div>
      <Form.Heading
        title="Finishing up"
        text="Double-check everything look OK before confirming."
      />
      <div className=" p-4 md:p-6 text-sm md:text-base font-medium bg-pastelBlue/10 rounded-lg">
        <div className="flex flex-row items-center justify-between border-b border-base-400 pb-3 mb-3 md:pb-6 md:mb-6">
          <div className=" flex flex-col items-start">
            <span className=" text-marineBlue font-bold">{`${plan.title} (${
              monthly ? 'Monthly' : 'Yearly'
            })`}</span>
            <button
              className=" text-base-500 underline hover:text-purplishBlue transition-all"
              onClick={() => jumpTo(2)}
            >
              Change
            </button>
          </div>
          <span className=" text-marineBlue font-bold">{`$${
            plan.price * priceMultiplier
          }/${priceUnit}`}</span>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          {Object.values(addons).map((addon, idx) => {
            if (!addon.included) {
              return;
            }
            return (
              <div
                key={addon.title}
                className=" flex items-center justify-between text-sm md:text-base font-medium"
              >
                <span className="text-base-500">{addon.title}</span>
                <span className="text-marineBlue">{`+$${
                  addon.price * priceMultiplier
                }/${priceUnit}`}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between mx-4 md:mx-6 mt-6">
        <span className="text-base-500 text-sm md:text-base font-medium">{`Total (per ${
          monthly ? 'month' : 'year'
        })`}</span>
        <span className="text-purplishBlue font-bold md:text-xl">{`+$${
          totalPrice * priceMultiplier
        }/${priceUnit}`}</span>
      </div>
    </div>
  );
}
