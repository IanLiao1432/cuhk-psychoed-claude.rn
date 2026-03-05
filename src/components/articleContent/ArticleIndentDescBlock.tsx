import React, {useState, useCallback} from 'react';
import {View, Text, Linking, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {IndentDescContent} from '../../types/ReadingMaterialItem';
import StyledText from 'react-native-styled-text';

interface ArticleIndentDescBlockProps {
  indentDescContent: IndentDescContent[];
  expandButtonText?: string;
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

const INDENT_UNIT = 20;
const COLLAPSED_HEIGHT = 160;

const renderAutoLinkText = (desc: string) => {
  const parts = desc.split(URL_REGEX);
  return parts.map((part, i) => {
    if (URL_REGEX.test(part)) {
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
  expandButtonText,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);

  const canCollapse = expandButtonText != null && expandButtonText.length > 0;
  const shouldClip = canCollapse && !expanded && contentHeight > COLLAPSED_HEIGHT;

  const handleLayout = useCallback(
    (e: {nativeEvent: {layout: {height: number}}}) => {
      if (contentHeight === 0) {
        setContentHeight(e.nativeEvent.layout.height);
      }
    },
    [contentHeight],
  );

  const content = (
    <View style={styles.container} onLayout={canCollapse ? handleLayout : undefined}>
      {indentDescContent.map((item, index) => {
        const level = parseInt(item.indentLevel, 10) || 0;
        const marginLeft = level * INDENT_UNIT;
        const hasExplicitLink = item.link != null;

        return (
          <View key={index} style={[styles.row, {marginLeft}]}>
            {item.indentMarker.length > 0 && (
              <StyledText style={styles.marker}>{item.indentMarker}</StyledText>
            )}
            {hasExplicitLink ? (
              <StyledText
                style={[styles.desc, styles.link]}
                onPress={() => Linking.openURL(item.link!)}>
                {item.desc}
              </StyledText>
            ) : item.isAutoLink ? (
              <Text style={styles.desc}>
                {renderAutoLinkText(item.desc)}
              </Text>
            ) : (
              <StyledText style={styles.desc}>{item.desc}</StyledText>
            )}
          </View>
        );
      })}
    </View>
  );

  if (!canCollapse || contentHeight <= COLLAPSED_HEIGHT) {
    return content;
  }

  return (
    <View>
      <View style={shouldClip ? styles.clippedWrapper : undefined}>
        {content}
        {shouldClip && (
          <LinearGradient
            colors={['rgba(255,232,232,0)', 'rgba(255,232,232,1)']}
            style={styles.fadeOverlay}
            pointerEvents="none"
          />
        )}
      </View>
      {!expanded && (
        <TouchableOpacity
          style={styles.expandButton}
          activeOpacity={0.7}
          onPress={() => setExpanded(true)}>
          <Text style={styles.expandText}>{expandButtonText}</Text>
        </TouchableOpacity>
      )}
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
  clippedWrapper: {
    height: COLLAPSED_HEIGHT,
    overflow: 'hidden',
  },
  fadeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  expandButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: 'rgba(255,220,220,0.5)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  expandText: {
    fontWeight: '500',
    fontSize: 17,
    color: '#9E619B',
  },
});

export default ArticleIndentDescBlock;
