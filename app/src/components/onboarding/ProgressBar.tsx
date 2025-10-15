import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';

interface ProgressBarProps {
  progress: number;
  onBack: () => void;
  showBack?: boolean;
}

export default function ProgressBar({progress, onBack, showBack = true}: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
      )}
      <View style={[styles.progressContainer, !showBack && styles.progressFull]}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#2a2a2a',
    borderRadius: 2,
    marginLeft: 15,
    overflow: 'hidden',
  },
  progressFull: {
    marginLeft: 0,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});