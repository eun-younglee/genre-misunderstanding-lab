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

import { Button } from "@/components/ui/button";
import TextPanel from "./_components/TextPanel/TextPanel";
import { useState } from "react";
import Loading from "./_components/Loading/Loading";
import clsx from "clsx";
import { FlaskConical } from "lucide-react";
import HistoryDrawer from "./_components/Drawer/HistoryDrawer";
import { Genre, GENRES, LOADING_TEXT, MODELS } from "./types";

export default function Home() {
  const [originalText, setOriginalText] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<Genre | "">("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      await postHistory(data.result);
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

  const postHistory = async (result: string) => {
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
          result: result,
        }),
      });
    } catch (error) {
      console.error("History save failed:", error);
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
          <HistoryDrawer
            getSessionId={getSessionId}
            setOriginalText={setOriginalText}
            setSelectedGenre={setSelectedGenre}
            setSelectedModel={setSelectedModel}
            setResultText={setResultText}
          />
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <section className="flex pt-10 pb-5 pl-7 gap-3 items-center shrink-0">
            <label className="block font-medium">Genre</label>
            <Select onValueChange={(genre) => setSelectedGenre(genre as Genre)}>
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
