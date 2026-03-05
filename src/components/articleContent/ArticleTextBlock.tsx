import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LinkText} from '../../types/LinkText';
import RichText from './RichText';

interface ArticleTextBlockProps {
  title?: string;
  desc?: string;
  linkTexts?: LinkText[];
  isAutoLink?: boolean;
}

const ArticleTextBlock: React.FC<ArticleTextBlockProps> = ({title, desc}) => {
  return (
    <View style={styles.container}>
      {title != null && title.length > 0 && (
        <View style={styles.titleRow}>
          <View style={styles.titleBarWrap}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#C0DCFF', '#F2AFFF', '#FFABA8']}
              style={StyleSheet.absoluteFill}
            />
          </View>
          <RichText style={styles.title}>{title}</RichText>
        </View>
      )}
      {desc != null && desc.length > 0 && (
        <RichText style={styles.desc}>{desc}</RichText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  titleBarWrap: {
    width: 8,
    alignSelf: 'stretch',
    borderRadius: 13,
    overflow: 'hidden',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    fontWeight: '700',
    fontSize: 20,
    color: '#6E1E6F',
  },
  desc: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 28,
    color: '#6E1E6F',
  },
});

export default ArticleTextBlock;
