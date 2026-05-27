import React from "react";
import { Card } from "@/components/ui/card";
export default function Wallet() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">DSN WALLET</h1><p className="text-foreground/70">Asset Management</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Balances</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">BRZ</div><div className="text-2xl font-bold text-accent">10,500.5</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Staking</div><div className="text-2xl font-bold text-accent">5,000</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">APY</div><div className="text-2xl font-bold text-accent">12.5%</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Rewards</div><div className="text-2xl font-bold text-accent">625.75</div></div></div></Card>
    </div>
  );
}
