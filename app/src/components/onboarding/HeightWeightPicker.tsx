import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PickerWheel from './PickerWheel';

interface HeightWeightPickerProps {
  onSelect?: (value: {height: number; weight: number; unit: string}) => void;
  selectedValue?: any;
  mode?: 'height' | 'weight';
}

export default function HeightWeightPicker({
  onSelect,
  selectedValue,
  mode = 'height',
}: HeightWeightPickerProps) {
  const [isMetric, setIsMetric] = useState(false);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(6);
  const [weight, setWeight] = useState(120);

  const feetData = Array.from({length: 6}, (_, i) => ({
    label: `${i + 2} ft`,
    value: i + 2,
  }));

  const inchesData = Array.from({length: 12}, (_, i) => ({
    label: `${i} in`,
    value: i,
  }));

  const weightData = Array.from({length: 300}, (_, i) => ({
    label: `${i + 50} lb`,
    value: i + 50,
  }));

  const cmData = Array.from({length: 150}, (_, i) => ({
    label: `${i + 100} cm`,
    value: i + 100,
  }));

  const kgData = Array.from({length: 150}, (_, i) => ({
    label: `${i + 30} kg`,
    value: i + 30,
  }));

  const handleUpdate = () => {
    if (mode === 'height') {
      const totalInches = isMetric ? 0 : feet * 12 + inches;
      onSelect?.({
        height: isMetric ? 170 : totalInches,
        weight: 0,
        unit: isMetric ? 'metric' : 'imperial',
      });
    } else {
      onSelect?.({
        height: 0,
        weight,
        unit: isMetric ? 'metric' : 'imperial',
      });
    }
  };

  React.useEffect(() => {
    handleUpdate();
  }, [feet, inches, weight, isMetric]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !isMetric && styles.toggleButtonActive]}
          onPress={() => setIsMetric(false)}
        >
          <Text style={[styles.toggleText, !isMetric && styles.toggleTextActive]}>
            Imperial
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, isMetric && styles.toggleButtonActive]}
          onPress={() => setIsMetric(true)}
        >
          <Text style={[styles.toggleText, isMetric && styles.toggleTextActive]}>
            Metric
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickersContainer}>
        {mode === 'height' && !isMetric && (
          <>
            <View style={styles.pickerColumn}>
              <Text style={styles.label}>Height</Text>
              <PickerWheel
                data={feetData}
                onSelect={setFeet}
                selectedValue={feet}
                itemHeight={50}
                visibleItems={5}
              />
            </View>
            <View style={styles.pickerColumn}>
              <Text style={styles.label}>&nbsp;</Text>
              <PickerWheel
                data={inchesData}
                onSelect={setInches}
                selectedValue={inches}
                itemHeight={50}
                visibleItems={5}
              />
            </View>
          </>
        )}

        {mode === 'height' && isMetric && (
          <View style={styles.pickerColumn}>
            <Text style={styles.label}>Height</Text>
            <PickerWheel
              data={cmData}
              onSelect={(val) => onSelect?.({height: val, weight: 0, unit: 'metric'})}
              selectedValue={170}
              itemHeight={50}
              visibleItems={5}
            />
          </View>
        )}

        {mode === 'weight' && (
          <View style={styles.pickerColumn}>
            <Text style={styles.label}>Weight</Text>
            <PickerWheel
              data={isMetric ? kgData : weightData}
              onSelect={setWeight}
              selectedValue={weight}
              itemHeight={50}
              visibleItems={5}
            />
          </View>
        )}
      </View>

      <View style={styles.soundIcon}>
        <Text style={styles.soundEmoji}>🔊</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    padding: 4,
    marginBottom: 30,
    alignSelf: 'center',
  },
  toggleButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
  },
  toggleText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#000',
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  pickerColumn: {
    flex: 1,
    maxWidth: 150,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  soundIcon: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: '#2a2a2a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  soundEmoji: {
    fontSize: 24,
  },
});