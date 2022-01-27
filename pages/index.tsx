import React from 'react'
import { WelcomeStep } from '../components/steps/WelcomeStep';
import { EnterNameStep } from '../components/steps/EnterNameStep';
import { TwitterStep } from '../components/steps/TwitterStep';
import { ChooseAvatarStep } from '../components/steps/ChooseAvatarStep';

const stepsComponents = {
  0: WelcomeStep,
  1: EnterNameStep,
  2: TwitterStep,
  3: ChooseAvatarStep,
}

export default function Home() {
  const [step, setStep] = React.useState<number>(0)
  const Step = stepsComponents[step]

  return (
    <div>
      <Step />
    </div>
  );
}
