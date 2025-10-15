import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

interface PickerWheelProps {
  data: Array<{label: string; value: any}>;
  onSelect?: (value: any) => void;
  selectedValue?: any;
  itemHeight?: number;
  visibleItems?: number;
}

export default function PickerWheel({
  data,
  onSelect,
  selectedValue,
  itemHeight = 50,
  visibleItems = 5,
}: PickerWheelProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState(
    data.findIndex(item => item.value === selectedValue) || 0
  );

  const containerHeight = itemHeight * visibleItems;
  const paddingVertical = (containerHeight - itemHeight) / 2;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / itemHeight);

    if (index !== selectedIndex && index >= 0 && index < data.length) {
      setSelectedIndex(index);
      onSelect?.(data[index].value);
    }
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / itemHeight);

    // Snap to the nearest item
    scrollViewRef.current?.scrollTo({
      y: index * itemHeight,
      animated: true,
    });
  };

  return (
    <View style={[styles.container, {height: containerHeight}]}>
      {/* Selection indicator */}
      <View
        style={[
          styles.selectionIndicator,
          {
            height: itemHeight,
            top: paddingVertical,
          },
        ]}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={itemHeight}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: paddingVertical,
        }}
      >
        {data.map((item, index) => {
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(0.3, 1 - distance * 0.3);
          const scale = Math.max(0.8, 1 - distance * 0.1);

          return (
            <View
              key={index}
              style={[
                styles.item,
                {
                  height: itemHeight,
                  opacity,
                  transform: [{scale}],
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  index === selectedIndex && styles.selectedItemText,
                ]}
              >
                {item.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  selectionIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#3a3a3a',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 24,
    color: '#666',
    fontWeight: '500',
  },
  selectedItemText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 28,
  },
});