import React from 'react';
import { ReactComponent as OnboardingImage } from '../assets/images/on-boarding-image.svg';
import { ONBOARDING } from '../constants/text';

export default function Onboarding(): JSX.Element {
  return (
    <div className="container inset-0 mx-auto flex min-h-screen flex-col items-center justify-center gap-5 bg-custom-green ">
      <h1 className="text-3xl font-semibold ">{ONBOARDING}</h1>
      <OnboardingImage />
    </div>
  );
}
