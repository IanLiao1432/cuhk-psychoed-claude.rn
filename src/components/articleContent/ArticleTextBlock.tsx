import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StyledText from 'react-native-styled-text';
import {LinkText} from '../../types/LinkText';

interface ArticleTextBlockProps {
  title?: string;
  desc?: string;
  linkTexts?: LinkText[];
  isAutoLink?: boolean;
}

const customTextStyles = StyleSheet.create({
  warm: {color: '#E97132'},
  sup: {fontSize: 10, lineHeight: 14},
  sub: {fontSize: 10, lineHeight: 14},
});

const preprocessBr = (text: string) => text.replace(/<br\s*\/?>/gi, '\n');

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
          <StyledText style={styles.title} textStyles={customTextStyles}>
            {preprocessBr(title)}
          </StyledText>
        </View>
      )}
      {desc != null && desc.length > 0 && (
        <StyledText style={styles.desc} textStyles={customTextStyles}>
          {preprocessBr(desc)}
        </StyledText>
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
