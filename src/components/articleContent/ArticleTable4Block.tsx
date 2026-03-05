import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TableRow2 } from '../../types/ReadingMaterialItem';

interface ArticleTable4BlockProps {
  content: TableRow2;
}

const ArticleTable4Block: React.FC<ArticleTable4BlockProps> = ({ content }) => {
  const { title, content: rows, row1Ratio = 0.3 } = content;
  const col1Flex = row1Ratio;
  const col2Flex = 1 - row1Ratio;

  return (
    <View style={styles.container}>
      {/* Header row */}
      {title.length > 0 && (
        <View style={styles.headerRow}>
          <View style={[styles.cell, { flex: 1 }]}>
            <Text style={styles.headerText}>{title[0]}</Text>
          </View>
          {title[1] != null && (
            <View style={[styles.cell, { flex: col2Flex }]}>
              <Text style={styles.headerText}>{title[1]}</Text>
            </View>
          )}
        </View>
      )}

      {/* Content rows */}
      {rows.map((row, index) => {
        const isLast = index === rows.length - 1;
        const isAlt = index % 2 === 1;

        return (
          <View
            key={index}
            style={[
              styles.row,
              isAlt && styles.rowAlt,
              !isLast && styles.rowBorder,
            ]}
          >
            <View
              style={[
                styles.cell,
                { flex: col1Flex },
                row.backgroundColor != null && {
                  backgroundColor: row.backgroundColor,
                },
              ]}
            >
              <Text
                style={[
                  styles.titleText,
                  row.textColor != null && { color: row.textColor },
                ]}
              >
                {row.title}
              </Text>
            </View>
            <View style={[styles.cell, { flex: col2Flex }]}>
              <Text style={styles.descText}>{row.desc}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#FFB4BC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  rowAlt: {
    backgroundColor: '#FFF5F5',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBDF',
  },
  cell: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#6E1E6F',
    textAlign: 'center',
  },
  titleText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#6E1E6F',
    textAlign: 'center',
  },
  descText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#6E1E6F',
    textAlign: 'center',
  },
});

export default ArticleTable4Block;
