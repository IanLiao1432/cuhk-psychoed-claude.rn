import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LinkText} from '../../types/LinkText';

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
          <View style={styles.bullet} />
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
      {desc != null && desc.length > 0 && (
        <Text style={styles.desc}>{desc}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
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
    backgroundColor: '#6E1E6F',
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
    color: '#9E619B',
  },
});

export default ArticleTextBlock;
