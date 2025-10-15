import React, {useState} from 'react';
import OnboardingContainer from '../onboarding/OnboardingContainer';
import LoadingScreen from '../onboarding/LoadingScreen';
import {onboardingConfig} from '../../../onboarding.config';
import {OnboardingData} from '../../types/onboarding';

export default function OnboardingFlow() {
  const [showLoading, setShowLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);

  const handleComplete = (data: OnboardingData) => {
    console.log('Onboarding complete!', data);
    setOnboardingData(data);
    setShowLoading(true);

    // Call the config's onComplete handler if provided
    if (onboardingConfig.onComplete) {
      onboardingConfig.onComplete(data);
    }
  };

  const handleLoadingComplete = () => {
    console.log('Ready to navigate to main app with:', onboardingData);
    // Navigate to your main app here
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <OnboardingContainer
      steps={onboardingConfig.steps}
      onComplete={handleComplete}
      theme={onboardingConfig.theme}
    />
  );
}