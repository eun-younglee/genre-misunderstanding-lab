import { Genre } from "@/app/types";

export type HistoryDrawerProps = {
  getSessionId: () => string;
  setOriginalText: (originalText: string) => void;
  setSelectedGenre: (selectedGenre: Genre | "") => void;
  setSelectedModel: (selectedModel: string) => void;
  setResultText: (result: string) => void;
};
