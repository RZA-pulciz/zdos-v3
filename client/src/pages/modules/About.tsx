import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

export default function About() {
  const roadmap = [
    {
      quarter: "Q1 2026",
      status: "completed",
      items: ["ZDOS Core v1.0", "HighCoin Blockchain", "DSN Wallet", "Basic Bridge"],
    },
    {
      quarter: "Q2 2026",
      status: "completed",
      items: ["Z-Lang v1.0", "ZDOS Nodes", "Z-GENESIS OS", "BridgeChain v2.0"],
    },
    {
      quarter: "Q3 2026",
      status: "in-progress",
      items: ["xCLOUD Enterprise", "Z-STACK CI/CD", "HighBrainChain", "AGI Cortex Layer"],
    },
    {
      quarter: "Q4 2026",
      status: "planned",
      items: ["Z.TOR Network", "Z-NODE Suite", "Enterprise Features", "Global Deployment"],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">ABOUT ZDOS NEXUS</h1>
        <p className="text-foreground/70">The Future of Distributed Computing</p>
      </div>

      {/* Project Info */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Project Overview</h2>
        <div className="space-y-4 text-foreground/80">
          <p>
            <strong>ZDOS NEXUS v3.0</strong> is a unified distributed operating system that combines blockchain technology, 
            artificial intelligence, and cloud computing into a single, cohesive ecosystem.
          </p>
          <p>
            Our mission is to democratize access to enterprise-grade distributed infrastructure, enabling developers and 
            organizations to build the next generation of decentralized applications.
          </p>
          <p>
            The platform integrates 11 core modules: Dashboard, HighCoin blockchain, BridgeChain cross-chain bridge, 
            DSN Wallet, Z-Lang programming language, ZDOS Nodes, Z-GENESIS OS, xCLOUD Enterprise, Z-STACK CI/CD, 
            HighBrainChain cognitive layer, and comprehensive monitoring tools.
          </p>
        </div>
      </Card>

      {/* Key Features */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Key Features</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Blockchain PoA/PoS",
            "Cross-Chain Bridge",
            "Distributed Storage",
            "AI-Powered Routing",
            "Self-Healing OS",
            "Enterprise CRM",
            "CI/CD Orchestration",
            "Cognitive Computing",
            "Real-time Monitoring",
          ].map((feature, idx) => (
            <div key={idx} className="hud-border p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Roadmap */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Development Roadmap 2026</h2>
        <div className="space-y-4">
          {roadmap.map((phase, idx) => (
            <div key={idx} className="hud-border p-4">
              <div className="flex items-center gap-3 mb-3">
                {phase.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                ) : phase.status === "in-progress" ? (
                  <Clock className="w-5 h-5 text-destructive animate-pulse" />
                ) : (
                  <Clock className="w-5 h-5 text-foreground/40" />
                )}
                <div className="font-semibold">{phase.quarter}</div>
                <div className={`text-xs uppercase ml-auto ${phase.status === "completed" ? "text-accent" : phase.status === "in-progress" ? "text-destructive" : "text-foreground/40"}`}>
                  {phase.status}
                </div>
              </div>
              <div className="space-y-1 ml-8">
                {phase.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-sm text-foreground/70">
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Team & Vision */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Vision & Team</h2>
        <div className="space-y-4 text-foreground/80">
          <div>
            <h3 className="font-semibold mb-2">Our Vision</h3>
            <p>
              To build the most advanced, scalable, and user-friendly distributed operating system that empowers 
              individuals and organizations to participate in the decentralized economy.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Core Values</h3>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Decentralization:</strong> True peer-to-peer architecture</li>
              <li>• <strong>Security:</strong> Enterprise-grade encryption and validation</li>
              <li>• <strong>Innovation:</strong> Cutting-edge AI and blockchain technology</li>
              <li>• <strong>Accessibility:</strong> User-friendly interfaces for all skill levels</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Active Nodes</div>
            <div className="text-3xl font-bold text-accent">42</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Daily TX</div>
            <div className="text-3xl font-bold text-accent">1.2M</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Users</div>
            <div className="text-3xl font-bold text-accent">50K+</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Uptime</div>
            <div className="text-3xl font-bold text-accent">99.97%</div>
          </div>
        </div>
      </Card>

      {/* Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button className="hud-border p-4 text-center hover:bg-accent/10 transition-colors">
          <div className="text-sm font-semibold">GitHub</div>
          <div className="text-xs text-foreground/60 mt-1">View Source</div>
        </button>
        <button className="hud-border p-4 text-center hover:bg-accent/10 transition-colors">
          <div className="text-sm font-semibold">Docs</div>
          <div className="text-xs text-foreground/60 mt-1">Documentation</div>
        </button>
        <button className="hud-border p-4 text-center hover:bg-accent/10 transition-colors">
          <div className="text-sm font-semibold">Twitter</div>
          <div className="text-xs text-foreground/60 mt-1">Follow Us</div>
        </button>
        <button className="hud-border p-4 text-center hover:bg-accent/10 transition-colors">
          <div className="text-sm font-semibold">Discord</div>
          <div className="text-xs text-foreground/60 mt-1">Join Community</div>
        </button>
      </div>
    </div>
  );
}
