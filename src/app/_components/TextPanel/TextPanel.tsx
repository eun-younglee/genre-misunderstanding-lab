import { Badge } from "@/components/ui/badge";
import type { TextPanelProps } from "./types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

export function TextPanel({
  title,
  badgeText,
  badgeClassName,
  placeholder,
  className,
  isReadOnly = false,
}: TextPanelProps) {
  return (
    <section
      className={cn("flex flex-col flex-1 p-5 overflow-hidden", className)}
    >
      <header className="flex justify-between items-center pb-3 px-2 shrink-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Badge className={cn("h-5", badgeClassName)}>{badgeText}</Badge>
      </header>
      <hr className="pb-4 shrink-0" />
      <Textarea
        readOnly={isReadOnly}
        className="resize-none flex-1 bg-white focus-visible:ring-0 text-lg placeholder:text-gray-400"
        placeholder={placeholder}
      />
    </section>
  );
}
