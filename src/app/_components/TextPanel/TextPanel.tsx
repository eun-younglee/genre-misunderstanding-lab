import type { TextPanelProps } from "./types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const TextPanel = ({
  title,
  value,
  placeholder,
  readOnly,
  onChange,
}: TextPanelProps) => {
  return (
    <section className={cn("flex flex-col flex-1 p-5 min-h-0 min-w-0")}>
      <header className="flex justify-between items-center pb-3 px-2 shrink-0">
        <h2 className="text-xl font-semibold">{title}</h2>
      </header>
      <Textarea
        readOnly={readOnly}
        className="resize-none flex-1 bg-white focus-visible:ring-0 text-lg placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </section>
  );
};

export default TextPanel;
