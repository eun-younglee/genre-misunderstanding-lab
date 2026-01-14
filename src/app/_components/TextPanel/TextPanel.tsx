import { Badge } from "@/components/ui/badge";
import type { TextPanelProps } from "./types";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// TODO: 로딩 추가

const TextPanel = ({
  title,
  value,
  placeholder,
  isResult,
  className,
}: TextPanelProps) => {
  return (
    <section
      className={cn("flex flex-col flex-1 p-5 overflow-hidden", className)}
    >
      <header className="flex justify-between items-center pb-3 px-2 shrink-0">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Drawer direction="right">
          <DrawerTrigger asChild>
            {isResult && (
              <Button className="h-7 bg-linear-to-r from-gray-500 to-gray-900">
                History
              </Button>
            )}
          </DrawerTrigger>
          <DrawerContent className="bg-purple-50">
            <div className="h-full">
              <DrawerHeader>
                <DrawerTitle className="text-3xl">History</DrawerTitle>
              </DrawerHeader>
              <DrawerDescription className="ml-4">
                Your recent Genre Misunderstandings
              </DrawerDescription>
              <div className="p-4 pb-0"></div>
            </div>
          </DrawerContent>
        </Drawer>
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
