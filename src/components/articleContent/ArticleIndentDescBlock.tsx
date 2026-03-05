import React from 'react';
import {View, Text, Linking, StyleSheet} from 'react-native';
import {IndentDescContent} from '../../types/ReadingMaterialItem';
import RichText from './RichText';

interface ArticleIndentDescBlockProps {
  indentDescContent: IndentDescContent[];
  expandButtonText?: string;
}

const INDENT_UNIT = 20;

const ArticleIndentDescBlock: React.FC<ArticleIndentDescBlockProps> = ({
  indentDescContent,
}) => {
  return (
    <View style={styles.container}>
      {indentDescContent.map((item, index) => {
        const level = parseInt(item.indentLevel, 10) || 0;
        const marginLeft = level * INDENT_UNIT;
        const isLink = item.link != null || item.isAutoLink;

        const handlePress = () => {
          if (item.link) {
            Linking.openURL(item.link);
          } else if (item.isAutoLink) {
            Linking.openURL(item.desc);
          }
        };

        return (
          <View key={index} style={[styles.row, {marginLeft}]}>
            {item.indentMarker.length > 0 && (
              <Text style={styles.marker}>{item.indentMarker}</Text>
            )}
            <RichText
              style={[styles.desc, isLink ? styles.link : undefined]}
              onPress={isLink ? handlePress : undefined}>
              {item.desc}
            </RichText>
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
    color: '#9E619B',
    textDecorationLine: 'underline',
  },
});

export default ArticleIndentDescBlock;
