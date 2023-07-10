import { Tform } from '@/app/page';
import { useMultiStepFormContext } from '@/contexts/MultiStepFormContext';
import { Icon } from '../icons';
import { Form } from './components';

export function ConfirmationMessage() {
  const { masterData } = useMultiStepFormContext<Tform>();

  return (
    <div className="py-8 flex flex-col items-center md:justify-center md:h-full text-center text-base-500">
      <Icon.ThankYour />
      <h1 className="font-bold text-2xl text-marineBlue mt-6 mb-3">
        Thank you!
      </h1>
      <p className="">
        {`${masterData.name} thanks for confirming your subscription!`}
      </p>
      <p>
        We hope you have fun using our platform. If you ever need support,
        please feel free to email us at support@loremgaming.com.
      </p>
    </div>
  );
}
