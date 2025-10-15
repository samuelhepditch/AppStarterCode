import React from 'react';
import {User, Dumbbell, Target, Apple} from 'lucide-react-native';
import OptionCard from '../components/onboarding/OptionCard';
import {OnboardingStep} from '../types/onboarding';

export const caloriePlanSteps: OnboardingStep[] = [
  {
    id: 'gender',
    title: 'Choose your Gender',
    subtitle: 'This will be used to calibrate your custom plan.',
    component: [
      <OptionCard
        key="male"
        value="male"
        label="Male"
        icon={<User color="#fff" size={24} />}
      />,
      <OptionCard
        key="female"
        value="female"
        label="Female"
        icon={<User color="#fff" size={24} />}
      />,
      <OptionCard
        key="other"
        value="other"
        label="Other"
        icon={<User color="#fff" size={24} />}
      />,
    ],
  },
  {
    id: 'workouts',
    title: 'How many workouts do you do per week?',
    subtitle: 'This will be used to calibrate your custom plan.',
    component: [
      <OptionCard
        key="0-2"
        value="0-2"
        label="0-2"
        description="Workouts now and then"
        icon={<Dumbbell color="#fff" size={24} />}
      />,
      <OptionCard
        key="3-5"
        value="3-5"
        label="3-5"
        description="A few workouts per week"
        icon={<Dumbbell color="#fff" size={24} />}
      />,
      <OptionCard
        key="6+"
        value="6+"
        label="6+"
        description="Dedicated athlete"
        icon={<Dumbbell color="#fff" size={24} />}
      />,
    ],
  },
  {
    id: 'goal',
    title: 'What is your goal?',
    subtitle: 'This helps us generate a plan for your calorie intake.',
    component: [
      <OptionCard
        key="lose"
        value="lose"
        label="Lose weight"
        icon={<Target color="#fff" size={24} />}
      />,
      <OptionCard
        key="maintain"
        value="maintain"
        label="Maintain"
        icon={<Target color="#fff" size={24} />}
      />,
      <OptionCard
        key="gain"
        value="gain"
        label="Gain weight"
        icon={<Target color="#fff" size={24} />}
      />,
    ],
  },
  {
    id: 'diet',
    title: 'Do you follow a specific diet?',
    component: [
      <OptionCard key="classic" value="classic" label="Classic" icon={<Apple color="#fff" size={24} />} />,
      <OptionCard key="pescatarian" value="pescatarian" label="Pescatarian" icon={<Apple color="#fff" size={24} />} />,
      <OptionCard key="vegetarian" value="vegetarian" label="Vegetarian" icon={<Apple color="#fff" size={24} />} />,
      <OptionCard key="vegan" value="vegan" label="Vegan" icon={<Apple color="#fff" size={24} />} />,
    ],
  },
];

const OnboardingSteps = () => {
  return <div>Onboarding Steps Configuration</div>;
};

export default OnboardingSteps;