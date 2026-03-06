import apiClient from './apiClient';

export type ReadingMaterialStatus = 'ENGAGED' | 'READ';

export interface ReadingMaterialUpsert {
  step: string;
  status: ReadingMaterialStatus;
}

export interface ReadingMaterialResponse extends ReadingMaterialUpsert {
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export const readingMaterialsService = {
  list: async (): Promise<ReadingMaterialResponse[]> => {
    const {data} = await apiClient.get<{results: ReadingMaterialResponse[]}>(
      '/api/app/reading-materials',
    );
    return data.results;
  },

  upsert: async (
    body: ReadingMaterialUpsert,
  ): Promise<ReadingMaterialResponse> => {
    const {data} = await apiClient.put<ReadingMaterialResponse>(
      '/api/app/reading-materials',
      body,
    );
    return data;
  },
};
