import React from 'react';
import Svg, {Circle, Path, Defs, LinearGradient, Stop} from 'react-native-svg';

interface NextArrowIconProps {
  size?: number;
}

const NextArrowIcon: React.FC<NextArrowIconProps> = ({size = 32}) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Defs>
      <LinearGradient id="nextBorder" x1="17.59" y1="40" x2="-9.14" y2="22.88" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.452} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
    </Defs>
    <Circle cx={16} cy={16} r={15.5} fill="#FFE7E7" fillOpacity={0.75} stroke="url(#nextBorder)" />
    <Path
      d="M13.4 10.46a1.5 1.5 0 012.07-.26l.13.11 4.13 4.13a1.5 1.5 0 01.11 2l-.11.12-4.13 4.13a1.5 1.5 0 01-2.24-1.99l.11-.13L16.59 16l-3.12-3.12a1.5 1.5 0 01-.11-2l.11-.12-.07.06z"
      fill="#FFA7B3"
    />
  </Svg>
);

export default NextArrowIcon;
