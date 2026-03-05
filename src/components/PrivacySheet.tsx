import React from 'react';
import {Text, ScrollView, StyleSheet, Linking, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWording} from '../context/WordingContext';
import BottomSheet from './BottomSheet';

interface PrivacySheetProps {
  visible: boolean;
  onClose: () => void;
}

const PrivacySheet: React.FC<PrivacySheetProps> = ({visible, onClose}) => {
  const {t} = useWording();
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const sheetChrome = 56 + 50 + 20 + Math.max(insets.bottom, 20);
  const maxScrollHeight = height - insets.top - sheetChrome;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('privacyTitle', '個人資料聲明')}>
      <ScrollView
        style={{maxHeight: maxScrollHeight}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Text style={styles.sectionTitle}>
          {t('privacyCollectionTitle', '收集個人資料聲明')}
        </Text>
        <Text style={styles.body}>
          {t(
            'privacyCollectionBody',
            '香港中文大學醫學院那打素護理學院（本院）會記錄到訪流動應用程式者的應用程式內活動，此等資料僅供本院作統計之用。',
          )}
        </Text>

        <Text style={styles.sectionTitle}>
          {t('privacyPolicyTitle', '個人資料政策')}
        </Text>
        <Text style={styles.body}>
          {t(
            'privacyPolicyBody1',
            '本院作為資料使用者，認同保護個人資料的重要性，必盡力遵守《個人資料（私隱）條例》以及大學的保障個人資料（私隱）政策中所列載的規定(',
          )}
          <Text
            style={styles.link}
            onPress={() =>
              Linking.openURL('http://www.cuhk.edu.hk/policy/pdo/en/')
            }>
            {'http://www.cuhk.edu.hk/policy/pdo/en/'}
          </Text>
          {t('privacyPolicyBody1b', ')，確保：')}
        </Text>

        <Text style={styles.bulletBody}>
          {t(
            'privacyBullet1',
            '\u2022  以合法和公平的方法收集個人資料；',
          )}
        </Text>
        <Text style={styles.bulletBody}>
          {t(
            'privacyBullet2',
            '\u2022  清楚告知資料當事人有關收集個人資料的目的；及',
          )}
        </Text>
        <Text style={styles.bulletBody}>
          {t(
            'privacyBullet3',
            '\u2022  所收集的個人資料準確無誤、保持安全及保密、妥善儲存以防止未經授權的存取，並依照收集資料時所說明的目的使用該等資料，以及保存個人資料的時間不超過達致有關目的實際所需時間。',
          )}
        </Text>

        <Text style={styles.body}>
          {t(
            'privacyPolicyBody2',
            '本院要求所有職員處理可供辨認的個人資料時，必須提高警惕，確切遵守有關個人資料（私隱）的法例和大學指引，並採取有效的保安措施，確保個人及敏感資料受到保障，當中包括研究參與者的資料。',
          )}
        </Text>

        <Text style={styles.body}>
          {t(
            'privacyPolicyBody3',
            '如果閣下要查閲或更改任何提供給本院的個人資料，或不欲收到本院的推廣資訊，請以書面方式電郵至: ',
          )}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:bctaid@cuhk.edu.hk')}>
            {'bctaid@cuhk.edu.hk'}
          </Text>
        </Text>

        <Text style={styles.body}>
          {t(
            'privacyPolicyBody4',
            '當瀏覽此應用程式，即代表閣下無條件同意及接受本私隱政策聲明。本院可在無須預先通知的情況下，對此私隱政策聲明作出修改。請定期瀏覽此程式，查閱任何已作出的修改。',
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
    marginBottom: 8,
  },
  bulletBody: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginBottom: 8,
    paddingLeft: 8,
  },
  link: {
    color: '#6E1E6F',
    textDecorationLine: 'underline',
  },
});

export default PrivacySheet;
