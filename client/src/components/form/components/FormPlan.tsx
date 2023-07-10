import { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../../icons';
import { Tplan } from '../SelectPlanForm';

const PlanIcon: { [key: Tplan['title']]: ReactNode } = {
  Arcade: <Icon.Arcade />,
  Advanced: <Icon.Advanced />,
  Pro: <Icon.Pro />,
};

interface FormPlanProps extends HTMLAttributes<HTMLDivElement> {
  plan: Tplan;
  activePlan: Tplan;
  monthly: boolean;
}

export function FormPlan({
  plan,
  activePlan,
  monthly,
  className,
  ...rest
}: FormPlanProps) {
  return (
    <div
      className={` w-full flex flex-row md:flex-col p-4 gap-4 md:gap-12 leading-none border rounded-md md:rounded-lg cursor-pointer hover:bg-purplishBlue/5 transition-all ${
        plan.title === activePlan.title
          ? 'border-purplishBlue bg-pastelBlue/10'
          : 'border-base-400 bg-base-100'
      } ${className ?? ''}`}
      {...rest}
    >
      {PlanIcon[plan.title]}
      <div className=" flex flex-col gap-1 font-medium">
        <h4 className=" text-marineBlue">{plan.title}</h4>
        <span className="text-sm text-base-500 ">
          ${plan.price * (monthly ? 1 : 10)}/{monthly ? 'mo' : 'yr'}
        </span>
        {!monthly ? (
          <span className="text-xs text-marineBlue">2 months free</span>
        ) : null}
      </div>
    </div>
  );
}
