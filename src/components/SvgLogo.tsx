import React from 'react';
import {SvgXml} from 'react-native-svg';

interface SvgLogoProps {
  xml: string;
  width: number;
  height: number;
}

const SvgLogo: React.FC<SvgLogoProps> = ({xml, width, height}) => (
  <SvgXml xml={xml} width={width} height={height} />
);

export default SvgLogo;
