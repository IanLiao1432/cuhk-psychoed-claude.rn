import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Animated,
  useWindowDimensions,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation-locker';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/AppNavigator';

const CloseIcon = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Line
      x1={10}
      y1={10}
      x2={22}
      y2={22}
      stroke="#FFFFFF"
      strokeWidth={4}
      strokeLinecap="round"
    />
    <Line
      x1={22}
      y1={10}
      x2={10}
      y2={22}
      stroke="#FFFFFF"
      strokeWidth={4}
      strokeLinecap="round"
    />
  </Svg>
);

type Props = NativeStackScreenProps<RootStackParamList, 'ImageViewer'>;

const ImageViewerScreen: React.FC<Props> = ({route, navigation}) => {
  const {images, initialIndex = 0} = route.params;
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Delay orientation lock so the black modal is fully presented first
    const timer = setTimeout(() => {
      Orientation.lockToLandscape();
    }, 50);

    // Fade in after enough time for orientation to settle
    const fadeTimer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(fadeTimer);
    };
  }, [fadeAnim]);

  const handleClose = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Orientation.lockToPortrait();
      setTimeout(() => {
        navigation.goBack();
      }, 300);
    });
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <ScrollView
          maximumZoomScale={5}
          minimumZoomScale={1}
          centerContent
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <Image
            source={{uri: images[initialIndex].uri}}
            style={{width, height}}
            resizeMode="contain"
          />
        </ScrollView>
        <TouchableOpacity
          style={[styles.closeButton, {top: insets.top, right: insets.right + 20}]}
          onPress={handleClose}
          activeOpacity={0.7}>
          <CloseIcon />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageViewerScreen;
