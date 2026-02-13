import React from 'react';
import Svg, {
  Circle,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface ArticleIconProps {
  size?: number;
}

const ArticleIcon: React.FC<ArticleIconProps> = ({size = 60}) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <Defs>
      <LinearGradient id="artBg" x1="3.28" y1="60" x2="58.37" y2="58.44" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C0DCFF" />
        <Stop offset={0.462} stopColor="#F2AFFF" />
        <Stop offset={1} stopColor="#FFABA8" />
      </LinearGradient>
      <LinearGradient id="artBorder" x1="32.97" y1="75" x2="-17.14" y2="42.9" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.452} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
      <LinearGradient id="artDocBorder" x1="31.19" y1="52.5" x2="-3.2" y2="41.03" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.452} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
      <LinearGradient id="artLine1" x1="26" y1="24" x2="22" y2="21" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.5} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
    </Defs>
    {/* Background circle */}
    <Circle cx={30} cy={30} r={29.5} fill="url(#artBg)" fillOpacity={0.5} stroke="url(#artBorder)" />
    {/* Document outline */}
    <Path
      d="M20 15.5h20a1.5 1.5 0 011.5 1.5v24a5.5 5.5 0 01-5.5 5.5H20a1.5 1.5 0 01-1.5-1.5V17a1.5 1.5 0 011.5-1.5z"
      stroke="url(#artDocBorder)"
    />
    {/* Document lines */}
    <Rect x={22} y={21} width={10} height={1.5} rx={0.75} fill="url(#artLine1)" />
    <Rect x={22} y={27} width={15} height={1.5} rx={0.75} fill="url(#artLine1)" />
    <Rect x={22} y={33} width={15} height={1.5} rx={0.75} fill="url(#artLine1)" />
    <Rect x={22} y={39} width={8} height={1.5} rx={0.75} fill="url(#artLine1)" />
    {/* Fold indicator */}
    <Path d="M36 41l5.5-2v4a2 2 0 01-2 2H36v-4z" fill="url(#artLine1)" />
  </Svg>
);

export default ArticleIcon;
