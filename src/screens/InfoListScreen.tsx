import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AppNavigator';
import {useWording} from '../context/WordingContext';
import {getReadingMaterialGroups} from '../assets/staticContent/readingMaterialGroups';
import {ReadingMaterialGroup, ReadingMaterialItem} from '../types/ReadingMaterialItem';
import {
  readingMaterialsService,
  ReadingMaterialResponse,
} from '../services/readingMaterialsService';
import BackIcon from '../components/icons/BackIcon';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';

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

const LastReadTag = () => (
  <View style={styles.lastReadTagRow}>
    <View style={styles.lastReadTag}>
      <LinearGradient
        colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.lastReadTagText}>上一次閱讀</Text>
    </View>
  </View>
);

interface AnimatedSectionProps {
  section: ReadingMaterialGroup;
  isExpanded: boolean;
  onToggle: () => void;
  onArticlePress: (article: ReadingMaterialItem) => void;
  renderArticle: (article: ReadingMaterialItem, index: number, total: number) => React.ReactElement;
}

const ANIM_DURATION = 300;

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  section,
  isExpanded,
  onToggle,
  renderArticle,
}) => {
  const animValue = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const [shouldRender, setShouldRender] = useState(isExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isExpanded) {
      setShouldRender(true);
    }

    Animated.timing(animValue, {
      toValue: isExpanded ? 1 : 0,
      duration: ANIM_DURATION,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start(() => {
      if (!isExpanded) {
        setShouldRender(false);
      }
    });
  }, [isExpanded, animValue]);

  const height = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight || 1],
  });

  const contentOpacity = animValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.6, 1],
  });

  const gapAnim = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });

  const cardBgColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 214, 212, 0.5)', 'rgba(255, 255, 255, 0.4)'],
  });

  const shadowOpacity = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.sectionCard,
        {
          backgroundColor: cardBgColor,
          shadowOpacity,
        },
        shouldRender && { gap: gapAnim },
      ]}
    >
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberBold}>
              {section.sectionNumber}
            </Text>
            <Text style={styles.sectionNumberSlash}>/</Text>
          </View>
          <View style={styles.sectionTitleGroup}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionSubtitle}>{section.description}</Text>
          </View>
        </View>
        <CollapseIcon expanded={isExpanded} />
      </TouchableOpacity>

      {shouldRender && (
        <Animated.View
          style={[styles.articlesList, { height, opacity: contentOpacity }]}
        >
          <View
            onLayout={e => {
              const h = e.nativeEvent.layout.height;
              if (h > 0 && h !== contentHeight) {
                setContentHeight(h);
              }
            }}
          >
            <View style={styles.articlesContainer}>
              {section.items.map((item, idx) =>
                renderArticle(item, idx, section.items.length),
              )}
            </View>
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const InfoListScreen: React.FC = () => {
  const {t} = useWording();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();
  const sections = useMemo(() => getReadingMaterialGroups(t as any), [t]);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(
    new Set([1]),
  );
  const [readingMaterials, setReadingMaterials] = useState<ReadingMaterialResponse[]>([]);

  useFocusEffect(
    useCallback(() => {
      readingMaterialsService
        .list()
        .then(setReadingMaterials)
        .catch(err => console.error('Failed to fetch reading materials:', err));
    }, []),
  );

  const toggleSection = useCallback((sectionNumber: number) => {
    setExpandedSections(prev => {
      if (prev.has(sectionNumber)) {
        return new Set();
      }
      return new Set([sectionNumber]);
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

  const lastEngagedStep = useMemo(() => {
    const engaged = readingMaterials.filter(m => m.status === 'ENGAGED');
    if (engaged.length === 0) {
      return null;
    }
    engaged.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
    return engaged[0].step;
  }, [readingMaterials]);

  const handleArticlePress = useCallback((item: ReadingMaterialItem) => {
    navigation.navigate('ArticleDetail', {article: item});
  }, [navigation]);

  const renderArticle = (item: ReadingMaterialItem, index: number, total: number) => {
    const isLast = index === total - 1;
    const isLastEngaged = item.step === lastEngagedStep;
    return (
      <View key={item.step}>
        {isLastEngaged && <LastReadTag />}
        <TouchableOpacity
          style={[styles.articleRow, !isLast && styles.articleRowBorder]}
          onPress={() => handleArticlePress(item)}
          activeOpacity={0.7}>
          <View style={styles.articleContent}>
          <View style={styles.articleIconWrap}>
            <Image source={item.image} style={styles.articleIcon} resizeMode="contain" />
          </View>
          <View style={styles.articleTitleWrap}>
            <Text style={styles.articleTitle}>{item.title}</Text>
          </View>
          <View style={styles.articleArrowWrap}>
            <SmallArrow />
          </View>
        </View>
      </TouchableOpacity>
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
        {sections.map(section => (
          <AnimatedSection
            key={section.sectionNumber}
            section={section}
            isExpanded={expandedSections.has(section.sectionNumber)}
            onToggle={() => toggleSection(section.sectionNumber)}
            onArticlePress={handleArticlePress}
            renderArticle={renderArticle}
          />
        ))}
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
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 20,
    shadowColor: '#FFCECE',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 16,
    elevation: 8,
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
    overflow: 'hidden',
  },
  articlesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  lastReadTagRow: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 12,
  },
  lastReadTag: {
    overflow: 'hidden',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  lastReadTagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6E1E6F',
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
    width: 24,
  },
  articleIcon: {
    width: 24,
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
