import React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

interface PassageIconProps {
  size?: number;
  color?: string;
}

const PassageIcon: React.FC<PassageIconProps> = ({size = 24, color = '#FFA7B3'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* Document body */}
    <Rect x={4} y={2} width={16} height={20} rx={2} stroke={color} strokeWidth={1.2} fill="none" />
    {/* Fold */}
    <Path d="M14 17l6-2v4a2 2 0 01-2 2h-4v-4z" fill={color} opacity={0.3} />
    {/* Lines */}
    <Rect x={7} y={6} width={7} height={2} rx={1} fill={color} />
    <Rect x={7} y={10} width={10} height={1} rx={0.5} fill={color} />
    <Rect x={7} y={12} width={7} height={1} rx={0.5} fill={color} />
    <Rect x={7} y={14} width={10} height={1} rx={0.5} fill={color} />
    <Rect x={7} y={16} width={5} height={1} rx={0.5} fill={color} />
  </Svg>
);

export default PassageIcon;
