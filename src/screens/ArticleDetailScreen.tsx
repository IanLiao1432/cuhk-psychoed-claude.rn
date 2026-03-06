import React, {useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ReadingMaterialContent} from '../types/ReadingMaterialItem';
import {readingMaterialsService} from '../services/readingMaterialsService';
import BackIcon from '../components/icons/BackIcon';
import ArticleTextBlock from '../components/articleContent/ArticleTextBlock';
import ArticleTable1Block from '../components/articleContent/ArticleTable1Block';
import ArticleImageBlock from '../components/articleContent/ArticleImageBlock';
import ArticleDescBlock from '../components/articleContent/ArticleDescBlock';
import ArticleIndentDescBlock from '../components/articleContent/ArticleIndentDescBlock';
import ArticleTable2Block from '../components/articleContent/ArticleTable2Block';
import ArticleTable3Block from '../components/articleContent/ArticleTable3Block';
import ArticleCarouselBlock from '../components/articleContent/ArticleCarouselBlock';
import ArticleTable4Block from '../components/articleContent/ArticleTable4Block';

type ArticleDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

const renderContentBlock = (block: ReadingMaterialContent, index: number) => {
  switch (block.type) {
    case 'text':
      return (
        <ArticleTextBlock
          key={index}
          title={block.title}
          desc={block.desc}
          linkTexts={block.linkTexts}
          isAutoLink={block.isAutoLink}
        />
      );
    case 'desc':
      return (
        <ArticleDescBlock
          key={index}
          desc={block.desc}
          linkTexts={block.linkTexts}
          link={block.link}
          isAutoLink={block.isAutoLink}
        />
      );
    case 'indentDesc':
      return (
        <ArticleIndentDescBlock
          key={index}
          indentDescContent={block.indentDescContent}
          expandButtonText={block.expandButtonText}
        />
      );
    case 'table1':
      return (
        <ArticleTable1Block
          key={index}
          table1Style={block.table1Style}
          header={block.header}
          title={block.title}
          content={block.content}
        />
      );
    case 'table2':
      return (
        <ArticleTable2Block
          key={index}
          content={block.content}
        />
      );
    case 'table3':
      return (
        <ArticleTable3Block
          key={index}
          title={block.title}
          content={block.content}
        />
      );
    case 'image':
      return (
        <ArticleImageBlock
          key={index}
          imageUrl={block.imageUrl}
          imageTitle={block.imageTitle}
          aspectRatio={block.aspectRatio}
          isShowMagnifying={block.isShowMagnifying}
          isFullWidth={block.isFullWidth}
          isNoPadding={block.isNoPadding}
          isPlaceCenter={block.isPlaceCenter}
          imageWidthRatio={block.imageWidthRatio}
        />
      );
    case 'carousel':
      return (
        <ArticleCarouselBlock
          key={index}
          content={block.content}
        />
      );
    case 'table4':
      return (
        <ArticleTable4Block
          key={index}
          content={block.content}
        />
      );
    default: {
      const unhandled = block as {type: string};
      return (
        <View key={index} style={styles.debugBlock}>
          <Text style={styles.debugType}>[{unhandled.type}]</Text>
          <Text style={styles.debugJson}>
            {JSON.stringify(block, null, 2)}
          </Text>
        </View>
      );
    }
  }
};

const REFERENCE_TITLE = '參考資料：';

const ArticleDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ArticleDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const {article} = route.params;

  const hasMarkedRead = useRef(false);
  const referenceY = useRef<number | null>(null);
  const scrollViewHeight = useRef(0);

  // Find the index of the reference block
  const referenceIndex = article.content.findIndex(
    block => block.type === 'text' && block.title === REFERENCE_TITLE,
  );

  // Fire ENGAGED on mount
  useEffect(() => {
    readingMaterialsService
      .upsert({step: article.step, status: 'ENGAGED'})
      .catch(err => console.error('Failed to mark ENGAGED:', err));
  }, [article.step]);

  const handleReferenceLayout = useCallback((e: LayoutChangeEvent) => {
    referenceY.current = e.nativeEvent.layout.y;
  }, []);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (hasMarkedRead.current || referenceY.current === null) {
        return;
      }
      const {contentOffset, layoutMeasurement} = e.nativeEvent;
      const bottomEdge = contentOffset.y + layoutMeasurement.height;
      if (bottomEdge >= referenceY.current) {
        hasMarkedRead.current = true;
        readingMaterialsService
          .upsert({step: article.step, status: 'READ'})
          .catch(err => console.error('Failed to mark READ:', err));
      }
    },
    [article.step],
  );

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
        <Text style={styles.headerTitle} numberOfLines={1}>
          {article.title}
        </Text>
        <View style={{width: 32}} />
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {paddingBottom: Math.max(insets.bottom, 20)},
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={referenceIndex >= 0 ? handleScroll : undefined}
        scrollEventThrottle={referenceIndex >= 0 ? 200 : undefined}>
        {article.content.map((block, index) => (
          <View
            key={index}
            onLayout={index === referenceIndex ? handleReferenceLayout : undefined}>
            {renderContentBlock(block, index)}
          </View>
        ))}
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
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  debugBlock: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 12,
    padding: 12,
  },
  debugType: {
    fontWeight: '700',
    fontSize: 14,
    color: '#6E1E6F',
    marginBottom: 4,
  },
  debugJson: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#333',
  },
});

export default ArticleDetailScreen;
