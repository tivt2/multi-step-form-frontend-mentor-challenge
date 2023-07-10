import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Form } from './components';
import { Tform } from '@/app/page';
import { useForm } from 'react-hook-form';

export type TaddonsKeys =
  | 'ONLINE_SERVICE'
  | 'LARGER_STORAGE'
  | 'CUSTOM_PROFILE';

export type TaddonsValues = {
  included: boolean;
  title: string;
  text: string;
  price: number;
};

export type Taddons = {
  [key in TaddonsKeys]: TaddonsValues;
};

export const ADDONS: Taddons = {
  ONLINE_SERVICE: {
    included: false,
    title: 'Online service',
    text: 'Access to multiplayer games',
    price: 1,
  },
  LARGER_STORAGE: {
    included: false,
    title: 'Larger storage',
    text: 'Extra 1TB of cloud save',
    price: 2,
  },
  CUSTOM_PROFILE: {
    included: false,
    title: 'Customizable profile',
    text: 'Custom theme on your profile',
    price: 2,
  },
};

export type TpickAddonsForm = {
  addons: Taddons;
};

export function PickAddonsForm() {
  const { masterData, next } = useMultiStepFormContext<Tform>();
  const { setValue, watch, handleSubmit } = useForm<TpickAddonsForm>({
    defaultValues: {
      addons: masterData.addons ?? ADDONS,
    },
  });

  const currAddons = watch('addons');

  const handleAddon = (key: TaddonsKeys) => {
    setValue('addons', {
      ...currAddons,
      [key]: {
        ...currAddons[key],
        included: !currAddons[key].included,
      },
    });
  };

  return (
    <form id="multi-step" onSubmit={handleSubmit(next)}>
      <Form.Heading
        title="Pick add-ons"
        text="Add-ons help enhance your gaming experience."
      />
      <div className=" w-full flex flex-col gap-3 md:gap-4">
        <Form.Addon
          addon={currAddons.ONLINE_SERVICE}
          montly={masterData.monthly}
          onClick={() => handleAddon('ONLINE_SERVICE')}
        />
        <Form.Addon
          addon={currAddons.LARGER_STORAGE}
          montly={masterData.monthly}
          onClick={() => handleAddon('LARGER_STORAGE')}
        />
        <Form.Addon
          addon={currAddons.CUSTOM_PROFILE}
          montly={masterData.monthly}
          onClick={() => handleAddon('CUSTOM_PROFILE')}
        />
      </div>
    </form>
  );
}
