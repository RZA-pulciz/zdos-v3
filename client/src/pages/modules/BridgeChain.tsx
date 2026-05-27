import React from "react";
import { Card } from "@/components/ui/card";
export default function BridgeChain() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">BRIDGECHAIN</h1><p className="text-foreground/70">Cross-Chain Bridge</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Bridge Connections</h2><div className="space-y-2"><div className="hud-border p-3 flex justify-between"><span>BRZ ↔ ETH</span><span className="text-accent">$1.5M</span></div><div className="hud-border p-3 flex justify-between"><span>BRZ ↔ MATIC</span><span className="text-accent">$2.0M</span></div><div className="hud-border p-3 flex justify-between"><span>BRZ ↔ BSC</span><span className="text-accent">$1.2M</span></div></div></Card>
    </div>
  );
}
