import React from 'react';
import {Text, ScrollView, StyleSheet, Linking, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useWording} from '../context/WordingContext';
import BottomSheet from './BottomSheet';

interface DisclaimerSheetProps {
  visible: boolean;
  onClose: () => void;
}

const DisclaimerSheet: React.FC<DisclaimerSheetProps> = ({visible, onClose}) => {
  const {t} = useWording();
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const sheetChrome = 56 + 50 + 20 + Math.max(insets.bottom, 20);
  const maxScrollHeight = height - insets.top - sheetChrome;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      title={t('disclaimerTitle', '免責聲明')}>
      <ScrollView
        style={{maxHeight: maxScrollHeight}}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <Text style={styles.body}>
          {t(
            'disclaimerBody1',
            '香港中文大學醫學院那打素護理學院(本院) 粉紅絲帶臨床決策輔助工具 (香港版) 流動應用程式內所載的資訊，只供一般參考及研究用途。網站提供由本院以及院外不同機構編製和維護的資訊，而所提供的對外網站連結只為方便使用者，並不表示本院認可有關網站的內容，本院亦不會對所連結的網站內容承擔任何責任。',
          )}
        </Text>
        <Text style={styles.body}>
          {t(
            'disclaimerBody2',
            '本院有權在無須預先通知的情況下，隨時修改、更新及刪除本網站內的任何資訊。本院會竭力保持網站資訊的及時更新及正確性，但對此並不作任何保證。對於與此程式所載任何資訊的準確性、完整性或及時性有關，或因使用、濫用或依據本網站內的任何資訊而引致的任何損失或損害，本院概不承擔任何法律責任、義務或任何责任。',
          )}
        </Text>
        <Text style={styles.body}>
          {t(
            'disclaimerBody3',
            '此程式及程式內所載的內容皆受本院所擁有的版權約束。若非預先得到本院的准許，不得以任何方式轉發或複製作任何商業用途。請注意，此准許只適用於由本院擁有版權的資料。如果涉及由第三者擁有版權的資料，則必須先取得版權擁有者的准許，方可使用或複製該等資料。',
          )}
        </Text>
        <Text style={styles.body}>
          {t(
            'disclaimerBody4',
            '當瀏覽此程式，即代表閣下無條件同意及接受本責任聲明的條款。本院可在無須預先通知的情況下，對此責任聲明作出修改。請定期瀏覽本網頁，查閱任何已作出的修改。',
          )}
        </Text>
        <Text style={styles.body}>
          {t('disclaimerContact', '如有任何查詢，請聯絡我們: ')}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('mailto:bctaid@cuhk.edu.hk')}>
            {'bctaid@cuhk.edu.hk'}
          </Text>
        </Text>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  body: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginBottom: 8,
  },
  link: {
    color: '#6E1E6F',
    textDecorationLine: 'underline',
  },
});

export default DisclaimerSheet;
