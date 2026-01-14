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
import Loading from "./_components/Loading/Loading";
import clsx from "clsx";

const GENRES = [
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

const tabs = [
  { id: "mung1", label: "MUNG1" },
  { id: "mung2", label: "MUNG2" },
  { id: "mung3", label: "MUNG3" },
  { id: "mung4", label: "MUNG4" },
];

export default function Home() {
  return (
    <div className="flex h-screen min-w-444 bg-blue-100">
      <div className="flex w-full h-1/10 bg-amber-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            className="w-50 border-2 border-blue-950"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
