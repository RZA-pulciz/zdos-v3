import React from "react";
import { Card } from "@/components/ui/card";
export default function HighCoin() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">HIGHCOIN</h1><p className="text-foreground/70">Blockchain Network</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Network Stats</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">TPS</div><div className="text-3xl font-bold text-accent">4500</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Block Time</div><div className="text-3xl font-bold text-accent">2.5s</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Price</div><div className="text-3xl font-bold text-accent">$125.50</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Supply</div><div className="text-3xl font-bold text-accent">500M</div></div></div></Card>
    </div>
  );
}
