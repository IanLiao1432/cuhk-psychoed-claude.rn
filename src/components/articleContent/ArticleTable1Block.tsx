import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TableRow3, IndentDescContent} from '../../types/ReadingMaterialItem';
import StyledText from 'react-native-styled-text';

interface ArticleTable1BlockProps {
  table1Style?: 'normal' | 'white' | (string & {});
  header?: string;
  title: TableRow3;
  content: TableRow3[];
}

const renderCellContent = (
  cell: string | IndentDescContent[] | undefined,
  textStyle: object,
) => {
  if (cell == null) {
    return null;
  }
  if (typeof cell === 'string') {
    return <StyledText style={textStyle}>{cell}</StyledText>;
  }
  return cell.map((item, i) => (
    <StyledText key={i} style={textStyle}>{item.desc}</StyledText>
  ));
};

const ArticleTable1Block: React.FC<ArticleTable1BlockProps> = ({
  table1Style,
  header,
  title,
  content,
}) => {
  const isWhite = table1Style === 'white';

  const renderRow = (
    row: TableRow3,
    isHeader: boolean,
    rowIndex?: number,
    totalRows?: number,
  ) => {
    const isLast = rowIndex === (totalRows ?? 0) - 1;
    const isAlt = !isHeader && rowIndex != null && rowIndex % 2 === 1;

    return (
      <View
        key={isHeader ? 'title' : rowIndex}
        style={[
          styles.row,
          isHeader && styles.titleRow,
          isAlt && styles.rowAlt,
          !isHeader && !isLast && styles.rowBorder,
        ]}>
        {/* Column 1: fixed width */}
        <View style={styles.firstCell}>
          {renderCellContent(
            row[0],
            isHeader ? styles.headerCellText : styles.firstColText,
          )}
        </View>
        {/* Column 2: flex */}
        <View style={styles.flexCell}>
          {renderCellContent(
            row[1],
            isHeader ? styles.headerCellText : styles.cellText,
          )}
        </View>
        {/* Column 3: flex */}
        <View style={styles.flexCell}>
          {renderCellContent(
            row[2],
            isHeader ? styles.headerCellText : styles.cellText,
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {header != null && header.length > 0 && (
        <Text style={styles.header}>{header}</Text>
      )}
      <View style={[styles.table, isWhite && styles.tableWhite]}>
        {title != null && title.length > 0 && renderRow(title, true)}
        {content.map((row, i) => renderRow(row, false, i, content.length))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    fontWeight: '700',
    fontSize: 17,
    color: '#6E1E6F',
  },
  table: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 16,
    gap: 0,
  },
  tableWhite: {
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRow: {
    backgroundColor: '#FFB4BC',
  },
  rowAlt: {
    backgroundColor: '#FFF5F5',
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFDBDF',
  },
  firstCell: {
    width: 64,
    paddingVertical: 10,
    paddingLeft: 8,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCell: {
    flex: 1,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#6E1E6F',
    textAlign: 'center',
  },
  firstColText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#6E1E6F',
    textAlign: 'center',
  },
  cellText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#6E1E6F',
    textAlign: 'center',
  },
});

export default ArticleTable1Block;
