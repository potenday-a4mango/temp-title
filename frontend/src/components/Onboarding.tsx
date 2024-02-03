import React from 'react';
import onboardingImage from '../assets/images/on-boarding-image.svg';
import { ONBOARDING } from '../constants/text';

export default function Onboarding(): JSX.Element {
  return (
    <div className="bg-custom-green fixed inset-0 flex flex-col items-center justify-center gap-5	">
      <h1 className="text-3xl font-semibold	">{ONBOARDING}</h1>
      <img
        className="h-[199px] w-[224px] object-fill"
        src={onboardingImage}
        alt="onboarding-image"
      />
    </div>
  );
}
