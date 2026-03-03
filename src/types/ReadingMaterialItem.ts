import { ImageSourcePropType } from 'react-native';
import { LinkText } from './LinkText.ts';

export interface ReadingMaterialGroup {
  sectionNumber: number;
  title: string;
  description: string;
  items: ReadingMaterialItem[];
}

export interface ReadingMaterialItem {
  step: string;
  image: ImageSourcePropType;
  title: string;
  content: ReadingMaterialContent[];
}
export interface ImageContent {
  images: ImageWithDesc[];
  title?: string;
  youtubeId?: string;
}
export interface ImageWithDesc {
  imageUrl: string;
  desc: string;
}

export type IndentDescContent = {
  indentLevel: string;
  indentMarker: string;
  desc: string;
  link?: string;
  isAutoLink?: boolean;
};
export type TableRow3 = [
  string | IndentDescContent[],
  string | IndentDescContent[],
  string | IndentDescContent[],
];
export type TableRowWithImage = {
  title: string;
  desc: string;
  imageUrl?: string;
};
export type TableRowImage = {
  imageUrl: string;
  aspectRatio?: number;
};
export type TableRowIndent2 = {
  title: string;
  content: IndentDescContent[];
};
export type TableRow2 = {
  title: string[];
  content: {
    title: string;
    desc: string;
    textColor?: string;
    backgroundColor?: string;
  }[];
  row1Ratio?: number;
};

export type ReadingMaterialContent =
  | {
      type: 'text';
      title?: string;
      desc?: string;
      linkTexts?: LinkText[];
      isAutoLink?: boolean;
    }
  | {
      type: 'desc';
      desc?: string;
      linkTexts?: LinkText[];
      link?: string;
      isAutoLink?: boolean;
    }
  | {
      type: 'indentDesc';
      indentDescContent: IndentDescContent[];
      expandButtonText?: string;
    }
  | {
      type: 'image';
      imageUrl: string;
      imageTitle?: string;
      imageDetail?: string;
      isShowMagnifying?: boolean;
      isFullWidth?: boolean;
      isNoPadding?: boolean;
      isPlaceCenter?: boolean;
      aspectRatio?: number;
      imageWidthRatio?: number;
    }
  | {
      type: 'table1';
      table1Style?: 'normal' | 'white' | (string & {});
      header?: string;
      title: TableRow3;
      content: TableRow3[];
    }
  | {
      type: 'table2';
      content: (TableRowWithImage | TableRowIndent2)[];
    }
  | {
      type: 'table3';
      title: string;
      content: (string | TableRowImage | IndentDescContent)[];
    }
  | {
      type: 'table4';
      content: TableRow2;
    }
  | {
      type: 'carousel';
      content: ImageContent;
    };

export enum ReadingMaterialState {
  Collapsed,
  Expanded,
  Locked,
}
