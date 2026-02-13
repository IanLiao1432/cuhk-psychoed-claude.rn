import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import {WordingKeys, wordingService} from '../services/wordingService';

interface WordingContextType {
  wordings: WordingKeys;
  isLoading: boolean;
  t: (key: string, fallback?: string) => string;
}

const WordingContext = createContext<WordingContextType | undefined>(undefined);

export const WordingProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [wordings, setWordings] = useState<WordingKeys>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    wordingService.fetchWordings().then(keys => {
      setWordings(keys);
      setIsLoading(false);
    });
  }, []);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      return wordings[key] ?? fallback ?? key;
    },
    [wordings],
  );

  const contextValue = useMemo(
    () => ({wordings, isLoading, t}),
    [wordings, isLoading, t],
  );

  return (
    <WordingContext.Provider value={contextValue}>
      {children}
    </WordingContext.Provider>
  );
};

export const useWording = (): WordingContextType => {
  const context = useContext(WordingContext);
  if (!context) {
    throw new Error('useWording must be used within a WordingProvider');
  }
  return context;
};
