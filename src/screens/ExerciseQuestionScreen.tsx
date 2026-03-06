import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Svg, { Circle as SvgCircle, Path } from 'react-native-svg';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWording } from '../context/WordingContext';
import { getQuestionnaire } from '../assets/staticContent/questionnaire';
import CloseIcon from '../components/icons/CloseIcon';
import { Option } from '../types/Option';

const icBackPale = require('../assets/images/ic_back_pale.png');
const icNextPale = require('../assets/images/ic_next_pale.png');
const icRectangle239 = require('../assets/images/ic_rectangle_239.png');

const SLIDER_TRACK_HEIGHT = 24;
const THUMB_SIZE = 32;

const ExerciseQuestionScreen: React.FC = () => {
  const { t } = useWording();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const { width: screenWidth } = useWindowDimensions();

  const questions = useMemo(() => getQuestionnaire(t), [t]);
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() =>
    new Array(totalQuestions).fill(50),
  );

  const currentQuestion = questions[currentIndex];
  const sliderValue = answers[currentIndex];

  const setSliderValue = useCallback(
    (value: number) => {
      setAnswers(prev => {
        const next = [...prev];
        next[currentIndex] = value;
        return next;
      });
    },
    [currentIndex],
  );

  const handleNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      // TODO: navigate to result/loading screen
      navigation.goBack();
    }
  }, [currentIndex, totalQuestions, navigation]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // Slider drag handler
  const sliderTrackWidth = screenWidth - 40 - 32 - 32; // screen - scrollPadding - cardPadding
  const sliderRef = useRef<View>(null);
  const sliderOriginX = useRef(0);

  const updateSliderFromX = useCallback(
    (pageX: number) => {
      const x = pageX - sliderOriginX.current;
      const ratio = Math.max(0, Math.min(1, x / sliderTrackWidth));
      const stepped = Math.round(ratio * 10) * 10;
      setSliderValue(stepped);
    },
    [sliderTrackWidth, setSliderValue],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: evt => {
          sliderRef.current?.measureInWindow(x => {
            sliderOriginX.current = x;
            updateSliderFromX(evt.nativeEvent.pageX);
          });
        },
        onPanResponderMove: evt => {
          updateSliderFromX(evt.nativeEvent.pageX);
        },
      }),
    [updateSliderFromX],
  );
  const totalProgress = questions.length;

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      {/* Header: progress + close */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerLeft}>
          <View style={styles.progressDots}>
            {Array.from({ length: totalProgress }, (_, index) => {
              const key = `dot-${index}`;
              if (index === currentIndex) {
                return (
                  <Image
                    key={key}
                    source={icRectangle239}
                    resizeMode="contain"
                    style={{ width: 24, height: 8 }}
                  />
                );
              }
              return <View key={key} style={styles.dot} />;
            })}
          </View>
          <Text style={styles.headerSubtitle}>
            {t('exerciseTitle', '價值觀探索練習')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.closeButton}
        >
          <CloseIcon size={14} color="#9E619B" />
        </TouchableOpacity>
      </View>

      {/* Question title */}
      <View style={styles.titleRow}>
        <View style={styles.questionBadge}>
          <Text style={styles.questionBadgeText}>{currentIndex + 1}</Text>
        </View>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 80 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          {/* Comparison cards */}
          <View style={styles.comparisonRow}>
            <ComparisonCard option={currentQuestion.options[0]} />
            <ComparisonCard option={currentQuestion.options[1]} />
          </View>

          {/* Rating prompt */}
          <View style={styles.promptRow}>
            <LinearGradient
              colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.promptBar}
            />
            <Text style={styles.promptText}>{currentQuestion.question}</Text>
          </View>

          {/* Slider */}
          <View style={styles.sliderContainer}>
            <View
              ref={sliderRef}
              style={styles.sliderTrackOuter}
              {...panResponder.panHandlers}
            >
              {/* Value label above thumb */}
              <Text
                style={[
                  styles.sliderValueText,
                  {
                    left: `${5 + (sliderValue / 111.1111) * 100}%`,
                    marginLeft: -20,
                  },
                ]}
              >
                {sliderValue}
              </Text>
              {/* Gradient track background */}
              <LinearGradient
                colors={[
                  'rgba(192,220,255,0.5)',
                  'rgba(242,175,255,0.5)',
                  'rgba(255,171,168,0.5)',
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.sliderTrack}
              >
                <View
                  style={{
                    paddingHorizontal: 7,
                    flexDirection: 'row',
                    gap: 22.33,
                  }}
                >
                  {Array.from({ length: 11 }).map((_, i) => (
                    <View key={i} style={styles.sliderDot} />
                  ))}
                </View>
              </LinearGradient>
              {/* Filled track */}
              <View
                style={[
                  styles.sliderFill,
                  { width: `${5 + (sliderValue / 111.1111) * 100}%` },
                ]}
              />
              {/* Thumb */}
              <View
                style={[
                  styles.sliderThumb,
                  { left: `${5 + (sliderValue / 111.1111) * 100}%` },
                ]}
              >
                <View style={styles.sliderThumbInner} />
              </View>
            </View>
            <View style={styles.sliderLabels}>
              <View>
                <Text style={styles.sliderEndNumber}>0</Text>
                <Text style={styles.sliderEndLabel}>
                  {t('sliderMin', '完全不重要')}
                </Text>
              </View>
              <View style={styles.sliderEndRight}>
                <Text style={styles.sliderEndNumber}>100</Text>
                <Text style={styles.sliderEndLabel}>
                  {t('sliderMax', '非常重要')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom navigation */}
      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(insets.bottom, 20) },
        ]}
      >
        <View style={styles.bottomBarInner}>
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={handlePrev}
              activeOpacity={0.7}
              style={styles.prevButtonWrap}
            >
              <View style={styles.prevButton}>
                <Image
                  source={icBackPale}
                  style={styles.prevArrow}
                  resizeMode="contain"
                />
                <Text style={styles.navButtonText}>
                  {t('exercisePrev', '上一題')}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.7}
            style={[
              styles.nextButtonWrap,
              currentIndex === 0 && styles.nextButtonFull,
            ]}
          >
            <LinearGradient
              colors={['#FEEAEE', '#FFA7B3']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.nextButton}
            >
              <Text style={styles.navButtonText}>
                {currentIndex < totalQuestions - 1
                  ? t('exerciseNext', '下一題')
                  : t('exerciseSubmit', '提交')}
              </Text>
              <Image
                source={icNextPale}
                style={styles.nextArrow}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

/* ---- Comparison Card ---- */

interface ComparisonCardProps {
  option: Option;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ option }) => {
  const baseUrl = 'https://www.relationapp.io';
  const imageUri = option.url.startsWith('http')
    ? option.url
    : `${baseUrl}${option.url}`;

  return (
    <View style={styles.compCard}>
      <Text style={styles.compHint}>{option.hint}</Text>

      {/* Image area */}
      <LinearGradient
        colors={['#FFF4F4', '#FFFFFF']}
        style={styles.compImageBg}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.compImage}
          resizeMode="contain"
        />
      </LinearGradient>

      {/* Title / stats */}
      {option.type === 'detail' ? (
        <View>
          <View style={styles.compTitleRow}>
            <Text style={styles.compTitleLarge}>{option.title}</Text>
            <Text style={styles.compSubtitle}>{option.subtitle}</Text>
          </View>
          <Text style={styles.compDesc}>{option.desc}</Text>
        </View>
      ) : (
        <Text style={styles.compSimpleTitle} numberOfLines={option.maxLines}>
          {option.title}
        </Text>
      )}
    </View>
  );
};

/* ---- Pie Chart (SVG) ---- */
// Kept for future use if remote images aren't available
const PieChart: React.FC<{ percentage: number; size?: number }> = ({
  percentage,
  size = 80,
}) => {
  const radius = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const angle = (percentage / 100) * 360;
  const rad = ((angle - 90) * Math.PI) / 180;
  const largeArc = angle > 180 ? 1 : 0;
  const endX = cx + radius * Math.cos(rad);
  const endY = cy + radius * Math.sin(rad);

  const d = `M${cx},${cy} L${cx},${
    cy - radius
  } A${radius},${radius} 0 ${largeArc},1 ${endX},${endY} Z`;

  return (
    <Svg width={size} height={size}>
      <SvgCircle cx={cx} cy={cy} r={radius} fill="#F0E0F0" />
      <Path d={d} fill="#6E1E6F" />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4,
  },
  headerLeft: {
    flex: 1,
    gap: 4,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 206, 206, 1)',
  },
  headerSubtitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#9E619B',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,231,231,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },
  questionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFA7B3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBadgeText: {
    fontWeight: '700',
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  questionTitle: {
    flex: 1,
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  mainCard: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 24,
    padding: 16,
    paddingTop: 20,
    paddingBottom: 48,
    gap: 24,
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  comparisonRow: {
    flexDirection: 'row',
    gap: 4,
  },
  // Comparison card
  compCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  compHint: {
    fontWeight: '700',
    fontSize: 14,
    color: '#9E619B',
  },
  compImageBg: {
    height: 146,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compImage: {
    width: '80%',
    height: '80%',
  },
  compTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  compTitleLarge: {
    fontWeight: '700',
    fontSize: 19,
    color: '#6E1E6F',
  },
  compSubtitle: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9E619B',
  },
  compDesc: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    color: '#6E1E6F',
    marginTop: 4,
  },
  compSimpleTitle: {
    fontWeight: '700',
    fontSize: 19,
    color: '#6E1E6F',
  },
  // Prompt
  promptRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  promptBar: {
    width: 8,
    alignSelf: 'stretch',
    borderRadius: 13,
  },
  promptText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  // Slider
  sliderContainer: {
    gap: 0,
  },
  sliderValueText: {
    position: 'absolute',
    top: 0,
    width: 40,
    fontWeight: '700',
    fontSize: 14,
    color: '#6E1E6F',
    textAlign: 'center',
    zIndex: 2,
  },
  sliderTrackOuter: {
    height: THUMB_SIZE + 24,
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  sliderTrack: {
    height: SLIDER_TRACK_HEIGHT,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  sliderFill: {
    position: 'absolute',
    left: 7,
    bottom: (SLIDER_TRACK_HEIGHT - 8) / 2,
    height: 8,
    borderRadius: 27,
    backgroundColor: '#6E1E6F',
  },
  sliderThumb: {
    position: 'absolute',
    bottom: (SLIDER_TRACK_HEIGHT - THUMB_SIZE) / 2,
    marginLeft: -THUMB_SIZE / 2,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#6E1E6F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  sliderThumbInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sliderEndRight: {
    alignItems: 'flex-end',
  },
  sliderEndNumber: {
    fontWeight: '700',
    fontSize: 14,
    color: '#6E1E6F',
  },
  sliderEndLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: '#9E619B',
  },
  // Bottom bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  bottomBarInner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 61,
    padding: 12,
    gap: 8,
  },
  prevButtonWrap: {
    flex: 1,
  },
  prevButton: {
    height: 44,
    borderRadius: 33,
    backgroundColor: 'rgba(255,214,212,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevArrow: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 6,
  },
  nextButtonWrap: {
    flex: 1,
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButton: {
    height: 44,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextArrow: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 6,
  },
  navButtonText: {
    fontWeight: '700',
    fontSize: 17,
    color: '#6E1E6F',
  },
});

export default ExerciseQuestionScreen;
