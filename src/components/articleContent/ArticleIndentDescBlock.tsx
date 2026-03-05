import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import {IndentDescContent} from '../../types/ReadingMaterialItem';
import RichText from './RichText';

interface ArticleIndentDescBlockProps {
  indentDescContent: IndentDescContent[];
  expandButtonText?: string;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const INDENT_UNIT = 20;

const renderAutoLinkText = (desc: string) => {
  const parts = desc.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
      // Reset lastIndex since we reuse the regex
      URL_REGEX.lastIndex = 0;
      return (
        <Text
          key={i}
          style={styles.link}
          onPress={() => Linking.openURL(part)}>
          {part}
        </Text>
      );
    }
    return part;
  });
};

const ArticleIndentDescBlock: React.FC<ArticleIndentDescBlockProps> = ({
  indentDescContent,
}) => {
  return (
    <View style={styles.container}>
      {indentDescContent.map((item, index) => {
        const level = parseInt(item.indentLevel, 10) || 0;
        const marginLeft = level * INDENT_UNIT;
        const hasExplicitLink = item.link != null;

        return (
          <View key={index} style={[styles.row, {marginLeft}]}>
            {item.indentMarker.length > 0 && (
              <RichText style={styles.marker}>{item.indentMarker}</RichText>
            )}
            {hasExplicitLink ? (
              <RichText
                style={[styles.desc, styles.link]}
                onPress={() => Linking.openURL(item.link!)}>
                {item.desc}
              </RichText>
            ) : item.isAutoLink ? (
              <Text style={styles.desc}>
                {renderAutoLinkText(item.desc)}
              </Text>
            ) : (
              <RichText style={styles.desc}>{item.desc}</RichText>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  marker: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginRight: 4,
  },
  desc: {
    flex: 1,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  link: {
    color: '#6E1E6F',
    textDecorationLine: 'underline',
  },
});

export default ArticleIndentDescBlock;
