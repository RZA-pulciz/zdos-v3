import React from "react";
import { Card } from "@/components/ui/card";
export default function Nodes() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">ZDOS NODES</h1><p className="text-foreground/70">Distributed Node Network</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Active Nodes</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="hud-border p-3 text-center"><div className="text-sm font-semibold">US-EAST</div><div className="text-2xl font-bold text-accent">12</div></div><div className="hud-border p-3 text-center"><div className="text-sm font-semibold">EU-WEST</div><div className="text-2xl font-bold text-accent">8</div></div><div className="hud-border p-3 text-center"><div className="text-sm font-semibold">ASIA-EAST</div><div className="text-2xl font-bold text-accent">15</div></div><div className="hud-border p-3 text-center"><div className="text-sm font-semibold">US-WEST</div><div className="text-2xl font-bold text-accent">10</div></div></div></Card>
    </div>
  );
}
