import apiClient from './apiClient';

export interface SurgicalScore {
  score: number;
  percentage: number;
}

export interface SurgicalPreference {
  breastConservingSurgery: SurgicalScore;
  mastectomyAndBreastReconstruction: SurgicalScore;
  mastectomy: SurgicalScore;
}

export interface QuestionnaireUpsert {
  survivalRate: number;
  sideEffect: number;
  recoveryTime: number;
  expense: number;
  radiotherapy: number;
  breastAppearance1: number;
  breastAppearance2: number;
}

export interface QuestionnaireResponse extends QuestionnaireUpsert {
  userId: number;
  surgicalPreference: SurgicalPreference;
  createdAt: string;
  updatedAt: string;
}

export const questionnaireService = {
  get: async (): Promise<QuestionnaireResponse> => {
    const {data} = await apiClient.get<QuestionnaireResponse>(
      '/api/app/questionnaire',
    );
    return data;
  },

  upsert: async (
    body: QuestionnaireUpsert,
  ): Promise<QuestionnaireResponse> => {
    const {data} = await apiClient.put<QuestionnaireResponse>(
      '/api/app/questionnaire',
      body,
    );
    return data;
  },
};
