import React from 'react';
import Svg, {Line} from 'react-native-svg';

interface CloseIconProps {
  size?: number;
  color?: string;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  size = 14,
  color = '#333333',
}) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <Line
      x1="1"
      y1="1"
      x2="13"
      y2="13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Line
      x1="13"
      y1="1"
      x2="1"
      y2="13"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export default CloseIcon;
