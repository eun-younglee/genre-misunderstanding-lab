import { Badge } from "@/components/ui/badge";
import type { TextPanelProps } from "./types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const TextPanel = ({
  title,
  badgeText,
  value,
  badgeClassName,
  placeholder,
  className,
  isReadOnly = false,
  convertText,
  setSubmittedText,
}: TextPanelProps) => {
  return (
    <section
      className={cn("flex flex-col flex-1 p-5 overflow-hidden", className)}
    >
      <header className="flex justify-between items-center pb-3 px-2 shrink-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        {isReadOnly ? (
          <Badge className={cn("h-5 bg-blue-900", badgeClassName)}>
            {badgeText}
          </Badge>
        ) : (
          <Button
            disabled={value.length === 0}
            className="h-7 bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
            onClick={convertText}
          >
            Convert
          </Button>
        )}
      </header>
      <hr className="pb-4 shrink-0" />
      <Textarea
        readOnly={isReadOnly}
        className="resize-none flex-1 bg-white focus-visible:ring-0 text-lg placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={(e) => setSubmittedText?.(e.target.value)}
        value={value}
      />
    </section>
  );
};

export default TextPanel;
