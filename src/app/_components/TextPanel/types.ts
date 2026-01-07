import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export type TextPanelProps = {
  title: string;
  badgeText: string;
  value: string;
  badgeClassName?: string;
  placeholder?: string;
  className?: string;
  isReadOnly?: boolean;
  convertText?: MouseEventHandler<HTMLButtonElement>;
  setSubmittedText?: Dispatch<SetStateAction<string>>;
};
