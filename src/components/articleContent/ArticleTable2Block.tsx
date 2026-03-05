import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {
  TableRowWithImage,
  TableRowIndent2,
  IndentDescContent,
} from '../../types/ReadingMaterialItem';
import {GOOGLE_CLOUD_STORAGE_BUCKET} from '@env';
import RichText from './RichText';

interface ArticleTable2BlockProps {
  content: (TableRowWithImage | TableRowIndent2)[];
}

const isTableRowWithImage = (
  row: TableRowWithImage | TableRowIndent2,
): row is TableRowWithImage => {
  return 'desc' in row;
};

const renderIndentContent = (items: IndentDescContent[]) => (
  <View style={styles.indentList}>
    {items.map((item, i) => {
      const level = parseInt(item.indentLevel, 10) || 0;
      return (
        <View key={i} style={[styles.indentRow, {marginLeft: level * 12}]}>
          {item.indentMarker.length > 0 && (
            <RichText style={styles.indentMarker}>{item.indentMarker}</RichText>
          )}
          <RichText style={styles.indentDesc}>{item.desc}</RichText>
        </View>
      );
    })}
  </View>
);

const ArticleTable2Block: React.FC<ArticleTable2BlockProps> = ({content}) => {
  // Separate header rows (TableRowWithImage) from table rows (TableRowIndent2)
  const headerRows = content.filter(isTableRowWithImage);
  const tableRows = content.filter(
    (row): row is TableRowIndent2 => !isTableRowWithImage(row),
  );

  return (
    <View style={styles.container}>
      {/* Header area: title + desc with optional image */}
      {headerRows.map((row, i) => (
        <View key={`header-${i}`} style={styles.headerArea}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>{row.title}</Text>
            {row.desc.length > 0 && (
              <Text style={styles.headerDesc}>{row.desc}</Text>
            )}
          </View>
          {row.imageUrl != null && row.imageUrl.length > 0 && (
            <View style={styles.headerImageWrap}>
              <Image
                source={{uri: `${GOOGLE_CLOUD_STORAGE_BUCKET}/${row.imageUrl}`}}
                style={styles.headerImage}
                resizeMode="cover"
              />
            </View>
          )}
        </View>
      ))}

      {/* Table rows */}
      {tableRows.length > 0 && (
        <View style={styles.table}>
          {tableRows.map((row, rowIndex) => (
            <View
              key={rowIndex}
              style={[
                styles.row,
                rowIndex % 2 === 0 && styles.rowAlt,
                rowIndex < tableRows.length - 1 && styles.rowBorder,
              ]}>
              <View style={styles.labelCell}>
                <Text style={styles.labelText}>{row.title}</Text>
              </View>
              <View style={styles.contentCell}>
                {renderIndentContent(row.content)}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
    gap: 16,
  },
  // Header area
  headerArea: {
    flexDirection: 'row',
    gap: 16,
  },
  headerText: {
    flex: 1,
    gap: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 24,
    color: '#6E1E6F',
  },
  headerDesc: {
    fontWeight: '400',
    fontSize: 14,
    color: '#6E1E6F',
  },
  headerImageWrap: {
    width: 128,
    borderRadius: 12,
    overflow: 'hidden',
  },
  headerImage: {
    width: 128,
    height: 133,
  },
  // Table rows
  table: {
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rowAlt: {
    backgroundColor: '#FFF5F5',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBDF',
  },
  labelCell: {
    width: 64,
    paddingVertical: 10,
    paddingLeft: 8,
    paddingRight: 4,
  },
  labelText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#6E1E6F',
  },
  contentCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  // Indent content
  indentList: {
    gap: 8,
  },
  indentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  indentMarker: {
    fontWeight: '400',
    fontSize: 14,
    color: '#6E1E6F',
    marginRight: 4,
  },
  indentDesc: {
    flex: 1,
    fontWeight: '400',
    fontSize: 14,
    color: '#6E1E6F',
  },
});

export default ArticleTable2Block;
