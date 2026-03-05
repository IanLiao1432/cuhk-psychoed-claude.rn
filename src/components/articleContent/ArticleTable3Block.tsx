import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {TableRowImage, IndentDescContent} from '../../types/ReadingMaterialItem';
import {GOOGLE_CLOUD_STORAGE_BUCKET} from '@env';
import StyledText from 'react-native-styled-text';

interface ArticleTable3BlockProps {
  title: string;
  content: (string | TableRowImage | IndentDescContent)[];
}

const isTableRowImage = (
  item: string | TableRowImage | IndentDescContent,
): item is TableRowImage => {
  return typeof item === 'object' && 'imageUrl' in item;
};

const isIndentDescContent = (
  item: string | TableRowImage | IndentDescContent,
): item is IndentDescContent => {
  return typeof item === 'object' && 'desc' in item;
};

const warmTextStyles = StyleSheet.create({
  Warm: {color: '#E97132'},
});

const ArticleTable3Block: React.FC<ArticleTable3BlockProps> = ({
  title,
  content,
}) => {
  return (
    <View style={styles.container}>
      {/* Title row */}
      <View style={styles.titleRow}>
        <StyledText style={styles.titleText} textStyles={warmTextStyles}>
          {title}
        </StyledText>
      </View>

      {/* Content row */}
      <View style={styles.contentRow}>
        {content.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <StyledText key={index} style={styles.contentText} textStyles={warmTextStyles}>
                {item}
              </StyledText>
            );
          }

          if (isTableRowImage(item)) {
            const uri = `${GOOGLE_CLOUD_STORAGE_BUCKET}/${item.imageUrl}`;
            return (
              <Image
                key={index}
                source={{uri}}
                style={[
                  styles.image,
                  item.aspectRatio != null && {aspectRatio: item.aspectRatio},
                ]}
                resizeMode="contain"
              />
            );
          }

          if (isIndentDescContent(item)) {
            const level = parseInt(item.indentLevel, 10) || 0;
            return (
              <View
                key={index}
                style={[styles.indentRow, {marginLeft: level * 12}]}>
                {item.indentMarker.length > 0 && (
                  <StyledText style={styles.indentMarker}>
                    {item.indentMarker}
                  </StyledText>
                )}
                <StyledText style={styles.contentText} textStyles={warmTextStyles}>
                  {item.desc}
                </StyledText>
              </View>
            );
          }

          return null;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFDBDF',
  },
  titleRow: {
    backgroundColor: '#FFF5F5',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBDF',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  contentRow: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    gap: 10,
  },
  contentText: {
    flex: 1,
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  image: {
    width: '45.59%',
    borderRadius: 8,
  },
  indentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  indentMarker: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
    marginRight: 4,
  },
});

export default ArticleTable3Block;
