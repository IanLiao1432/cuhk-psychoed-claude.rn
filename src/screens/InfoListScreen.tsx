import React, {useState, useCallback, useRef, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle, Rect, Line} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useWording} from '../context/WordingContext';
import {getReadingMaterialGroups} from '../assets/staticContent/readingMaterialGroups';
import {ReadingMaterialGroup, ReadingMaterialItem} from '../types/ReadingMaterialItem';
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

interface AnimatedSectionProps {
  section: ReadingMaterialGroup;
  isExpanded: boolean;
  onToggle: () => void;
  onArticlePress: (article: ReadingMaterialItem) => void;
  renderArticle: (article: ReadingMaterialItem, index: number, total: number) => React.ReactElement;
}

const ANIM_DURATION = 350;

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
      easing: isExpanded
        ? Easing.out(Easing.bezier(0.25, 0.46, 0.45, 0.94))
        : Easing.in(Easing.bezier(0.55, 0.06, 0.68, 0.19)),
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
    inputRange: [0, 0.3, 1],
    outputRange: [0, 0.2, 1],
  });

  const gapAnim = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });

  return (
    <Animated.View
      style={[
        styles.sectionCard,
        isExpanded && styles.sectionCardExpanded,
        shouldRender && {gap: gapAnim},
      ]}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onToggle}
        activeOpacity={0.7}>
        <View style={styles.sectionHeaderLeft}>
          <View style={styles.sectionNumber}>
            <Text style={styles.sectionNumberBold}>{section.sectionNumber}</Text>
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
          style={[styles.articlesList, {height, opacity: contentOpacity}]}>
          <View
            style={styles.articlesContainer}
            onLayout={e => {
              const h = e.nativeEvent.layout.height;
              if (h > 0 && h !== contentHeight) {
                setContentHeight(h);
              }
            }}>
            {section.items.map((item, idx) =>
              renderArticle(item, idx, section.items.length),
            )}
          </View>
        </Animated.View>
      )}
    </Animated.View>
  );
};

const InfoListScreen: React.FC = () => {
  const {t} = useWording();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const sections = useMemo(() => getReadingMaterialGroups(t as any), [t]);
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

  const handleArticlePress = useCallback((_item: ReadingMaterialItem) => {
    Alert.alert('Coming Soon');
  }, []);

  const renderArticle = (item: ReadingMaterialItem, index: number, total: number) => {
    const isLast = index === total - 1;
    return (
      <TouchableOpacity
        key={item.step}
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
