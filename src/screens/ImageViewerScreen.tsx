import React, {useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.lockToPortrait();
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
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
        style={[styles.closeButton, {top: insets.top + 20, right: insets.right + 20}]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}>
        <CloseIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImageViewerScreen;
