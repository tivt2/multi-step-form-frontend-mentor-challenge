import { useForm } from 'react-hook-form';
import { Form } from './components';
import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Tform } from '@/app/page';

export type Tplan = { title: string; price: number };

const plans = {
  Arcade: { title: 'Arcade', price: 9 },
  Advanced: { title: 'Advanced', price: 12 },
  Pro: { title: 'Pro', price: 15 },
};

export type TselectPlanForm = {
  plan: Tplan;
  monthly: boolean;
};

export function SelectPlanForm() {
  const { masterData } = useMultiStepFormContext<Tform>();
  const { handleSubmit, watch, setValue } = useForm<TselectPlanForm>({
    defaultValues: {
      plan: masterData.plan ?? plans.Arcade,
      monthly: masterData.monthly ?? true,
    },
  });
  const formValues = watch();
  const { next } = useMultiStepFormContext();

  return (
    <form
      id="multi-step"
      onSubmit={handleSubmit(next)}
      className=" flex flex-col items-center"
    >
      <Form.Heading
        title="Select your plan"
        text="You have the option of monthly or yearly billing."
      />
      <div className="w-full flex flex-col md:flex-row gap-3 md:gap-4">
        <Form.Plan
          plan={plans.Arcade}
          activePlan={formValues.plan}
          monthly={formValues.monthly}
          onClick={() => setValue('plan', plans.Arcade)}
        />
        <Form.Plan
          plan={plans.Advanced}
          activePlan={formValues.plan}
          monthly={formValues.monthly}
          onClick={() => setValue('plan', plans.Advanced)}
        />
        <Form.Plan
          plan={plans.Pro}
          activePlan={formValues.plan}
          monthly={formValues.monthly}
          onClick={() => setValue('plan', plans.Pro)}
        />
      </div>
      <div className="w-full mt-6 flex flex-row items-center justify-center font-medium text-sm gap-5 p-4 md:p-3 bg-pastelBlue/10 rounded-lg">
        <span
          className={`${
            formValues.monthly ? 'text-marineBlue' : 'text-base-500'
          } transition-all`}
        >
          Monthly
        </span>
        <Form.Toggle
          state={!formValues.monthly}
          onClick={() => setValue('monthly', !formValues.monthly)}
        />
        <span
          className={`${
            !formValues.monthly ? 'text-marineBlue' : 'text-base-500'
          } transition-all`}
        >
          Yearly
        </span>
      </div>
    </form>
  );
}
