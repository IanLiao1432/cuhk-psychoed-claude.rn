import { TFunction } from 'i18next';
import { safeJsonParse } from '../../utils/StringTool.ts';
import { ReadingMaterialGroup } from '../../types/ReadingMaterialItem.ts';

/**
 * 一（手術前）
 * 治療前的決擇
 * 乳癌的資訊
 * 常見的乳腺癌治療方法
 * 手術及常見副作用的管理
 *
 * 二（術後兩週）
 * 迎接未來治療挑戰 (一)
 * 藥物治療及常見副作e用的管理
 * 放射治療和常見副作用的處理
 * 飲食、體重控制和運動
 *
 * 三（術後三個月）
 * 迎接未來治療挑戰 (二)
 * 荷爾蒙治療及常見副作用的管理
 * 性健康與身體形象
 * 睡眠和休息
 * 精神健康
 *
 * 四（術後六個月）
 * 治療後的決擇
 * 減輕復發風險
 * 癌症治療後的健康飲食和運動
 * 癌症治療以外的支援
 */
export const getReadingMaterialGroups = (
  t: TFunction<'zh-HK', undefined>,
): [
  ReadingMaterialGroup,
  ReadingMaterialGroup,
  ReadingMaterialGroup,
  ReadingMaterialGroup,
] => {
  return [
    {
      sectionNumber: 1,
      title: t('week1Title'),
      description: t('week1Desc'),
      items: [
        {
          step: '1.1',
          image: require('../../assets/images/ic_info.png'),
          title: t('week1_1Title'),
          content: safeJsonParse(t('readingMaterial1_1')),
        },
        {
          step: '1.2',
          image: require('../../assets/images/ic_info.png'),
          title: t('week1_2Title'),
          content: safeJsonParse(t('readingMaterial1_2')),
        },
        {
          step: '1.3',
          image: require('../../assets/images/ic_info.png'),
          title: t('week1_3Title'),
          content: safeJsonParse(t('readingMaterial1_3')),
        },
      ],
    },
    {
      sectionNumber: 2,
      title: t('week2Title'),
      description: t('week2Desc'),
      items: [
        {
          step: '2.1',
          image: require('../../assets/images/ic_info.png'),
          title: t('week2_1Title'),
          content: safeJsonParse(t('readingMaterial2_1')),
        },
        {
          step: '2.2',
          image: require('../../assets/images/ic_info.png'),
          title: t('week2_2Title'),
          content: safeJsonParse(t('readingMaterial2_2')),
        },
        {
          step: '2.3',
          image: require('../../assets/images/ic_info.png'),
          title: t('week2_3Title'),
          content: safeJsonParse(t('readingMaterial2_3')),
        },
      ],
    },
    {
      sectionNumber: 3,
      title: t('week3Title'),
      description: t('week3Desc'),
      items: [
        {
          step: '3.1',
          image: require('../../assets/images/ic_info.png'),
          title: t('week3_1Title'),
          content: safeJsonParse(t('readingMaterial3_1')),
        },
        {
          step: '3.2',
          image: require('../../assets/images/ic_info.png'),
          title: t('week3_2Title'),
          content: safeJsonParse(t('readingMaterial3_2')),
        },
        {
          step: '3.3',
          image: require('../../assets/images/ic_info.png'),
          title: t('week3_3Title'),
          content: safeJsonParse(t('readingMaterial3_3')),
        },
        {
          step: '3.4',
          image: require('../../assets/images/ic_info.png'),
          title: t('week3_4Title'),
          content: safeJsonParse(t('readingMaterial3_4')),
        },
      ],
    },
    {
      sectionNumber: 4,
      title: t('week4Title'),
      description: t('week4Desc'),
      items: [
        {
          step: '4.1',
          image: require('../../assets/images/ic_info.png'),
          title: t('week4_1Title'),
          content: safeJsonParse(t('readingMaterial4_1')),
        },
        {
          step: '4.2',
          image: require('../../assets/images/ic_info.png'),
          title: t('week4_2Title'),
          content: safeJsonParse(t('readingMaterial4_2')),
        },
        {
          step: '4.3',
          image: require('../../assets/images/ic_info.png'),
          title: t('week4_3Title'),
          content: safeJsonParse(t('readingMaterial4_3')),
        },
      ],
    },
  ];
};
