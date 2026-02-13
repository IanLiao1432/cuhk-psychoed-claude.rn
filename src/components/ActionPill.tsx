import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ActionPillProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

const ActionPill: React.FC<ActionPillProps> = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.pill} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.row}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  pill: {
    flex: 1,
    backgroundColor: 'rgba(255, 214, 212, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#9E619B',
    textAlign: 'center',
  },
});

export default ActionPill;
