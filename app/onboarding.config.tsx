import React from 'react';
import { View, Text } from 'react-native';
import { OnboardingConfig } from './src/types/onboarding';

/**
 * Onboarding Template Configuration
 *
 * Customize your onboarding flow by editing this file.
 * No need to touch the underlying components!
 */

export const onboardingConfig: OnboardingConfig = {
  // Your onboarding steps
  steps: [
    {
      id: 'gender',
      title: 'Choose your Gender',
      subtitle: 'This will be used to calibrate your custom plan.',
      type: 'single-choice',
      required: true,
      options: [
        { value: 'male', label: 'Male', icon: '👨' },
        { value: 'female', label: 'Female', icon: '👩' },
        { value: 'other', label: 'Other', icon: '🤵' },
      ],
    },
    {
      id: 'workouts',
      title: 'How many workouts do you do per week?',
      subtitle: 'This will be used to calibrate your custom plan.',
      type: 'single-choice',
      required: true,
      options: [
        {
          value: '0-2',
          label: '0-2',
          description: 'Workouts now and then',
          icon: '🏃‍♂️'
        },
        {
          value: '3-5',
          label: '3-5',
          description: 'A few workouts per week',
          icon: '💪'
        },
        {
          value: '6+',
          label: '6+',
          description: 'Dedicated athlete',
          icon: '🏆'
        },
      ],
    },
    {
      id: 'goal',
      title: 'What is your goal?',
      subtitle: 'This helps us generate a plan for your calorie intake.',
      type: 'single-choice',
      required: true,
      options: [
        { value: 'lose', label: 'Lose weight', icon: '📉' },
        { value: 'maintain', label: 'Maintain', icon: '⚖️' },
        { value: 'gain', label: 'Gain weight', icon: '📈' },
      ],
    },
    {
      id: 'diet',
      title: 'Do you follow a specific diet?',
      type: 'single-choice',
      required: true,
      options: [
        { value: 'classic', label: 'Classic', icon: '🍎' },
        { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
        { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
        { value: 'vegan', label: 'Vegan', icon: '🌱' },
      ],
    },
    {
      id: 'name',
      title: 'What\'s your name?',
      subtitle: 'We\'ll use this to personalize your experience.',
      type: 'text-input',
      placeholder: 'Enter your name...',
      required: true,
      validation: (value: string) => {
        if (!value || value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return true;
      },
    },
    {
      id: 'age',
      title: 'How old are you?',
      subtitle: 'Age helps us provide better recommendations.',
      type: 'number-input',
      placeholder: 'Enter your age...',
      required: true,
      validation: (value: number) => {
        if (!value || value < 13 || value > 120) {
          return 'Please enter a valid age between 13 and 120';
        }
        return true;
      },
    },
  ],

  // Customize the look and feel
  theme: {
    primaryColor: '#007AFF',
    backgroundColor: '#1a1a1a',
    cardColor: '#2a2a2a',
    textColor: '#ffffff',
    buttonColor: '#007AFF',
    borderRadius: 16,
  },

  // Handle completion
  onComplete: (data) => {
    console.log('Onboarding completed with data:', data);
    // Navigate to your main app or save data
    // Example: router.push('/main') or AsyncStorage.setItem('onboardingData', JSON.stringify(data))
  },
};

/**
 * Example configurations for different use cases:
 */

// E-commerce onboarding
export const ecommerceConfig: OnboardingConfig = {
  steps: [
    {
      id: 'interests',
      title: 'What are you interested in?',
      subtitle: 'Help us show you products you\'ll love.',
      type: 'multi-choice',
      options: [
        { value: 'electronics', label: 'Electronics', icon: '📱' },
        { value: 'fashion', label: 'Fashion', icon: '👕' },
        { value: 'home', label: 'Home & Garden', icon: '🏠' },
        { value: 'sports', label: 'Sports & Outdoors', icon: '⚽' },
      ],
    },
    {
      id: 'budget',
      title: 'What\'s your typical budget?',
      type: 'single-choice',
      options: [
        { value: 'budget', label: '$0 - $50', icon: '💰' },
        { value: 'mid', label: '$50 - $200', icon: '💳' },
        { value: 'premium', label: '$200+', icon: '💎' },
      ],
    },
  ],
  theme: {
    primaryColor: '#FF6B6B',
    backgroundColor: '#F8F9FA',
    cardColor: '#FFFFFF',
    textColor: '#2C3E50',
    buttonColor: '#FF6B6B',
  },
};

// App preferences onboarding
export const appPreferencesConfig: OnboardingConfig = {
  steps: [
    {
      id: 'notifications',
      title: 'How would you like to be notified?',
      type: 'multi-choice',
      options: [
        { value: 'push', label: 'Push notifications', icon: '🔔' },
        { value: 'email', label: 'Email updates', icon: '📧' },
        { value: 'sms', label: 'SMS alerts', icon: '📱' },
      ],
    },
    {
      id: 'theme',
      title: 'Choose your preferred theme',
      type: 'single-choice',
      options: [
        { value: 'light', label: 'Light mode', icon: '☀️' },
        { value: 'dark', label: 'Dark mode', icon: '🌙' },
        { value: 'auto', label: 'Auto (system)', icon: '🔄' },
      ],
    },
  ],
};

// Default export required by Expo Router
const OnboardingConfigComponent = () => {
  return (
    <View>
      <Text>Onboarding Configuration</Text>
    </View>
  );
};

export default OnboardingConfigComponent;