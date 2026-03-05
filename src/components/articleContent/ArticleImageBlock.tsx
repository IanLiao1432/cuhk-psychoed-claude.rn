import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions} from 'react-native';
import Svg, {Circle, Line, G} from 'react-native-svg';
import {GOOGLE_CLOUD_STORAGE_BUCKET} from '@env';
import {useWording} from '../../context/WordingContext';

const MagnifyIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <G>
      <Circle cx={9} cy={9} r={6.5} stroke="#6E1E6F" strokeWidth={2} fill="none" />
      <Line x1={14} y1={14} x2={18} y2={18} stroke="#6E1E6F" strokeWidth={2} strokeLinecap="round" />
      <Line x1={6} y1={9} x2={12} y2={9} stroke="#6E1E6F" strokeWidth={2} strokeLinecap="round" />
      <Line x1={9} y1={6} x2={9} y2={12} stroke="#6E1E6F" strokeWidth={2} strokeLinecap="round" />
    </G>
  </Svg>
);

interface ArticleImageBlockProps {
  imageUrl: string;
  imageTitle?: string;
  imageDetail?: string;
  isShowMagnifying?: boolean;
  isFullWidth?: boolean;
  isNoPadding?: boolean;
  isPlaceCenter?: boolean;
  aspectRatio?: number;
  imageWidthRatio?: number;
}

const ArticleImageBlock: React.FC<ArticleImageBlockProps> = ({
  imageUrl,
  imageTitle,
  isShowMagnifying,
  aspectRatio,
  isFullWidth,
  isNoPadding,
  isPlaceCenter,
  imageWidthRatio,
}) => {
  const {t} = useWording();
  const {width: screenWidth} = useWindowDimensions();
  const contentWidth = screenWidth - 40; // 20px padding each side
  const containerPadding = isNoPadding ? 0 : 16;
  const availableWidth = isFullWidth
    ? contentWidth
    : contentWidth - containerPadding * 2;
  const imageWidth = Math.min(
    imageWidthRatio ? screenWidth * imageWidthRatio / 100 : availableWidth,
    availableWidth,
  );

  const uri = `${GOOGLE_CLOUD_STORAGE_BUCKET}/${imageUrl}`;

  return (
    <View
      style={[
        styles.wrapper,
        isPlaceCenter && styles.centered,
      ]}>
      {imageTitle != null && imageTitle.length > 0 && (
        <Text style={styles.title}>{imageTitle}</Text>
      )}
      <View
        style={[
          (!isFullWidth && !isNoPadding) || isShowMagnifying
            ? styles.container
            : isFullWidth
              ? styles.containerFullWidth
              : undefined,
        ]}>
        <Image
          source={{uri}}
          style={[
            styles.image,
            {width: imageWidth, maxWidth: '100%'},
            aspectRatio != null
              ? {aspectRatio}
              : {height: imageWidth * 0.6},
          ]}
          resizeMode="contain"
        />
        {isShowMagnifying && (
          <TouchableOpacity style={styles.magnifyButton} activeOpacity={0.7}>
            <MagnifyIcon />
            <Text style={styles.magnifyText}>
              {t('magnifyButton', '放大顯示')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  container: {
    alignSelf: 'flex-start',
    maxWidth: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  containerFullWidth: {
    gap: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  centered: {
    alignItems: 'center',
  },
  image: {
    borderRadius: 8,
  },
  magnifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  magnifyText: {
    fontWeight: '700',
    fontSize: 14,
    color: '#6E1E6F',
  },
});

export default ArticleImageBlock;
