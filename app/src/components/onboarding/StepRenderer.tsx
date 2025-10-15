import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import OptionCard from './OptionCard';
import { OnboardingStep, OnboardingTheme } from '../../types/onboarding';

interface StepRendererProps {
  step: OnboardingStep;
  selectedValue?: any;
  onSelect: (value: any) => void;
  theme?: OnboardingTheme;
}

const getIconComponent = (iconName?: string) => {
  if (!iconName) return undefined;

  // For emojis, just return the emoji as text
  if (iconName.length <= 2) {
    return <Text style={{ fontSize: 24 }}>{iconName}</Text>;
  }

  // For icon names, you could integrate with your icon library here
  // For now, return a simple placeholder
  return <Text style={{ fontSize: 24 }}>📋</Text>;
};

export default function StepRenderer({ step, selectedValue, onSelect, theme }: StepRendererProps) {
  const styles = createStyles(theme);

  switch (step.type) {
    case 'single-choice':
      return (
        <View style={styles.container}>
          {step.options?.map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              icon={getIconComponent(option.icon)}
              onSelect={onSelect}
              selectedValue={selectedValue}
              theme={theme}
            />
          ))}
        </View>
      );

    case 'multi-choice':
      const selectedValues = Array.isArray(selectedValue) ? selectedValue : [];

      return (
        <View style={styles.container}>
          {step.options?.map((option) => (
            <OptionCard
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              icon={getIconComponent(option.icon)}
              onSelect={(value) => {
                const newSelection = selectedValues.includes(value)
                  ? selectedValues.filter(v => v !== value)
                  : [...selectedValues, value];
                onSelect(newSelection);
              }}
              selectedValue={selectedValues.includes(option.value) ? option.value : null}
              theme={theme}
            />
          ))}
        </View>
      );

    case 'text-input':
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={selectedValue || ''}
            onChangeText={onSelect}
            placeholder={step.placeholder || 'Enter your answer...'}
            placeholderTextColor={theme?.textColor || '#999'}
          />
        </View>
      );

    case 'number-input':
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            value={selectedValue?.toString() || ''}
            onChangeText={(text) => {
              const num = parseFloat(text);
              onSelect(isNaN(num) ? text : num);
            }}
            placeholder={step.placeholder || 'Enter a number...'}
            placeholderTextColor={theme?.textColor || '#999'}
            keyboardType="numeric"
          />
        </View>
      );

    case 'custom':
      return step.component ? (
        <View style={styles.container}>
          {step.component}
        </View>
      ) : null;

    default:
      return null;
  }
}

const createStyles = (theme?: OnboardingTheme) => StyleSheet.create({
  container: {
    gap: 12,
  },
  textInput: {
    backgroundColor: theme?.cardColor || '#2a2a2a',
    borderRadius: theme?.borderRadius || 16,
    padding: 20,
    fontSize: 16,
    color: theme?.textColor || '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
  },
});