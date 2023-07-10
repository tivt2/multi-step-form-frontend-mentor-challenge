'use client';

import { ConfirmationMessage } from '@/components/form/ConfirmationMessage';
import { FinishingUpForm } from '@/components/form/FinishingUpForm';
import { MultiStepFormDesktop } from '@/components/form/MultiStepFormDesktop';
import { MultiStepFormMobile } from '@/components/form/MultiStepFormMobile';
import {
  PersonalInfoForm,
  TpersonalInfoForm,
} from '@/components/form/PersonalInfoForm';
import {
  PickAddonsForm,
  TpickAddonsForm,
} from '@/components/form/PickAddonsForm';
import {
  SelectPlanForm,
  TselectPlanForm,
} from '@/components/form/SelectPlanForm';
import { MultiStepFormProvider } from '@/contexts/MultiStepFormContext';
import { useEffect, useState } from 'react';

export type Tform = TpersonalInfoForm & TselectPlanForm & TpickAddonsForm;

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', updateWindowWidth);

    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  return (
    <main className=" w-full min-h-screen flex flex-col md:justify-center md:items-center antialiased bg-base-300">
      <MultiStepFormProvider<Tform>
        stepsNodes={[
          <PersonalInfoForm />,
          <SelectPlanForm />,
          <PickAddonsForm />,
          <FinishingUpForm />,
        ]}
        confirmationNode={<ConfirmationMessage />}
      >
        {windowWidth < 768 ? <MultiStepFormMobile /> : <MultiStepFormDesktop />}
      </MultiStepFormProvider>
    </main>
  );
}
