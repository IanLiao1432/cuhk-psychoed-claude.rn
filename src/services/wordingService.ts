import axios from 'axios';

const WORDING_URL = 'https://www.relationapp.io/api/projects/39/download';

export type WordingKeys = Record<string, string>;

interface WordingResponse {
  [locale: string]: {
    default?: boolean;
    keys: WordingKeys;
  };
}

let cachedWordings: WordingKeys | null = null;

export const wordingService = {
  async fetchWordings(): Promise<WordingKeys> {
    try {
      console.log(`[API] → GET ${WORDING_URL}`);
      const {data} = await axios.get<WordingResponse>(WORDING_URL, {
        timeout: 10000,
      });
      console.log('[API] ← 200 GET /wording', {locales: Object.keys(data)});

      // Find the default locale or fall back to 'zh-HK'
      const locale =
        Object.keys(data).find(key => data[key].default) || 'zh-HK';
      const keys = data[locale]?.keys ?? {};

      cachedWordings = keys;
      return keys;
    } catch (error: any) {
      console.log('[API] ✗ GET /wording', {message: error.message});
      return cachedWordings ?? {};
    }
  },

  getCachedWordings(): WordingKeys {
    return cachedWordings ?? {};
  },
};
