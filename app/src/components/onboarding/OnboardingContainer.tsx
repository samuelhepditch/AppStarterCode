import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProgressBar from './ProgressBar';
import OnboardingScreen from './OnboardingScreen';
import {OnboardingStep, OnboardingData, OnboardingTheme} from '../../types/onboarding';

interface OnboardingContainerProps {
  steps: OnboardingStep[];
  onComplete: (data: OnboardingData) => void;
  theme?: OnboardingTheme;
}

export default function OnboardingContainer({
  steps,
  onComplete,
  theme,
}: OnboardingContainerProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<OnboardingData>({});

  const handleNext = (stepId: string, answer: any) => {
    const currentStepData = steps[currentStep];

    // Validate if validation function exists
    if (currentStepData.validation && !currentStepData.validation(answer)) {
      // Handle validation error - for now just return
      return;
    }

    const newAnswers = {...answers, [stepId]: answer};
    setAnswers(newAnswers);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ProgressBar
        progress={progress}
        onBack={handleBack}
        showBack={currentStep > 0}
      />
      <OnboardingScreen
        title={currentStepData.title}
        subtitle={currentStepData.subtitle}
        step={currentStepData}
        onContinue={(answer) => handleNext(currentStepData.id, answer)}
        theme={theme}
      >
        {currentStepData.component}
      </OnboardingScreen>
    </SafeAreaView>
  );
}

const createStyles = (theme?: OnboardingTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme?.backgroundColor || '#1a1a1a',
  },
});