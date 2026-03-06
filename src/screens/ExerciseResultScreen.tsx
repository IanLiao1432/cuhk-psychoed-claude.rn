import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Polygon, Line } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SurgicalPreference } from '../services/questionnaireService';
import { useWording } from '../context/WordingContext';

const icInfoSmall = require('../assets/images/ic_info_small.png');
const icNextPale = require('../assets/images/ic_next_pale.png');
const ic6elements = require('../assets/images/ic_6elements.png');
const icVector1 = require('../assets/images/ic_vector1.png');

interface TriangleChartProps {
  surgicalPreference: SurgicalPreference;
}

const TriangleChart: React.FC<TriangleChartProps> = ({ surgicalPreference }) => {
  const { breastConservingSurgery, mastectomyAndBreastReconstruction, mastectomy } = surgicalPreference;

  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const r = 80;

  // Triangle vertices: top, bottom-right, bottom-left
  const topX = cx;
  const topY = cy - r;
  const brX = cx + r * Math.cos(Math.PI / 6);
  const brY = cy + r * Math.sin(Math.PI / 6);
  const blX = cx - r * Math.cos(Math.PI / 6);
  const blY = cy + r * Math.sin(Math.PI / 6);

  // Data points scaled by percentage
  const scale = 0.8;
  const topPct = mastectomyAndBreastReconstruction.percentage / 100;
  const brPct = breastConservingSurgery.percentage / 100;
  const blPct = mastectomy.percentage / 100;

  const dataTopX = cx + (topX - cx) * topPct * scale;
  const dataTopY = cy + (topY - cy) * topPct * scale;
  const dataBrX = cx + (brX - cx) * brPct * scale;
  const dataBrY = cy + (brY - cy) * brPct * scale;
  const dataBlX = cx + (blX - cx) * blPct * scale;
  const dataBlY = cy + (blY - cy) * blPct * scale;

  // Grid lines (3 levels)
  const levels = [0.33, 0.66, 1];

  return (
    <View style={chartStyles.container}>
      {/* Labels */}
      <Text style={[chartStyles.label, chartStyles.labelTop]}>
        {mastectomyAndBreastReconstruction.percentage > 0
          ? '全乳房切除加乳房重建手術'
          : '全乳房切除加乳房重建手術'}
      </Text>
      <Text style={[chartStyles.label, chartStyles.labelBottomLeft]}>
        {'全乳房切除\n手術'}
      </Text>
      <Text style={[chartStyles.label, chartStyles.labelBottomRight]}>
        {'乳房保留\n手術'}
      </Text>

      <Svg width={size} height={size} style={chartStyles.svg}>
        {/* Grid triangles */}
        {levels.map((l, i) => (
          <Polygon
            key={i}
            points={`${cx + (topX - cx) * l},${cy + (topY - cy) * l} ${cx + (brX - cx) * l},${cy + (brY - cy) * l} ${cx + (blX - cx) * l},${cy + (blY - cy) * l}`}
            fill="none"
            stroke="rgba(255,206,206,0.5)"
            strokeWidth={1}
          />
        ))}
        {/* Axis lines */}
        <Line x1={cx} y1={cy} x2={topX} y2={topY} stroke="rgba(255,206,206,0.5)" strokeWidth={1} />
        <Line x1={cx} y1={cy} x2={brX} y2={brY} stroke="rgba(255,206,206,0.5)" strokeWidth={1} />
        <Line x1={cx} y1={cy} x2={blX} y2={blY} stroke="rgba(255,206,206,0.5)" strokeWidth={1} />
        {/* Data triangle */}
        <Polygon
          points={`${dataTopX},${dataTopY} ${dataBrX},${dataBrY} ${dataBlX},${dataBlY}`}
          fill="rgba(158,97,155,0.15)"
          stroke="#9E619B"
          strokeWidth={1.5}
        />
      </Svg>

      {/* Percentage badges */}
      <PercentBadge
        value={mastectomyAndBreastReconstruction.percentage}
        style={{ top: dataTopY - 2, left: dataTopX + 6 }}
      />
      <PercentBadge
        value={breastConservingSurgery.percentage}
        style={{ top: dataBrY - 2, left: dataBrX + 6 }}
      />
      <PercentBadge
        value={mastectomy.percentage}
        style={{ top: dataBlY + 6, right: size - dataBlX + 6 }}
      />
    </View>
  );
};

const PercentBadge: React.FC<{ value: number; style: object }> = ({ value, style }) => (
  <LinearGradient
    colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}
    style={[chartStyles.badge, style]}
  >
    <Text style={chartStyles.badgeText}>{value.toFixed(1)}%</Text>
  </LinearGradient>
);

const chartStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 16,
  },
  svg: {
    marginTop: 8,
  },
  label: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: '700',
    color: '#9E619B',
    textAlign: 'center',
  },
  labelTop: {
    top: 0,
    alignSelf: 'center',
  },
  labelBottomLeft: {
    bottom: 0,
    left: 0,
    width: 56,
  },
  labelBottomRight: {
    bottom: 0,
    right: 0,
    width: 56,
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: 'rgba(72,6,84,0.25)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6E1E6F',
    textAlign: 'center',
  },
});

function getBestMatch(pref: SurgicalPreference): string {
  const options = [
    { key: 'mastectomyAndBreastReconstruction', label: '全乳房切除加乳房重建手術', pct: pref.mastectomyAndBreastReconstruction.percentage },
    { key: 'breastConservingSurgery', label: '乳房保留手術', pct: pref.breastConservingSurgery.percentage },
    { key: 'mastectomy', label: '全乳房切除手術', pct: pref.mastectomy.percentage },
  ];
  options.sort((a, b) => b.pct - a.pct);
  return options[0].label;
}

const ExerciseResultScreen: React.FC = () => {
  const { t } = useWording();
  const insets = useSafeAreaInsets();
  const route = useRoute<RouteProp<RootStackParamList, 'ExerciseResult'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { surgicalPreference } = route.params;
  const bestMatch = getBestMatch(surgicalPreference);

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      {/* Background blob */}
      <Image source={icVector1} style={styles.bgBlob} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 24, paddingBottom: Math.max(insets.bottom, 20) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Result card */}
        <View style={styles.cardOuter}>
          <View style={styles.card}>
            {/* Gradient header bg */}
            <LinearGradient
              colors={[
                'rgba(192,220,255,0.5)',
                'rgba(242,175,255,0.5)',
                'rgba(255,171,168,0.5)',
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.cardHeaderBg}
            />

            {/* Top section: icon + title + best match */}
            <View style={styles.topSection}>
              <View style={styles.topContent}>
                {/* Icon */}
                <Image source={ic6elements} style={styles.resultIcon} />
                <Text style={styles.resultTitle}>
                  {t('exerciseResultTitle', '價值觀探索練習分折結果')}
                </Text>
              </View>

              {/* Best match */}
              <View style={styles.bestMatchSection}>
                <Text style={styles.bestMatchLabel}>
                  {t('exerciseResultBestMatchLabel', '根據您的個人偏好，最符合您的手術方案是：')}
                </Text>
                <LinearGradient
                  colors={['#FFEEF5', '#FFE8E8']}
                  style={styles.bestMatchCard}
                >
                  <Text style={styles.bestMatchText}>{bestMatch}</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Chart section */}
            <View style={styles.chartSection}>
              <LinearGradient
                colors={['#FFEEF5', '#FFE8E8']}
                style={styles.chartCard}
              >
                <Text style={styles.chartTitle}>
                  {t('exerciseResultChartTitle', '手術方案匹配機率')}
                </Text>
                <TriangleChart surgicalPreference={surgicalPreference} />
              </LinearGradient>

              {/* Disclaimer */}
              <View style={styles.disclaimerRow}>
                <Image source={icInfoSmall} style={styles.infoIcon} />
                <Text style={styles.disclaimerText}>
                  {t('exerciseResultDisclaimer', '分析結果僅供參考，請結合醫生意見綜合決策')}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.actionsSection}>
              {/* Back to home */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.popToTop()}
              >
                <LinearGradient
                  colors={['#FEEAEE', '#FFA7B3']}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.homeButton}
                >
                  <Text style={styles.homeButtonText}>
                    {t('exerciseResultHome', '返回主頁')}
                  </Text>
                  <Image
                    source={icNextPale}
                    style={styles.homeButtonArrow}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </TouchableOpacity>

              {/* Secondary buttons */}
              <View style={styles.secondaryRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.secondaryButton}
                  onPress={() => navigation.replace('ExerciseQuestion')}
                >
                  <Text style={styles.secondaryButtonText}>
                    {t('exerciseResultRestart', '重新開始')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>
                    {t('exerciseResultViewChoices', '查看我的選擇')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    transform: [{ rotate: '62.29deg' }],
    opacity: 0.15,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  cardOuter: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 16,
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  cardHeaderBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 186,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  topSection: {
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
  },
  topContent: {
    alignItems: 'center',
    gap: 17,
  },
  resultIcon: {
    width: 48,
    height: 48,
    shadowColor: 'rgba(72,6,84,0.25)',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E1E6F',
    lineHeight: 24,
    textAlign: 'center',
  },
  bestMatchSection: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  bestMatchLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6E1E6F',
    textAlign: 'center',
  },
  bestMatchCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    shadowColor: '#FFCECE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  bestMatchText: {
    flex: 1,
    fontSize: 19,
    fontWeight: '700',
    color: '#6E1E6F',
    lineHeight: 24,
  },
  chartSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  chartCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
    gap: 24,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6E1E6F',
    lineHeight: 24,
    textAlign: 'center',
  },
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoIcon: {
    width: 12,
    height: 12,
    marginTop: 2,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: '#9E619B',
  },
  actionsSection: {
    paddingHorizontal: 20,
    gap: 16,
  },
  homeButton: {
    height: 44,
    borderRadius: 33,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  homeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#6E1E6F',
    lineHeight: 24,
  },
  homeButtonArrow: {
    position: 'absolute',
    right: 5,
    width: 32,
    height: 32,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,214,212,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 33,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9E619B',
    lineHeight: 24,
  },
});

export default ExerciseResultScreen;
