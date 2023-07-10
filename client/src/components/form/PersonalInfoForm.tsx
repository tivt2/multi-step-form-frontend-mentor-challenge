import { ChangeEvent } from 'react';
import { Form } from './components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { z } from 'zod';
import { Tform } from '@/app/page';

const personalInfoSchema = z.object({
  name: z.string().min(3, 'Please provide your full name').default(''),
  email: z.string().email('Provide a valid email').default(''),
  phoneNumber: z
    .string()
    .min(14, 'Provide a valid phone number')
    .max(14)
    .default(''),
});

export type TpersonalInfoForm = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { masterData } = useMultiStepFormContext<Tform>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TpersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: masterData.name ?? '',
      email: masterData.email ?? '',
      phoneNumber: masterData.phoneNumber ?? '',
    },
  });

  const { next } = useMultiStepFormContext();

  const autoPhoneFormat = (value: string) => {
    const clean = ('' + value).replace(/\D/g, '');
    const match = clean.match(/(\d{0,1})?(\d{0,3})?(\d{0,3})?(\d{0,3})?$/);
    if (!match) {
      return '';
    }

    const ans = [
      match[1] ? '+' + match[1] : '',
      match[2] ? ' ' + match[2] : '',
      match[3] ? ' ' + match[3] : '',
      match[4] ? ' ' + match[4] : '',
    ].join('');

    return ans;
  };

  return (
    <form
      id="multi-step"
      className="flex flex-col"
      onSubmit={handleSubmit(next)}
    >
      <Form.Heading
        title="Personal info"
        text="Please provide your name, email address, and phone number."
      />
      <Form.Input
        label="Name"
        placeholder="e.g. Stephen King"
        error={errors.name?.message}
        {...register('name')}
        className="mb-3 md:mb-6"
      />
      <Form.Input
        label="Email Address"
        placeholder="e.g. stephenking@lorem.com"
        error={errors.email?.message}
        {...register('email')}
        className="mb-3 md:mb-6"
      />
      <Form.Input
        label="Phone Number"
        placeholder="e.g. +1 234 567 890"
        error={errors.phoneNumber?.message}
        maxLength={14}
        {...register('phoneNumber')}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.value = autoPhoneFormat(e.target.value);
        }}
      />
    </form>
  );
}
