import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Svg, {Line} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

type Props = NativeStackScreenProps<RootStackParamList, 'CarouselViewer'>;

const CarouselViewerScreen: React.FC<Props> = ({route, navigation}) => {
  const {images, initialIndex = 0} = route.params;
  const {width} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<{index: number | null}>}) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const renderItem = useCallback(
    ({item}: {item: {uri: string; desc?: string}}) => (
      <View style={[styles.page, {width}]}>
        <Image
          source={{uri: item.uri}}
          style={[styles.image, {width}]}
          resizeMode="contain"
        />
      </View>
    ),
    [width],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/* Description + Page dots */}
      <View style={[styles.bottomArea, {paddingBottom: insets.bottom + 16}]}>
        {images[activeIndex]?.desc != null && images[activeIndex].desc!.length > 0 && (
          <Text style={styles.description}>{images[activeIndex].desc}</Text>
        )}
        {images.length > 0 && (
          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === activeIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        )}
      </View>

      {/* Close button */}
      <TouchableOpacity
        style={[styles.closeButton, {top: insets.top + 12, right: 20}]}
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
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
  },
  bottomArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: 16,
  },
  description: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 4,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  closeButton: {
    position: 'absolute',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarouselViewerScreen;
