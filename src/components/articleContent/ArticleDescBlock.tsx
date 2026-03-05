import React from 'react';
import {Linking, StyleSheet} from 'react-native';
import StyledText from 'react-native-styled-text';
import {LinkText} from '../../types/LinkText';

interface ArticleDescBlockProps {
  desc?: string;
  linkTexts?: LinkText[];
  link?: string;
  isAutoLink?: boolean;
}

const ArticleDescBlock: React.FC<ArticleDescBlockProps> = ({
  desc,
  link,
}) => {
  if (!desc || desc.length === 0) {
    return null;
  }

  const handlePress = link
    ? () => Linking.openURL(link)
    : undefined;

  return (
    <StyledText
      style={[styles.desc, link != null ? styles.link : undefined]}
      onPress={handlePress}>
      {desc.replace(/<br\s*\/?>/gi, '\n')}
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
