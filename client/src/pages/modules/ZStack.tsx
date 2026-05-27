import React from "react";
import { Card } from "@/components/ui/card";
export default function ZStack() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">Z-STACK CI/CD</h1><p className="text-foreground/70">Continuous Integration & Deployment</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Pipeline Stages</h2><div className="flex gap-2 overflow-x-auto pb-2"><div className="hud-border p-3 text-center min-w-24"><div className="text-xs font-semibold text-accent">FETCH</div><div className="text-xs text-foreground/60 mt-1">2.3s</div></div><div className="text-accent">→</div><div className="hud-border p-3 text-center min-w-24"><div className="text-xs font-semibold text-accent">BUILD</div><div className="text-xs text-foreground/60 mt-1">8.5s</div></div><div className="text-accent">→</div><div className="hud-border p-3 text-center min-w-24"><div className="text-xs font-semibold text-accent">TEST</div><div className="text-xs text-foreground/60 mt-1">12.1s</div></div><div className="text-accent">→</div><div className="hud-border p-3 text-center min-w-24"><div className="text-xs font-semibold text-accent">DEPLOY</div><div className="text-xs text-foreground/60 mt-1">22.1s</div></div></div></Card>
    </div>
  );
}
