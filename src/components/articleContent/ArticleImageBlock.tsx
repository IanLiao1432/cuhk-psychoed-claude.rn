import React from 'react';
import {View, Image, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {GOOGLE_CLOUD_STORAGE_BUCKET} from '@env';

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
  aspectRatio,
  isFullWidth,
  isNoPadding,
  isPlaceCenter,
  imageWidthRatio,
}) => {
  const {width: screenWidth} = useWindowDimensions();
  const contentWidth = screenWidth - 40; // 20px padding each side
  const containerPadding = isNoPadding ? 0 : 16;
  const availableWidth = isFullWidth
    ? contentWidth
    : contentWidth - containerPadding * 2;
  const imageWidth = imageWidthRatio
    ? availableWidth * imageWidthRatio
    : availableWidth;

  const uri = `${GOOGLE_CLOUD_STORAGE_BUCKET}/${imageUrl}`;

  console.log('uri: ', uri)
  return (
    <View
      style={[
        !isFullWidth && !isNoPadding && styles.container,
        isFullWidth && styles.containerFullWidth,
      ]}>
      {imageTitle != null && imageTitle.length > 0 && (
        <Text style={styles.title}>{imageTitle}</Text>
      )}
      <View
        style={[
          isPlaceCenter && styles.centered,
          aspectRatio != null && {
            width: imageWidth,
            aspectRatio,
          },
        ]}>
        <Image
          source={{uri}}
          style={[
            styles.image,
            aspectRatio != null
              ? {width: '100%', aspectRatio}
              : {width: imageWidth, height: imageWidth * 0.6},
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
});

export default ArticleImageBlock;
