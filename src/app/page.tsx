"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import TextPanel from "./_components/TextPanel/TextPanel";
import { useState } from "react";
import Loading from "./_components/Loading/Loading";
import clsx from "clsx";
import { History, FlaskConical, Clock, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const GENRES: Array<string> = [
  "Military Operation Report",
  "Bible or Prophecy",
  "1980s Rockstar Interview",
  "Psychiatric Case File",
  "Authoritarian Government Internal Document",
];

const LOADING_TEXT: Record<string, string> = {
  "Military Operation Report": "Operational interpretation in progress…",
  "Bible or Prophecy": "The voice speaks, but meaning resists certainty…",
  "1980s Rockstar Interview": "The artist lights another cigarette…",
  "Psychiatric Case File": "Subject denies distress; symptoms persist…",
  "Authoritarian Government Internal Document": "Compliance analysis underway…",
};

const MODELS: Array<string> = ["gemma-3-27b", "gpt-oss-120b", "xiaomi-mimo"];

export default function Home() {
  const [originalText, setOriginalText] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sessionId = crypto.randomUUID();

  const convertText = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        body: JSON.stringify({
          text: originalText,
          genre: selectedGenre,
          model: selectedModel,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setResultText(data.result);
        return;
      }
      setResultText(data.result);
      await postHistory();
    } catch (error) {
      console.error("Conversion failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function getSessionId() {
    let sessionId = localStorage.getItem("session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);
    }

    return sessionId;
  }

  const postHistory = async () => {
    const sessionId = getSessionId();
    const url = `/api/history?session_id=${sessionId}`;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original: originalText,
          genre: selectedGenre,
          model: selectedModel,
          result: resultText,
        }),
      });
    } catch (error) {
      console.error("History save failed:", error);
    }
  };

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

  return (
    <main className="bg-purple-200/50 h-screen w-screen flex items-center justify-center py-10 ">
      <Card className="max-w-3/4 h-full w-full overflow-hidden p-0 gap-0 shadow-2xl flex flex-col ">
        <CardHeader className="h-30 bg-linear-to-r from-purple-600/80 to-blue-600/80 flex flex-row justify-between items-center px-10 shrink-0">
          <div>
            <CardTitle className="flex items-center gap-1">
              <FlaskConical className="text-white" size={30} />
              <span className="text-white text-4xl">
                Genre Misunderstanding Lab
              </span>
            </CardTitle>
            <p className="pt-3 text-gray-100 font-semibold">
              Same text, but in different Genre
            </p>
          </div>
          <Drawer direction="right" open={isOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className={clsx(
                  "h-9 px-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white",
                  "rounded-full transition-all flex items-center gap-2 shadow-lg group hover:text-white",
                )}
                onClick={() => {
                  getHistory();
                  setIsOpen(true);
                }}
              >
                <History className="text-white group-hover:rotate-[-10deg] transition-transform" />
                <span className="font-medium">History</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="">
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
                  <Button
                    key={`history-${index}`}
                    variant="ghost"
                    className={clsx(
                      "flex flex-col items-start border mx-3 mb-3 rounded-sm",
                      "h-auto text-left justify-start gap-1",
                      "hover:cursor-pointer",
                    )}
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
                    </div>
                    <div className="flex gap-1">
                      <span className="rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.genre}
                      </span>
                      <span className="rounded bg-blue-400/20 px-2 py-0.5 text-xs font-medium text-primary">
                        {item.model}
                      </span>
                    </div>
                    <div className="flex flex-col gap-0 w-full text-left">
                      <p className="font-semibold text-gray-800 text-base">
                        {item.original}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {item.result}
                      </p>
                    </div>
                  </Button>
                );
              })}
            </DrawerContent>
          </Drawer>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <section className="flex pt-10 pb-5 pl-7 gap-3 items-center shrink-0">
            <label className="block font-medium">Genre</label>
            <Select onValueChange={(genre) => setSelectedGenre(genre)}>
              <SelectTrigger className="bg-white w-60">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectGroup>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <label className="block font-medium ml-3">Model</label>
            <Select onValueChange={(model) => setSelectedModel(model)}>
              <SelectTrigger className="bg-white w-60">
                <SelectValue placeholder="Select a genre" />
              </SelectTrigger>
              <SelectContent className="w-60">
                <SelectGroup>
                  {MODELS.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </section>
          <div className="grid grid-cols-2 flex-1 min-h-0 w-full">
            {isLoading && <Loading loadingText={LOADING_TEXT[selectedGenre]} />}
            <TextPanel
              title="Original"
              value={originalText}
              placeholder="Enter text to convert"
              readOnly={false}
              onChange={(e) => setOriginalText(e.target.value)}
            />
            <TextPanel
              title="Result"
              placeholder="Converted text will appear here..."
              value={resultText}
              readOnly={true}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center self-center mb-10 mt-5">
          <Button
            className={clsx(
              "w-25 bg-linear-to-r from-purple-600 to-blue-600 ",
              "hover:opacity-80 transition-opacity",
            )}
            disabled={!originalText || !selectedGenre}
            onClick={convertText}
          >
            <p className="font-semibold">Convert</p>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
