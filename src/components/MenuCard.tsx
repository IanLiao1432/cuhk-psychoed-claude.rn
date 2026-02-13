import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import NextArrowIcon from './icons/NextArrowIcon';

interface MenuCardProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({icon, title, onPress}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.row}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <NextArrowIcon size={32} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#FFCECE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
  },
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
  },
});

export default MenuCard;
