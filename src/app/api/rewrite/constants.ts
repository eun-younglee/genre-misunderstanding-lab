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
