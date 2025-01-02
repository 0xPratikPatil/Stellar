"use client";

import { useState, useEffect } from "react";
import { Signal, Rocket, RocketIcon } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  missionName: string;
}

export default function Header({ missionName }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [communicationStatus, setCommunicationStatus] = useState<
    "Connected" | "Disconnected"
  >("Disconnected");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-background border-b border-primary/20 p-2">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex text-xs items-center gap-6">
          <div className="flex-col text-center">
            <div className="text-primary/60">Date:</div>
            <div>{currentTime.toDateString()}</div>
          </div>
          <div className="flex-col text-center">
            <div className="text-primary/60">Time:</div>
            <div>{currentTime.toLocaleTimeString()}</div>
          </div>
        </div>

        <div className="flex flex-col text-center items-center justify-center">
          <div className="flex text-primary/60 items-center gap-2 justify-center">
            <RocketIcon className="w-4 h-4" />
            <span className="">Lotus</span>
          </div>
          <div className="flex justify-center items-center">
            <h1 className="text-xs">Mission:</h1>
            <h1 className="text-xs">{missionName}</h1>
          </div>
        </div>

        <div className="flex text-xs items-center gap-6">
          <div className="flex-col text-center items-center gap-2">
            <span className="text-primary/60">Status:</span>
            <div className="flex text-center items-center gap-1 justify-center">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span>{communicationStatus}</span>
            </div>
          </div>

          <div className="flex-col text-center items-center gap-2 justify-center">
            <span className="text-primary/60">Signal:</span>
            <div className="flex text-center items-center gap-1 justify-center">
              <Signal className="h-3.5 w-3.5 text-primary" />
              <span>Strong</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
