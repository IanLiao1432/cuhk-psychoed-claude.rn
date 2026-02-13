import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface AboutIconProps {
  size?: number;
  color?: string;
}

const AboutIcon: React.FC<AboutIconProps> = ({
  size = 16,
  color = '#6E1E6F',
}) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 0c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 6a1 1 0 00-1 1v5a1 1 0 002 0V7a1 1 0 00-1-1zm0-3a1 1 0 00-1 1 1 1 0 002 0 1 1 0 00-1-1z"
      fill={color}
    />
  </Svg>
);

export default AboutIcon;
