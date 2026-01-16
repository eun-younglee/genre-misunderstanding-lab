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
import { History, FlaskConical } from "lucide-react";

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
      setResultText(data.result);
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

  console.log(history[0]["id"]);

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
          <Drawer direction="right">
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                className={clsx(
                  "h-9 px-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white",
                  "rounded-full transition-all flex items-center gap-2 shadow-lg group hover:text-white"
                )}
                onClick={getHistory}
              >
                <History className="text-white group-hover:rotate-[-10deg] transition-transform" />
                <span className="font-medium">History</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-purple-50">
              <div className="h-full">
                <DrawerHeader>
                  <DrawerTitle className="text-3xl">History</DrawerTitle>
                </DrawerHeader>
                <DrawerDescription className="ml-4">
                  Your recent Genre Misunderstandings
                </DrawerDescription>
                <div className="p-4 pb-0">
                  <p>{history[0]["id"]}</p>
                </div>
              </div>
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
          <div className="flex flex-1 min-h-0">
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
              "hover:opacity-80 transition-opacity"
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
