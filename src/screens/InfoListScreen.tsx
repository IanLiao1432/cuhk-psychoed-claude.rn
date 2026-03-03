import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useWording} from '../context/WordingContext';
import BackIcon from '../components/icons/BackIcon';
import PassageIcon from '../components/icons/PassageIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

interface Article {
  title: string;
}

interface Section {
  number: number;
  title: string;
  subtitle: string;
  articles: Article[];
}

const SECTIONS: Section[] = [
  {
    number: 1,
    title: '治療前的決擇',
    subtitle: '手術前',
    articles: [
      {title: '乳癌的資訊'},
      {title: '常見的乳腺癌治療方法'},
      {title: '手術及常見副作用的管理'},
    ],
  },
  {
    number: 2,
    title: '迎接未來治療挑戰 (一)',
    subtitle: '術後兩週',
    articles: [
      {title: '藥物治療及常見副作用的管理'},
      {title: '放射治療和常見副作用的處理'},
      {title: '飲食、體重控制和運動'},
    ],
  },
  {
    number: 3,
    title: '迎接未來治療挑戰 (二)',
    subtitle: '術後三個月',
    articles: [
      {title: '荷爾蒙治療及常見副作用的管理'},
      {title: '性健康與身體形象'},
      {title: '睡眠和休息'},
      {title: '精神健康'},
    ],
  },
  {
    number: 4,
    title: '治療後的決擇',
    subtitle: '術後六個月',
    articles: [
      {title: '減輕復發風險'},
      {title: '癌症治療後的健康飲食和運動'},
      {title: '癌症治療以外的支援'},
    ],
  },
];

// Collapse/Expand icon (minus when expanded, plus when collapsed)
const CollapseIcon = ({expanded}: {expanded: boolean}) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Circle cx={16} cy={16} r={15.5} fill="#FFE7E7" fillOpacity={0.75} stroke="rgba(255,255,255,0.5)" />
    <Rect x={8} y={14} width={16} height={4} rx={2} fill="#FFA7B3" />
    {!expanded && (
      <Rect x={14} y={8} width={4} height={16} rx={2} fill="#FFA7B3" />
    )}
  </Svg>
);

// Small arrow for article rows
const SmallArrow = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Line
      x1={4}
      y1={2}
      x2={8}
      y2={6}
      stroke="#FFA7B3"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Line
      x1={8}
      y1={6}
      x2={4}
      y2={10}
      stroke="#FFA7B3"
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const InfoListScreen: React.FC = () => {
  const {t} = useWording();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([1]),
  );

  const toggleSection = useCallback((sectionNumber: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionNumber)) {
        next.delete(sectionNumber);
      } else {
        next.add(sectionNumber);
      }
      return next;
    });
  }, []);

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

  const handleArticlePress = useCallback((_article: Article) => {
    Alert.alert('Coming Soon');
  }, []);

  const renderArticle = (article: Article, index: number, total: number) => {
    const isLast = index === total - 1;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.articleRow, !isLast && styles.articleRowBorder]}
        onPress={() => handleArticlePress(article)}
        activeOpacity={0.7}>
        <View style={styles.articleContent}>
          <View style={styles.articleIconWrap}>
            <PassageIcon size={24} />
          </View>
          <View style={styles.articleTitleWrap}>
            <Text style={styles.articleTitle}>{article.title}</Text>
          </View>
          <View style={styles.articleArrowWrap}>
            <SmallArrow />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = (section: Section) => {
    const isExpanded = expandedSections.has(section.number);
    return (
      <View
        key={section.number}
        style={[styles.sectionCard, isExpanded && styles.sectionCardExpanded]}>
        {/* Section header */}
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(section.number)}
          activeOpacity={0.7}>
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.sectionNumber}>
              <Text style={styles.sectionNumberBold}>{section.number}</Text>
              <Text style={styles.sectionNumberSlash}>/</Text>
            </View>
            <View style={styles.sectionTitleGroup}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
            </View>
          </View>
          <CollapseIcon expanded={isExpanded} />
        </TouchableOpacity>

        {/* Articles list */}
        {isExpanded && (
          <View style={styles.articlesList}>
            <View style={styles.articlesContainer}>
              {section.articles.map((article, idx) =>
                renderArticle(article, idx, section.articles.length),
              )}
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#FFEEF5', '#FFE8E8']} style={styles.container}>
      {/* Header */}
      <View style={[styles.header, {paddingTop: insets.top}]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <BackIcon size={32} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t('homeMenuInfo', '實用資訊')}
        </Text>
        <TouchableOpacity
          onPress={handleWhatsApp}
          activeOpacity={0.7}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <View style={styles.whatsappCircle}>
            <WhatsAppIcon size={16} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: Math.max(insets.bottom, 20)},
        ]}
        showsVerticalScrollIndicator={false}>
        {SECTIONS.map(renderSection)}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 2,
    gap: 12,
    height: undefined,
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

  // Content
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 16,
  },

  // Section card
  sectionCard: {
    backgroundColor: 'rgba(255, 214, 212, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionCardExpanded: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#FFCECE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 8,
    gap: 12,
  },

  // Section header
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  sectionNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  sectionNumberBold: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFA7B3',
    opacity: 0.75,
  },
  sectionNumberSlash: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 24,
    color: '#FFA7B3',
    opacity: 0.75,
  },
  sectionTitleGroup: {
    flex: 1,
    gap: 12,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 23,
    color: '#6E1E6F',
  },
  sectionSubtitle: {
    fontWeight: '400',
    fontSize: 14,
    color: '#9E619B',
  },

  // Articles
  articlesList: {
    // wrapper
  },
  articlesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  articleRow: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  articleRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 231, 231, 0.75)',
  },
  articleContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  articleIconWrap: {
    height: 24,
  },
  articleTitleWrap: {
    flex: 1,
    paddingVertical: 0,
  },
  articleTitle: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  articleArrowWrap: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

export default InfoListScreen;
