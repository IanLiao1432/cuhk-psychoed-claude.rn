import React from 'react';
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

interface QuestIconProps {
  size?: number;
}

const QuestIcon: React.FC<QuestIconProps> = ({size = 60}) => (
  <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <Defs>
      <LinearGradient id="qBg" x1="3.28" y1="60" x2="58.37" y2="58.44" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C0DCFF" />
        <Stop offset={0.462} stopColor="#F2AFFF" />
        <Stop offset={1} stopColor="#FFABA8" />
      </LinearGradient>
      <LinearGradient id="qBorder" x1="32.97" y1="75" x2="-17.14" y2="42.9" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.452} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
      <LinearGradient id="qTriFill" x1="21.42" y1="49" x2="47.29" y2="48.33" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C0DCFF" />
        <Stop offset={0.462} stopColor="#F2AFFF" />
        <Stop offset={1} stopColor="#FFABA8" />
      </LinearGradient>
      <LinearGradient id="qTriStroke" x1="34.29" y1="53.5" x2="14.57" y2="40.59" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#FFFFFF" stopOpacity={0.5} />
        <Stop offset={0.452} stopColor="#FFFFFF" stopOpacity={0} />
        <Stop offset={1} stopColor="#FFFFFF" />
      </LinearGradient>
      <LinearGradient id="qCircFill" x1="0" y1="5" x2="10" y2="5" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C0DCFF" />
        <Stop offset={0.462} stopColor="#F2AFFF" />
        <Stop offset={1} stopColor="#FFABA8" />
      </LinearGradient>
    </Defs>
    {/* Background circle */}
    <Circle cx={30} cy={30} r={29.5} fill="url(#qBg)" fillOpacity={0.5} stroke="url(#qBorder)" />
    {/* Triangle shape */}
    <Path
      d="M44.28 38.37L21.68 43.58 31.24 20.99z"
      fill="url(#qTriFill)"
      fillOpacity={0.5}
      stroke="url(#qTriStroke)"
      strokeWidth={2}
    />
    <Path
      d="M31 19L20 45l19-15.5L31 19z"
      fill="url(#qTriStroke)"
    />
    {/* Vertex circles */}
    <Circle cx={31} cy={19} r={4.5} fill="url(#qCircFill)" fillOpacity={0.5} stroke="url(#qTriStroke)" />
    <Circle cx={46} cy={39} r={4.5} fill="url(#qCircFill)" fillOpacity={0.5} stroke="url(#qTriStroke)" />
    <Circle cx={20} cy={45} r={4.5} fill="url(#qCircFill)" fillOpacity={0.5} stroke="url(#qTriStroke)" />
  </Svg>
);

export default QuestIcon;
