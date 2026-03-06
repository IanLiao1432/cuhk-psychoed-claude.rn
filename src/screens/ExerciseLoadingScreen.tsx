import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWording } from '../context/WordingContext';
import {
  questionnaireService,
  QuestionnaireUpsert,
} from '../services/questionnaireService';

const ANSWER_KEYS: (keyof QuestionnaireUpsert)[] = [
  'survivalRate',
  'sideEffect',
  'recoveryTime',
  'expense',
  'radiotherapy',
  'breastAppearance1',
  'breastAppearance2',
];

const ExerciseLoadingScreen: React.FC = () => {
  const { t } = useWording();
  const route = useRoute<RouteProp<RootStackParamList, 'ExerciseLoading'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const pulseAnim = useRef(new Animated.Value(0.6)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const hasSubmitted = useRef(false);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [pulseAnim, scaleAnim]);

  useEffect(() => {
    if (hasSubmitted.current) {
      return;
    }
    hasSubmitted.current = true;

    const body = ANSWER_KEYS.reduce((acc, key, i) => {
      acc[key] = route.params.answers[i];
      return acc;
    }, {} as QuestionnaireUpsert);

    questionnaireService
      .upsert(body)
      .then(response => {
        navigation.replace('ExerciseResult', {
          surgicalPreference: response.surgicalPreference,
        });
      })
      .catch(err => {
        console.error('Questionnaire upsert failed:', err);
        navigation.goBack();
      });
  }, [route.params.answers, navigation]);

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      {/* Background decoration blob */}
      <Image
        source={require('../assets/images/ic_vector1.png')}
        style={styles.bgBlob}
      />

      <View style={styles.center}>
        {/* Glow background + Icon */}
        <Animated.View
          style={[
            styles.glow,
            { opacity: pulseAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Image
            source={require('../assets/images/ic_grad_blur_rotate.png')}
            style={styles.glowImage}
          />
          <Image
            source={require('../assets/images/ic_6elements.png')}
            style={styles.icon}
          />
        </Animated.View>

        {/* Text */}
        <Text style={styles.loadingText}>
          {t('exerciseLoading', '價值觀探索結果分析中...')}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  bgBlob: {
    position: 'absolute',
    width: 345,
    height: 312,
    right: -60,
    top: -80,
    transform: [{ rotate: '58.62deg' }],
    opacity: 0.15,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glow: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glowImage: {
    position: 'absolute',
    width: 192,
    height: 192,
  },
  icon: {
    width: 72,
    height: 72,
  },
  loadingText: {
    marginTop: 24,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#9E619B',
  },
});

export default ExerciseLoadingScreen;
