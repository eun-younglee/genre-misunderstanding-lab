export const GENRES = [
  "Military Operation Report",
  "Bible or Prophecy",
  "1980s Rockstar Interview",
  "Psychiatric Case File",
  "Authoritarian Government Internal Document",
] as const;

export type Genre = (typeof GENRES)[number];

export const LOADING_TEXT: Record<Genre, string> = {
  "Military Operation Report": "Operational interpretation in progress…",
  "Bible or Prophecy": "The voice speaks, but meaning resists certainty…",
  "1980s Rockstar Interview": "The artist lights another cigarette…",
  "Psychiatric Case File": "Subject denies distress; symptoms persist…",
  "Authoritarian Government Internal Document": "Compliance analysis underway…",
};

export const MODELS: Array<string> = [
  "gemma-3-27b",
  "gpt-oss-120b",
  "xiaomi-mimo",
];
