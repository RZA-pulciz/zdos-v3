import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function ZStack() {
  const [pipelineLog, setPipelineLog] = useState([
    "[FETCH] Pulling code from repository... ✓",
    "[BUILD] Compiling Z-STACK... ✓",
    "[TEST] Running test suite... ✓",
    "[DEPLOY] Deploying to production... ✓",
    "[DONE] Pipeline completed in 45s ✓",
  ]);

  const [services, setServices] = useState([
    { name: "ZDOS Core", version: "3.0.1", status: "running" },
    { name: "HighCoin", version: "2.5.0", status: "running" },
    { name: "BridgeChain", version: "2.1.0", status: "running" },
    { name: "DSN Wallet", version: "1.8.2", status: "running" },
    { name: "Z-Lang VM", version: "3.0.0", status: "running" },
    { name: "Z-GENESIS", version: "2.9.5", status: "running" },
  ]);

  const [pipelineStages] = useState([
    { name: "FETCH", status: "done", duration: "2.3s" },
    { name: "BUILD", status: "done", duration: "8.5s" },
    { name: "TEST", status: "done", duration: "12.1s" },
    { name: "DEPLOY", status: "done", duration: "22.1s" },
  ]);

  const handleRunZStack = () => {
    setPipelineLog((prev) => [
      ...prev,
      "",
      "[TRIGGER] Manual pipeline execution initiated",
      "[FETCH] Pulling latest code... ✓",
      "[BUILD] Building Z-STACK... ✓",
      "[TEST] Running comprehensive tests... ✓",
      "[DEPLOY] Deploying to production... ✓",
      "[DONE] Pipeline completed successfully in 47s ✓",
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">Z-STACK CI/CD</h1>
        <p className="text-foreground/70">Continuous Integration & Deployment Orchestrator</p>
      </div>

      {/* Pipeline Stages */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Pipeline Stages</h2>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {pipelineStages.map((stage, idx) => (
            <div key={idx} className="flex items-center gap-2 flex-shrink-0">
              <div className="hud-border p-3 text-center min-w-24">
                <div className="text-xs font-semibold text-accent">{stage.name}</div>
                <div className="text-xs text-foreground/60 mt-1">{stage.duration}</div>
              </div>
              {idx < pipelineStages.length - 1 && <div className="text-accent">→</div>}
            </div>
          ))}
        </div>
      </Card>

      {/* Terminal Output */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Z-STACK Terminal</h2>
        <div className="bg-background/50 border border-accent/30 rounded p-4 h-48 overflow-y-auto font-mono text-sm mb-4">
          {pipelineLog.map((line, idx) => (
            <div key={idx} className="text-accent mb-1">
              {line}
            </div>
          ))}
        </div>
        <Button onClick={handleRunZStack} className="w-full">
          RUN ZSTACK
        </Button>
      </Card>

      {/* Services Status */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Service Versions & Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {services.map((service, idx) => (
            <div key={idx} className="hud-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <div className="text-sm font-semibold">{service.name}</div>
              </div>
              <div className="text-xs text-foreground/70">v{service.version}</div>
              <div className="text-xs text-accent uppercase mt-1">{service.status}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Deployment History */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Recent Deployments</h2>
        <div className="space-y-2">
          {[
            { time: "2026-05-27 19:00", status: "success", duration: "45s" },
            { time: "2026-05-27 18:30", status: "success", duration: "43s" },
            { time: "2026-05-27 18:00", status: "success", duration: "46s" },
          ].map((deploy, idx) => (
            <div key={idx} className="hud-border p-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{deploy.time}</div>
                <div className="text-xs text-foreground/60">{deploy.duration}</div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
