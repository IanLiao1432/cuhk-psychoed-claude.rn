import React from 'react';
import {View, Text, Image, StyleSheet, Animated, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useWording} from '../context/WordingContext';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface BannerProps {
  animatedValue?: {
    opacity: Animated.Value;
    translateY: Animated.Value;
  };
}

const BannerContent: React.FC = () => {
  const {t} = useWording();

  return (
    <>
      <Image
        source={require('../assets/images/banner_bg.png')}
        style={styles.bannerBg}
        resizeMode="cover"
      />
      <Image
        source={require('../assets/images/dancer.png')}
        style={styles.dancer}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <View style={styles.titleBadge}>
          <LinearGradient
            colors={[
              'rgba(192, 220, 255, 0.5)',
              'rgba(242, 175, 255, 0.5)',
              'rgba(255, 171, 168, 0.5)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleBadgeBg}
          />
          <Text style={styles.titleText}>
            {t('homeLogoDesc1', '粉紅絲帶臨床決策輔助工具(香港版)')}
          </Text>
        </View>
        <View style={styles.titleBadge}>
          <LinearGradient
            colors={[
              'rgba(192, 220, 255, 0.5)',
              'rgba(242, 175, 255, 0.5)',
              'rgba(255, 171, 168, 0.5)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleBadgeBg}
          />
          <Text style={styles.subtitleText}>
            {t('homeLogoDesc2', 'BCT Aid HK')}
          </Text>
        </View>
      </View>
    </>
  );
};

const Banner: React.FC<BannerProps> = ({animatedValue}) => {
  if (animatedValue) {
    return (
      <Animated.View
        style={[
          styles.banner,
          {
            opacity: animatedValue.opacity,
            transform: [{translateY: animatedValue.translateY}],
          },
        ]}>
        <BannerContent />
      </Animated.View>
    );
  }

  return (
    <View style={styles.banner}>
      <BannerContent />
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    width: SCREEN_WIDTH,
    height: 360,
    overflow: 'hidden',
  },
  bannerBg: {
    position: 'absolute',
    width: SCREEN_WIDTH * 1.8,
    height: 360,
    left: -SCREEN_WIDTH * 0.4,
    top: 0,
  },
  dancer: {
    position: 'absolute',
    width: 200,
    height: 260,
    right: -10,
    top: 20,
  },
  ribbon: {
    position: 'absolute',
    width: 350,
    height: 320,
    left: 60,
    top: -80,
    transform: [{rotate: '45deg'}],
    opacity: 0.6,
  },
  logo: {
    position: 'absolute',
    left: 24,
    top: 93,
    width: 190,
    height: 117,
  },
  titleContainer: {
    position: 'absolute',
    top: 221.67,
    left: 24,
    gap: 2,
  },
  titleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  titleBadgeBg: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 41,
  },
  titleText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 22,
    color: '#6E1E6F',
  },
  subtitleText: {
    fontWeight: '700',
    fontSize: 11,
    lineHeight: 22,
    color: '#6E1E6F',
  },
});

export default Banner;
