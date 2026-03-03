import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

interface CalendarIconProps {
  size?: number;
  color?: string;
}

const CalendarIcon: React.FC<CalendarIconProps> = ({
  size = 24,
  color = '#6E1E6F',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={4} width={18} height={18} rx={3} stroke={color} strokeWidth={1.8} />
    <Path d="M3 9h18" stroke={color} strokeWidth={1.8} />
    <Path d="M8 2v4M16 2v4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Rect x={7} y={12} width={3} height={3} rx={0.5} fill={color} />
    <Rect x={7} y={16.5} width={3} height={3} rx={0.5} fill={color} />
    <Rect x={10.5} y={12} width={3} height={3} rx={0.5} fill={color} />
    <Rect x={14} y={12} width={3} height={3} rx={0.5} fill={color} />
  </Svg>
);

export default CalendarIcon;
