import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { History, Clock, X, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { HistoryDrawerProps } from "./types";

const HistoryDrawer = ({
  getSessionId,
  setOriginalText,
  setSelectedGenre,
  setSelectedModel,
  setResultText,
}: HistoryDrawerProps) => {
  const [history, setHistory] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getHistory = async () => {
    const sessionId = getSessionId();
    const url = `/api/history?session_id=${sessionId}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("History fetch failed:", error);
    }
  };

  const deleteHistory = async (id: string) => {
    const sessionId = getSessionId();
    const url = `/api/history?session_id=${sessionId}&history_id=${id}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete history failed:", error);
    }
  };

  return (
    <Drawer direction="right" open={isOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className={clsx(
            "h-9 px-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white",
            "rounded-full transition-all flex items-center gap-2 shadow-lg hover:text-white group/drawer",
          )}
          onClick={() => {
            getHistory();
            setIsOpen(true);
          }}
        >
          <History className="text-white group-hover/drawer:rotate-[-10deg] transition-transform" />
          <span className="font-medium">History</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="overflow-auto group/content">
        {/* drawer 밖에 눌렀을 때 닫히는 거 추가하기 */}
        <DrawerHeader>
          <div className="flex gap-1">
            <History className="w-5 text-blue-800" />
            <DrawerTitle className="">History</DrawerTitle>
            <DrawerClose
              className="flex  w-full justify-end"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <X className="cursor-pointer w-5" />
            </DrawerClose>
          </div>
          <DrawerDescription className="text-xs">
            Your recent Genre Misunderstandings
          </DrawerDescription>
        </DrawerHeader>
        {history.map((item, index) => {
          const getRelativeTime = (dateString: string) => {
            const now = new Date();
            const past = new Date(dateString);
            const diffInMs = now.getTime() - past.getTime();

            const diffInSeconds = Math.floor(diffInMs / 1000);
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            if (diffInSeconds < 60) return "방금 전";
            if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
            if (diffInHours < 24) return `${diffInHours}시간 전`;
            if (diffInDays < 7) return `${diffInDays}일 전`;

            // 7일 이상이면 날짜 표시 (예: 1월 29일)
            return past.toLocaleDateString("ko-KR", {
              month: "long",
              day: "numeric",
            });
          };
          return (
            <div
              key={`history-${index}`}
              className={clsx(
                "flex p-3 flex-col items-start border mx-3 mb-3 rounded-sm",
                "h-auto text-left justify-start gap-1",
                "hover:cursor-pointer",
              )}
              role="button"
              onClick={() => {
                setOriginalText(item.original);
                setSelectedGenre(item.genre);
                setSelectedModel(item.model);
                setResultText(item.result);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-1 justify-end w-full">
                <Clock className="w-3! h-3! text-gray-500" />
                <p className="text-gray-500 text-xs">
                  {getRelativeTime(item.created_at)}
                </p>
                <Button
                  variant="ghost"
                  className="h-3 w-3 bg-white group-hover/content:bg-white/20 group/button hover:cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteHistory(item.id);
                  }}
                >
                  <Trash2 className="text-gray-500 group-hover/button:text-red-500" />
                </Button>
              </div>
              <div className="flex gap-1 flex-wrap">
                <Badge className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.genre}
                </Badge>
                <Badge className="rounded bg-blue-400/20 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.model}
                </Badge>
              </div>
              <div className="flex flex-col gap-0 w-full text-left">
                <p className="font-semibold text-gray-800 text-base">
                  {item.original}
                </p>
                <p className="text-sm text-gray-500 truncate">{item.result}</p>
              </div>
            </div>
          );
        })}
      </DrawerContent>
    </Drawer>
  );
};

export default HistoryDrawer;
