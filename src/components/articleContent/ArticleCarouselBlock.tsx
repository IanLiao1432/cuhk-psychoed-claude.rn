import React from 'react';
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Line, G, Path} from 'react-native-svg';
import {ImageContent} from '../../types/ReadingMaterialItem';
import {GOOGLE_CLOUD_STORAGE_BUCKET} from '@env';
import {useWording} from '../../context/WordingContext';

const PlayIcon = () => (
  <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
    <Circle cx={28} cy={28} r={28} fill="rgba(255,255,255,0.8)" />
    <Path d="M22 18L40 28L22 38V18Z" fill="#6E1E6F" />
  </Svg>
);

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

interface ArticleCarouselBlockProps {
  content: ImageContent;
}

const ArticleCarouselBlock: React.FC<ArticleCarouselBlockProps> = ({
  content,
}) => {
  const {t} = useWording();
  const {width: screenWidth} = useWindowDimensions();
  const hasImages = content.images != null && content.images.length > 0;
  const hasVideo = content.youtubeId != null && content.youtubeId.length > 0;

  if (!hasImages && !hasVideo) {
    return null;
  }

  const imageHeight = 180;
  const imageWidth = 160;

  const handlePlayPress = () => {
    if (content.youtubeId) {
      Linking.openURL(`https://www.youtube.com/watch?v=${content.youtubeId}`);
    }
  };

  return (
    <View style={styles.wrapper}>
      {/* Image carousel */}
      {hasImages && (
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {content.images.map((img, index) => (
              <Image
                key={index}
                source={{uri: `${GOOGLE_CLOUD_STORAGE_BUCKET}/${img.imageUrl}`}}
                style={{width: imageWidth, height: imageHeight, borderRadius: 4}}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.magnifyButton} activeOpacity={0.7}>
            <MagnifyIcon />
            <Text style={styles.magnifyText}>
              {t('magnifyButton', '放大顯示')}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* YouTube video */}
      {hasVideo && (
        <View style={styles.videoContainer}>
          <View style={styles.videoHeader}>
            <View style={styles.badge}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                  'rgba(192,220,255,0.5)',
                  'rgba(242,175,255,0.5)',
                  'rgba(255,171,168,0.5)',
                ]}
                style={StyleSheet.absoluteFill}
              />
              <Text style={styles.badgeText}>
                {t('videoBadge', '影片')}
              </Text>
            </View>
            {content.title != null && content.title.length > 0 && (
              <Text style={styles.videoTitle}>{content.title}</Text>
            )}
          </View>
          <TouchableOpacity
            onPress={handlePlayPress}
            activeOpacity={0.8}
            style={styles.thumbnailWrap}>
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${content.youtubeId}/hqdefault.jpg`,
              }}
              style={[styles.thumbnail, {width: screenWidth - 40 - 32}]}
              resizeMode="cover"
            />
            <View style={styles.playOverlay}>
              <PlayIcon />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
  },
  // Image carousel
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  scrollContent: {
    gap: 4,
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
  // YouTube video
  videoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  videoHeader: {
    gap: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  badgeText: {
    fontWeight: '500',
    fontSize: 12,
    color: '#6E1E6F',
  },
  videoTitle: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  thumbnailWrap: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    height: 185,
    borderRadius: 8,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArticleCarouselBlock;
