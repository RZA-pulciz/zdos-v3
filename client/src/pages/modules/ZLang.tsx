import React from "react";
import { Card } from "@/components/ui/card";
export default function ZLang() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">Z-LANG PLAYGROUND</h1><p className="text-foreground/70">Programming Language</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Editor</h2><div className="bg-background/50 border border-accent/30 rounded p-4 h-64 font-mono text-sm text-accent">fn main() {"{"}<br/>  println!("Hello ZDOS");<br/>{"}"}</div></Card>
    </div>
  );
}
