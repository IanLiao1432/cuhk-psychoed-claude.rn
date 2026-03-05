import React from 'react';
import {Text, TextStyle, StyleSheet, TextProps} from 'react-native';

interface RichTextProps extends Pick<TextProps, 'onPress'> {
  children: string;
  style?: TextStyle | (TextStyle | undefined)[];
}

interface StyledSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  sup?: boolean;
  sub?: boolean;
  warm?: boolean;
  lineBreak?: boolean;
}

/**
 * Parses a string containing simple HTML tags (<b>, <i>, <u>, <br>, <sup>, <sub>)
 * into an array of styled segments.
 */
const parseHtml = (html: string): StyledSegment[] => {
  const segments: StyledSegment[] = [];
  const tagStack: string[] = [];

  // Split on HTML tags, keeping the tags as separate tokens
  const tokens = html.split(/(<\/?(?:b|i|u|br|sup|sub|Warm)\s*\/?>)/i);

  for (const token of tokens) {
    if (!token) {
      continue;
    }

    // Check for <br> / <br/>
    if (/^<br\s*\/?>$/i.test(token)) {
      segments.push({text: '', lineBreak: true});
      continue;
    }

    // Check for opening tag
    const openMatch = token.match(/^<(b|i|u|sup|sub|Warm)>$/);
    if (openMatch) {
      const tag = openMatch[1] === 'Warm' ? 'Warm' : openMatch[1].toLowerCase();
      tagStack.push(tag);
      continue;
    }

    // Check for closing tag
    const closeMatch = token.match(/^<\/(b|i|u|sup|sub|Warm)>$/);
    if (closeMatch) {
      const tag = closeMatch[1] === 'Warm' ? 'Warm' : closeMatch[1].toLowerCase();
      const idx = tagStack.lastIndexOf(tag);
      if (idx !== -1) {
        tagStack.splice(idx, 1);
      }
      continue;
    }

    // Plain text — apply currently active tags
    segments.push({
      text: token,
      bold: tagStack.includes('b'),
      italic: tagStack.includes('i'),
      underline: tagStack.includes('u'),
      sup: tagStack.includes('sup'),
      sub: tagStack.includes('sub'),
      warm: tagStack.includes('Warm'),
    });
  }

  return segments;
};

const RichText: React.FC<RichTextProps> = ({children, style, onPress}) => {
  // Fast path: no HTML tags at all
  if (!/<\/?(?:b|i|u|br|sup|sub)\s*\/?>/.test(children)) {
    return <Text style={style} onPress={onPress}>{children}</Text>;
  }

  const segments = parseHtml(children);

  return (
    <Text style={style} onPress={onPress}>
      {segments.map((seg, i) => {
        if (seg.lineBreak) {
          return '\n';
        }

        const segStyle: TextStyle = {};
        if (seg.bold) {
          segStyle.fontWeight = '700';
        }
        if (seg.italic) {
          segStyle.fontStyle = 'italic';
        }
        if (seg.underline) {
          segStyle.textDecorationLine = 'underline';
        }
        if (seg.sup) {
          segStyle.fontSize = styles.sup.fontSize;
          segStyle.lineHeight = styles.sup.lineHeight;
        }
        if (seg.sub) {
          segStyle.fontSize = styles.sub.fontSize;
          segStyle.lineHeight = styles.sub.lineHeight;
        }
        if (seg.warm) {
          segStyle.color = '#E97132';
        }

        const hasStyle = Object.keys(segStyle).length > 0;
        return hasStyle ? (
          <Text key={i} style={segStyle}>
            {seg.text}
          </Text>
        ) : (
          seg.text
        );
      })}
    </Text>
  );
};

const styles = StyleSheet.create({
  sup: {
    fontSize: 10,
    lineHeight: 14,
  },
  sub: {
    fontSize: 10,
    lineHeight: 14,
  },
});

export default RichText;
