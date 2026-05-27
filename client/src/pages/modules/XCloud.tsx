import React from "react";
import { Card } from "@/components/ui/card";
export default function XCloud() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">xCLOUD ENTERPRISE</h1><p className="text-foreground/70">CRM & Business Automation</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Sales Pipeline</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="hud-border p-3 text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Leads</div><div className="text-3xl font-bold text-accent">45</div></div><div className="hud-border p-3 text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Prospects</div><div className="text-3xl font-bold text-accent">28</div></div><div className="hud-border p-3 text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Negotiation</div><div className="text-3xl font-bold text-accent">12</div></div><div className="hud-border p-3 text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Won</div><div className="text-3xl font-bold text-accent">8</div></div></div></Card>
    </div>
  );
}
