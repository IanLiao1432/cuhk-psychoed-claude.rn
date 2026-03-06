import React, { useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useWording } from '../context/WordingContext';
import BackIcon from '../components/icons/BackIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
const ic6elements = require('../assets/images/ic_6elements.png');
const icInfoSmall = require('../assets/images/ic_info_small.png');
const icNextPale = require('../assets/images/ic_next_pale.png');

const InfoIcon = () => (
  <Image
    source={icInfoSmall}
    style={{ width: 12, height: 12 }}
    resizeMode="contain"
  />
);

const ExerciseIntroScreen: React.FC = () => {
  const { t } = useWording();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const handleWhatsApp = useCallback(() => {
    const phone = t('whatsappNumber', '85267386349');
    const message = encodeURIComponent(
      t(
        'whatsappMessage',
        '你好。我有一些有關使用應用程式時遇到的問題想查詢：',
      ),
    );
    Linking.openURL(`https://wa.me/${phone}?text=${message}`);
  }, [t]);

  const handleStart = useCallback(() => {
    navigation.navigate('ExerciseQuestion');
  }, [navigation]);

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <BackIcon size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t('exerciseTitle', '價值觀探索練習')}
        </Text>
        <TouchableOpacity
          onPress={handleWhatsApp}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View style={styles.whatsappCircle}>
            <WhatsAppIcon size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 20) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          {/* Top gradient overlay */}
          <LinearGradient
            colors={[
              'rgba(192, 220, 255, 0.5)',
              'rgba(242, 175, 255, 0.5)',
              'rgba(255, 171, 168, 0.0)',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.heroGradientOverlay}
          />

          {/* Upper section: icon, title, description */}
          <View style={styles.upperSection}>
            <LinearGradient
              colors={[
                'rgba(192, 220, 255, 0.5)',
                'rgba(242, 175, 255, 0.5)',
                'rgba(255, 171, 168, 0.5)',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.iconBg}
            >
              <Image
                source={ic6elements}
                style={styles.iconImage}
                resizeMode="contain"
              />
            </LinearGradient>

            <View style={styles.titleDescGroup}>
              <View style={styles.titleRow}>
                <LinearGradient
                  colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.titleBar}
                />
                <Text style={styles.titleText}>
                  {t('exerciseTitle', '價值觀探索練習')}
                </Text>
              </View>
              <Text style={styles.descText}>
                {t(
                  'exerciseDesc',
                  '請根據您的個人考量和偏好，以0-100的評分標準，評核以下每個因素對您選擇治療手術方案的重要程度（0表示完全不重要，100表示非常重要），您的意見有助了解您的價值觀，以實現共享決策。我們列出了手術方案對每一個因素最有可能產生的結果，供您參考。',
                )}
              </Text>
            </View>
          </View>

          {/* Lower section: button, info */}
          <View style={styles.lowerSection}>
            <TouchableOpacity onPress={handleStart} activeOpacity={0.7}>
              <LinearGradient
                colors={['#FEEAEE', '#FFA7B3']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.startButton}
              >
                <Text style={styles.startButtonText}>
                  {t('exerciseStart', '開始探索練習')}
                </Text>
                <Image
                  source={icNextPale}
                  style={{
                    width: 32,
                    height: 32,
                    position: 'absolute',
                    right: 6,
                    // top: 6,
                    bottom: 6,
                  }}
                  resizeMode="contain"
                />
              </LinearGradient>
            </TouchableOpacity>

            <LinearGradient
              colors={['#FFEEF5', '#FFE8E8']}
              style={[styles.infoCard, styles.infoCardGradient]}
            >
              <View style={{ padding: 20 }}>
                <View style={styles.infoHeader}>
                  <InfoIcon />
                  <Text style={styles.infoTitle}>
                    {t('exerciseInfoTitle', '簡介')}
                  </Text>
                </View>
                <View style={styles.infoBody}>
                  <Text style={styles.infoText}>
                    {t(
                      'exerciseInfoBody1',
                      '研究團隊早前邀請了大約200 名已完成乳癌治療的婦女參加離散選擇實驗調查, 確認了這項包含了六個最重要影響治療決策因素的價值澄清練習。',
                    )}
                  </Text>
                  <Text style={styles.infoText}>
                    {t(
                      'exerciseInfoBody2',
                      '我們希望了解您在決定癌症手術方案（舉例：全乳房切除, 全乳房切除加乳房重建手術, 乳房保留手術）時，這六項因素影響您對治療決策的重要程度。',
                    )}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
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
    paddingBottom: 2,
    gap: 12,
  },
  headerTitle: {
    flex: 1,
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
  },
  whatsappCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#25D366',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  heroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 24,
    overflow: 'hidden',
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
  },
  heroGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 186,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  upperSection: {
    paddingHorizontal: 20,
    gap: 20,
  },
  iconBg: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  iconImage: {
    width: 60,
    height: 60,
  },
  titleDescGroup: {
    gap: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  titleBar: {
    width: 8,
    alignSelf: 'stretch',
    borderRadius: 13,
  },
  titleText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  descText: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  lowerSection: {
    paddingHorizontal: 20,
    gap: 24,
  },
  startButton: {
    height: 44,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  startArrow: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  infoCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
  },
  infoCardGradient: {
    padding: 0,
    gap: 12,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoTitle: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 24,
    color: '#9E619B',
  },
  infoBody: {
    gap: 8,
  },
  infoText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22,
    color: '#9E619B',
  },
});

export default ExerciseIntroScreen;
