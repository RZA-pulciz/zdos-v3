import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
export default function About() {
  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50"><h1 className="text-4xl font-bold neon-glow mb-2">ABOUT ZDOS NEXUS</h1><p className="text-foreground/70">The Future of Distributed Computing</p></div>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Project Overview</h2><p className="text-foreground/80">ZDOS NEXUS v3.0 is a unified distributed operating system combining blockchain, AI, and cloud computing.</p></Card>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Key Features</h2><div className="grid grid-cols-2 md:grid-cols-3 gap-3"><div className="hud-border p-3 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm">Blockchain PoA/PoS</span></div><div className="hud-border p-3 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm">Cross-Chain Bridge</span></div><div className="hud-border p-3 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" /><span className="text-sm">AI-Powered Routing</span></div></div></Card>
      <Card className="hud-border p-6 bg-card/50"><h2 className="text-lg font-bold neon-glow mb-4">Statistics</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-3"><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Active Nodes</div><div className="text-3xl font-bold text-accent">42</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Daily TX</div><div className="text-3xl font-bold text-accent">1.2M</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Users</div><div className="text-3xl font-bold text-accent">50K+</div></div><div className="text-center"><div className="text-xs text-foreground/60 uppercase mb-2">Uptime</div><div className="text-3xl font-bold text-accent">99.97%</div></div></div></Card>
    </div>
  );
}
