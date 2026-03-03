import { TFunction } from 'i18next';

import Questionnaire from '~/types/Questionnaire';

export const getQuestionnaire = (
  t: TFunction<'zh-HK', undefined>,
): Questionnaire[] => {
  return [
    {
      title: t('questionnaireTitle1'),
      question: t('questionnaire1'),
      options: [
        {
          type: 'detail',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire1AUrl'),
          title: t('questionnaire1ATitle'),
          subtitle: t('questionnaire1ASubtitle'),
          desc: t('questionnaire1ADesc'),
        },
        {
          type: 'detail',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire1BUrl'),
          title: t('questionnaire1BTitle'),
          subtitle: t('questionnaire1BSubtitle'),
          desc: t('questionnaire1BDesc'),
        },
      ],
    },
    {
      title: t('questionnaireTitle2'),
      question: t('questionnaire2'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire2AUrl'),
          title: t('questionnaire2ADesc'),
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire2BUrl'),
          title: t('questionnaire2BDesc'),
        },
      ],
    },
    {
      title: t('questionnaireTitle3'),
      question: t('questionnaire3'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire3AUrl'),
          title: t('questionnaire3ADesc'),
          maxLines: 1,
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire3BUrl'),
          title: t('questionnaire3BDesc'),
          maxLines: 1,
        },
      ],
    },
    {
      title: t('questionnaireTitle4'),
      question: t('questionnaire4'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire4AUrl'),
          title: t('questionnaire4ADesc'),
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire4BUrl'),
          title: t('questionnaire4BDesc'),
        },
      ],
    },
    {
      title: t('questionnaireTitle5'),
      question: t('questionnaire5'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire5AUrl'),
          title: t('questionnaire5ADesc'),
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire5BUrl'),
          title: t('questionnaire5BDesc'),
        },
      ],
    },
    {
      title: t('questionnaireTitle6'),
      question: t('questionnaire6'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire6AUrl'),
          title: t('questionnaire6ADesc'),
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire6BUrl'),
          title: t('questionnaire6BDesc'),
        },
      ],
    },
    {
      title: t('questionnaireTitle7'),
      question: t('questionnaire7'),
      options: [
        {
          type: 'simple',
          hint: t('questionnaireOptionA'),
          url: t('questionnaire7AUrl'),
          title: t('questionnaire7ADesc'),
        },
        {
          type: 'simple',
          hint: t('questionnaireOptionB'),
          url: t('questionnaire7BUrl'),
          title: t('questionnaire7BDesc'),
        },
      ],
    },
  ];
};
