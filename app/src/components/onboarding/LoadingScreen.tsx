import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
  steps?: string[];
}

export default function LoadingScreen({
  onComplete,
  duration = 3000,
  steps = ['Customizing health plan...', 'Setting up your profile...', 'Almost done...'],
}: LoadingScreenProps) {
  const [progress] = useState(new Animated.Value(0));
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 100,
      duration: duration,
      useNativeDriver: false,
    }).start(() => {
      onComplete();
    });

    const stepInterval = duration / steps.length;
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        return prev;
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.percentage}>
          {progress.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%'],
          })}
        </Text>
        <Text style={styles.message}>We're setting everything up for you</Text>

        <View style={styles.progressContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>

        <Text style={styles.stepText}>{steps[currentStep]}</Text>

        <View style={styles.checklistContainer}>
          <Text style={styles.checklistTitle}>Daily recommendation for</Text>
          {['Calories', 'Carbs', 'Protein', 'Fats', 'Health Score'].map((item, index) => (
            <View key={item} style={styles.checklistItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.checklistText}>{item}</Text>
              {index === 0 && <Text style={styles.checkmark}>✓</Text>}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  progressContainer: {
    width: '80%',
    height: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 30,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  stepText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 40,
  },
  checklistContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  bullet: {
    color: '#fff',
    fontSize: 20,
    marginRight: 10,
  },
  checklistText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  checkmark: {
    color: '#4CAF50',
    fontSize: 20,
  },
});