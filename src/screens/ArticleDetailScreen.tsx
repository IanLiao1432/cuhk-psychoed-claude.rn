import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AppNavigator';
import {ReadingMaterialContent} from '../types/ReadingMaterialItem';
import BackIcon from '../components/icons/BackIcon';
import ArticleTextBlock from '../components/articleContent/ArticleTextBlock';
import ArticleTable1Block from '../components/articleContent/ArticleTable1Block';
import ArticleImageBlock from '../components/articleContent/ArticleImageBlock';
import ArticleDescBlock from '../components/articleContent/ArticleDescBlock';
import ArticleIndentDescBlock from '../components/articleContent/ArticleIndentDescBlock';
import ArticleTable2Block from '../components/articleContent/ArticleTable2Block';

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
    default:
      return (
        <View key={index} style={styles.debugBlock}>
          <Text style={styles.debugType}>[{block.type}]</Text>
          <Text style={styles.debugJson}>
            {JSON.stringify(block, null, 2)}
          </Text>
        </View>
      );
  }
};

const ArticleDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ArticleDetailRouteProp>();
  const insets = useSafeAreaInsets();
  const {article} = route.params;

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
        showsVerticalScrollIndicator={false}>
        {article.content.map(renderContentBlock)}
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
