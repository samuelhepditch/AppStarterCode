import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';

interface OptionCardProps {
  value: any;
  label: string;
  icon?: React.ReactNode;
  description?: string;
  onSelect?: (value: any) => void;
  selectedValue?: any;
}

export default function OptionCard({
  value,
  label,
  icon,
  description,
  onSelect,
  selectedValue,
  theme,
}: OptionCardProps) {
  const isSelected = selectedValue === value;
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.cardSelected]}
      onPress={() => onSelect?.(value)}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.textContainer}>
        <Text style={[styles.label, isSelected && styles.labelSelected]}>
          {label}
        </Text>
        {description && (
          <Text style={[styles.description, isSelected && styles.descriptionSelected]}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (theme?: any) => StyleSheet.create({
  card: {
    backgroundColor: theme?.cardColor || '#2a2a2a',
    borderRadius: theme?.borderRadius || 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: theme?.primaryColor || '#fff',
    borderColor: theme?.primaryColor || '#fff',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme?.backgroundColor || '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: theme?.textColor || '#fff',
  },
  labelSelected: {
    color: theme?.backgroundColor || '#000',
  },
  description: {
    fontSize: 14,
    color: theme?.textColor ? `${theme.textColor}80` : '#999',
    marginTop: 4,
  },
  descriptionSelected: {
    color: theme?.backgroundColor || '#666',
  },
});