import React from 'react';
import onboardingImage from '../assets/images/on-boarding-image.svg';
import { ONBOARDING } from '../constants/text';

export default function Onboarding(): JSX.Element {
  return (
    <div className="container inset-0 flex flex-col items-center justify-center min-h-screen gap-5 mx-auto bg-custom-green ">
      <h1 className="text-3xl font-semibold ">{ONBOARDING}</h1>
      <object
        className="h-[199px] w-[224px] object-fill"
        data={onboardingImage}
      />
    </div>
  );
}
