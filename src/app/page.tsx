"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import TextPanel from "./_components/TextPanel/TextPanel";
import { useState } from "react";

const GENRES = [
  "Military Operation Report",
  "Bible or Prophecy",
  "1980s Rockstar Interview",
  "Psychiatric Case File",
  "Authoritarian Government Internal Document",
];

export default function Home() {
  const [originalText, setOriginalText] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [resultText, setResultText] = useState<string>("");
  const [submittedText, setSubmittedText] = useState<string>("");

  const convertText = async () => {
    setSubmittedText(submittedText);
    const response = await fetch("/api/rewrite", {
      method: "POST",
      body: JSON.stringify({
        text: submittedText,
        genre: selectedGenre,
      }),
    });
    const data = await response.json();
    setResultText(data.result);
  };

  return (
    <main className="bg-purple-200/50 h-screen w-screen flex items-center justify-center py-10">
      <Card className="max-w-5/6 h-full w-full overflow-hidden p-0 gap-0 shadow-2xl flex flex-col">
        <CardHeader className="h-30 bg-linear-to-r from-purple-600/80 to-blue-600/80 flex flex-col justify-center px-10 shrink-0">
          <CardTitle className="text-white text-4xl">
            Genre Misunderstanding Lab
          </CardTitle>
          <p className="text-gray-100 font-semibold">
            Same text, but in different Genre
          </p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          {/* Input Section */}
          <section className="flex flex-col h-2/5 bg-gray-100/40 px-10 gap-8 justify-center shrink-0">
            <div className="space-y-3">
              <label className="block font-medium">Original Text</label>
              <Textarea
                className="border-2 rounded-sm h-30 resize-none bg-white focus-visible:ring-0"
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Enter text to convert"
              />
            </div>

            <div className="space-y-3">
              <label className="block font-medium">Select a genre</label>
              <div className="flex gap-4">
                <Select onValueChange={(genre) => setSelectedGenre(genre)}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {GENRES.map((genre) => (
                        <SelectItem key={genre} value={genre}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  className="w-25 bg-linear-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity"
                  disabled={!originalText || !selectedGenre}
                  onClick={convertText}
                >
                  Convert
                </Button>
              </div>
            </div>
          </section>
          <div className="flex flex-1 overflow-hidden">
            <TextPanel
              title="Original"
              badgeText="Editable"
              badgeClassName="bg-blue-800"
              value={submittedText}
              placeholder="This is an original text"
              convertText={convertText}
              setSubmittedText={setSubmittedText}
            />
            <TextPanel
              title="Result"
              badgeText="Locked"
              className="bg-purple-100/50"
              placeholder="Converted text will appear here..."
              value={resultText}
              isReadOnly
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
