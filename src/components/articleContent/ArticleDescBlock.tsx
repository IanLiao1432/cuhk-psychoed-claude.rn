import React from 'react';
import {Text, Linking, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {LinkText} from '../../types/LinkText';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

interface ArticleDescBlockProps {
  desc?: string;
  linkTexts?: LinkText[];
  link?: string;
  isAutoLink?: boolean;
}

const ArticleDescBlock: React.FC<ArticleDescBlockProps> = ({
  desc,
  link,
  isAutoLink,
}) => {
  if (!desc || desc.length === 0) {
    return null;
  }

  const text = desc.replace(/<br\s*\/?>/gi, '\n');

  // Explicit link: entire block is clickable
  if (link) {
    return (
      <StyledText
        style={[styles.desc, styles.link]}
        onPress={() => Linking.openURL(link)}>
        {text}
      </StyledText>
    );
  }

  // Auto-link: detect URLs in text and make only those tappable
  if (isAutoLink) {
    const parts = text.split(URL_REGEX);
    return (
      <Text style={styles.desc}>
        {parts.map((part, index) =>
          URL_REGEX.test(part) ? (
            <Text
              key={index}
              style={styles.link}
              onPress={() => Linking.openURL(part)}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    );
  }

  // Plain text: not clickable
  return (
    <StyledText style={styles.desc}>
      {text}
    </StyledText>
  );
};

const styles = StyleSheet.create({
  desc: {
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

export default ArticleDescBlock;
