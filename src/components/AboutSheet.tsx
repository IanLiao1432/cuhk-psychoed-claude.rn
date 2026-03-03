import React from 'react';
import {Text, ScrollView, StyleSheet, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWording} from '../context/WordingContext';
import BottomSheet from './BottomSheet';

interface AboutSheetProps {
  visible: boolean;
  onClose: () => void;
}

const AboutSheet: React.FC<AboutSheetProps> = ({visible, onClose}) => {
  const {t} = useWording();
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // BottomSheet has 56px top padding + title ~50px + 20px bottom padding + safe area bottom
  const sheetChrome = 56 + 50 + 20 + Math.max(insets.bottom, 20);
  const maxScrollHeight = height - insets.top - sheetChrome;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('aboutUsTitle', '關於我們')}>
      <ScrollView
        style={{maxHeight: maxScrollHeight}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Text style={styles.sectionTitle}>
          {t('aboutProjectTitle', '關於本計劃')}
        </Text>
        <Text style={styles.body}>
          {t(
            'aboutProjectBody',
            '本計劃由香港中文大學那打素護理學院癌症及紓緩護理科研專題小組的研究團隊規劃，國家自然科學基金委員會與研究資助局全額資助（專案編號 N_CUHK460/23)。本研究旨在為患有乳癌的婦女構建一項多元模式臨床決策輔助工具。您會在六個月內接受四節多元模式臨床決策輔助工具。第一節將在癌症治療開始前進行。第二節將在手術後兩星期進行。第三節和最後一節分別在手術後三個月和六個月進行。決策輔助工具主要由兩個部分組成：（i） 實用資訊涵蓋乳癌主題、治療、常見副作用及其管理，以及術後護理，這將以文字、圖形、圖片和視頻的形式呈現，以及（ii）價值觀探索練習。\n\n我們希望這個輔助工具能夠提供足夠的資訊和支援，助您參與手術共享決策，提升治療後的生活質素。',
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t('aboutSchoolTitle', '關於本學院')}
        </Text>
        <Text style={styles.body}>
          {t(
            'aboutSchoolBody',
            '那打素護理學院是香港首個大學護理學系，自一九九一年成立至今，一直致力以卓越的教學及科研，積極與國內及海外業界同僚交流合作，以促進高質高效的癌症及紓緩護理實踐。癌症及紓緩護理科研專題小組的研究項目主要集中在提高癌症患者及其家屬的護理質量。小組成立以來已成功申請多個研究經費機構的研究基金，包括優配研究金和醫療衞生研究基金，並將研究成果廣泛地轉化為高質量的臨床實踐。',
          )}
        </Text>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: '700',
    fontSize: 19,
    lineHeight: 24,
    color: '#6E1E6F',
    marginBottom: 20,
  },
  body: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginBottom: 48,
  },
});

export default AboutSheet;
