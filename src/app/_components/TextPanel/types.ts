import React from "react";

export type TextPanelProps = {
  title: string;
  value: string;
  placeholder?: string;
  className?: string;
  readOnly: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
