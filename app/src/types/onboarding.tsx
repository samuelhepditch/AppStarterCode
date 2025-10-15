import React from 'react';

export type StepType = 'single-choice' | 'multi-choice' | 'text-input' | 'number-input' | 'custom';

export interface StepOption {
  value: any;
  label: string;
  description?: string;
  icon?: string; // Icon name or emoji
}

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  type: StepType;
  options?: StepOption[];
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => boolean | string;
  component?: React.ReactNode; // For custom components
}

export interface OnboardingConfig {
  steps: OnboardingStep[];
  theme?: OnboardingTheme;
  onComplete?: (data: OnboardingData) => void;
}

export interface OnboardingTheme {
  primaryColor?: string;
  backgroundColor?: string;
  cardColor?: string;
  textColor?: string;
  buttonColor?: string;
  borderRadius?: number;
}

export interface OnboardingData {
  [key: string]: any;
}

export interface OptionCardProps {
  value: any;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  onSelect?: (value: any) => void;
  selectedValue?: any;
  theme?: OnboardingTheme;
}

const OnboardingTypes = () => {
  return <div>Onboarding Types</div>;
};

export default OnboardingTypes;