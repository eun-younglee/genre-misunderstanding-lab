import { Badge } from "@/components/ui/badge";
import type { TextPanelProps } from "./types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// TODO: 로딩 추가

const TextPanel = ({
  title,
  badgeText,
  value,
  badgeClassName,
  placeholder,
  className,
}: TextPanelProps) => {
  return (
    <section
      className={cn("flex flex-col flex-1 p-5 overflow-hidden", className)}
    >
      <header className="flex justify-between items-center pb-3 px-2 shrink-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Badge className={cn("h-5 bg-blue-900", badgeClassName)}>
          {badgeText}
        </Badge>
      </header>
      <hr className="pb-4 shrink-0" />
      {/* Todo: Textarea 말고 Markdown 보여줄 수 있게 바꾸기 */}
      <Textarea
        readOnly={true}
        className="resize-none flex-1 bg-white focus-visible:ring-0 text-lg placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
      />
    </section>
  );
};

export default TextPanel;
