const GENRE_RULES: Record<string, string> = {
  "Military Operation Report": `
- Use formal, detached military language
- Include operation codes, threat levels, and timestamps
- Structure the text into sections such as: Overview, Situation, Assessment, Action
- Refer to people as units or assets
- Express emotions only as operational risks`,

  "Bible or Prophecy": `
- Use archaic, solemn language
- Divide text into verses
- Interpret mundane events as moral or cosmic signs
- Speak with absolute authority
- Avoid modern terminology`,

  "1980s Rockstar Interview": `
- Include 2 interviewer questions and 2 artist answers.
- Make up an artist name, artist name must be in English. 
- Use metaphor-heavy, evasive language.
- Portray suffering as artistic fuel.
- Sound confident, slightly arrogant, and emotionally detached.

Format: 
- Interviewer: question...
- (Made-up artist name): answer...
- Interviewer: question...
- (Made-up artist name): answer...`,

  "Psychiatric Case File": `- Use clinical, impersonal tone
- Divide into sections (Patient Statement, Observation, Assessment)
- Describe emotions as symptoms
- Avoid empathy`,

  "Authoritarian Government Internal Document": `
- Use bureaucratic, sanitized language
- Include classification levels and redactions
- Reframe personal experiences as compliance issues
- Emphasize order, productivity, and deviation`,
};

export const getRewritePrompt = (genre: string, text: string) => {
  const genre_rules = GENRE_RULES[genre];

  return `
Target genre: ${genre}.

Language Constraint (MANDATORY):
- Identify Input language and use it for output.
- Output MUST be written entirely in Input language.

Task:
- Convert the given text into the target genre.
- Preserve the original meaning and events as much as possible.
- Do not add any commentary or explanation outside the rewritten text.

Genre Rules:
${genre_rules}

Input text:
"""
${text}
"""
`;
};

export const ERROR_MESSAGE: Record<string, string> = {
  "Military Operation Report":
    "⚠️ Transmission interrupted. Report could not be finalized under current operational constraints.",
  "Bible or Prophecy":
    "⚠️ Evaluation halted. Content requires further review by the appropriate authority.",
  "1980s Rockstar Interview":
    'The artist exhales smoke and refuses to answer. "Some things don’t survive the amp."',
  "Psychiatric Case File": "The words were spoken, but not revealed.",
  "Authoritarian Government Internal Document":
    "Session interrupted. Narrative continuity could not be established.",
};

export const MODELS: Record<string, string> = {
  "gemma-3-27b": "google/gemma-3-27b-it:free",
  "gpt-oss-120b": "openai/gpt-oss-120b:free",
  "xiaomi-mimo": "xiaomi/mimo-v2-flash:free",
};
