import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Button from '../common/Button';
import StepRenderer from './StepRenderer';
import { OnboardingStep, OnboardingTheme } from '../../types/onboarding';

interface OnboardingScreenProps {
  title: string;
  subtitle?: string;
  step?: OnboardingStep;
  children?: React.ReactNode;
  onContinue: (answer: any) => void;
  buttonText?: string;
  theme?: OnboardingTheme;
}

export default function OnboardingScreen({
  title,
  subtitle,
  step,
  children,
  onContinue,
  buttonText = 'Continue',
  theme,
}: OnboardingScreenProps) {
  const [selectedValue, setSelectedValue] = useState<any>(null);

  const isDisabled = () => {
    if (step?.required === false) return false;
    if (step?.type === 'multi-choice') {
      return !Array.isArray(selectedValue) || selectedValue.length === 0;
    }
    return selectedValue === null || selectedValue === undefined || selectedValue === '';
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <View style={styles.optionsContainer}>
          {step ? (
            <StepRenderer
              step={step}
              selectedValue={selectedValue}
              onSelect={setSelectedValue}
              theme={theme}
            />
          ) : (
            React.Children.map(children, child => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child as React.ReactElement<any>, {
                  onSelect: setSelectedValue,
                  selectedValue: selectedValue,
                });
              }
              return child;
            })
          )}
        </View>
      </ScrollView>

      <Button
        title={buttonText}
        onPress={() => onContinue(selectedValue)}
        disabled={isDisabled()}
      />
    </View>
  );
}

const createStyles = (theme?: OnboardingTheme) => StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme?.textColor || '#fff',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: theme?.textColor || '#999',
    marginBottom: 40,
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
  },
});