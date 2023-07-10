import { ReactNode, createContext, useContext, useState } from 'react';

type TMultiStepContext<Tdata> = {
  masterData: Tdata;
  submited: boolean;
  StepNode: ReactNode;
  currStep: number;
  maxSteps: number;
  back: () => void;
  next: <T>(data: T) => void;
  jumpTo: (num: number) => void;
  submitMultiStepForm: (fn: (data: Tdata) => unknown) => void;
};

export const MultiStepFormContext = createContext<TMultiStepContext<any>>(
  {} as TMultiStepContext<any>,
);

interface MasterFormProviderProps {
  children: ReactNode;
  stepsNodes: ReactNode[];
  confirmationNode?: ReactNode;
}

export function MultiStepFormProvider<Tform>({
  children,
  stepsNodes,
  confirmationNode,
}: MasterFormProviderProps) {
  const [submited, setSubmited] = useState(false);
  const [masterData, setMasterData] = useState({} as Tform);
  const [step, setStep] = useState(1);

  const back = () => {
    if (step <= 1) {
      return;
    }
    setStep((old) => old - 1);
  };

  const next = <T,>(data: T) => {
    if (step >= stepsNodes.length) {
      return;
    }
    setMasterData((old) => {
      return { ...old, ...data };
    });
    setStep((old) => old + 1);
  };

  const jumpTo = (stepNum: number) => {
    if (stepNum < 1 || stepNum > stepsNodes.length) {
      return;
    }
    setStep(stepNum);
  };

  const submitMultiStepForm = (submitFn: (data: Tform) => void) => {
    setSubmited(true);
    submitFn(masterData);
  };

  const contextValue: TMultiStepContext<Tform> = {
    masterData,
    submited,
    StepNode: !submited ? stepsNodes[step - 1] : confirmationNode,
    currStep: step,
    maxSteps: stepsNodes.length,
    back,
    next,
    jumpTo,
    submitMultiStepForm,
  };

  return (
    <MultiStepFormContext.Provider value={contextValue}>
      {children}
    </MultiStepFormContext.Provider>
  );
}

export function useMultiStepFormContext<Tform>() {
  const context = useContext(MultiStepFormContext) as TMultiStepContext<Tform>;

  if (!context) {
    throw new Error(
      'Component using useMasterFormContext must be a child of the MasterForm',
    );
  }

  return context;
}
