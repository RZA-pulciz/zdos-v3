import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ZGenesis() {
  const [bootLog, setBootLog] = useState([
    "[BOOT] Initializing Z-GENESIS OS v3.0...",
    "[LOAD] Z-Sentience module... OK",
    "[LOAD] Z-Guardian module... OK",
    "[LOAD] Z-Heal module... OK",
    "[LOAD] Z-Shield module... OK",
    "[LOAD] Z-Runtime module... OK",
    "[LOAD] Z-AI_AOA module... OK",
    "[READY] Z-GENESIS OS ready in 2.34s",
    "[STATUS] All systems operational",
  ]);

  const [modules, setModules] = useState([
    { name: "Z-Sentience", status: "active", uptime: 99.99, version: "3.0.1" },
    { name: "Z-Guardian", status: "active", uptime: 99.98, version: "2.8.0" },
    { name: "Z-Heal", status: "active", uptime: 99.97, version: "2.5.3" },
    { name: "Z-Shield", status: "active", uptime: 99.99, version: "3.1.0" },
    { name: "Z-Runtime", status: "active", uptime: 99.96, version: "2.9.2" },
    { name: "Z-AI_AOA", status: "active", uptime: 99.95, version: "3.2.1" },
  ]);

  const handleRestart = () => {
    setBootLog((prev) => [
      ...prev,
      "[RESTART] Initiating Z-GENESIS restart...",
      "[SHUTDOWN] Graceful shutdown in progress...",
      "[SAVE] Persisting state to storage...",
      "[REBOOT] System rebooting...",
      "[BOOT] Initializing Z-GENESIS OS v3.0...",
      "[LOAD] Z-Sentience module... OK",
      "[LOAD] Z-Guardian module... OK",
      "[LOAD] Z-Heal module... OK",
      "[LOAD] Z-Shield module... OK",
      "[LOAD] Z-Runtime module... OK",
      "[LOAD] Z-AI_AOA module... OK",
      "[READY] Z-GENESIS OS ready in 2.34s",
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">Z-GENESIS OS</h1>
        <p className="text-foreground/70">Self-Healing Distributed Operating System</p>
      </div>

      {/* System Modules */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">System Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((mod, idx) => (
            <div key={idx} className="hud-border-pink p-4">
              <div className="text-sm font-semibold mb-2">{mod.name}</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Status:</span>
                  <span className="text-accent">{mod.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Uptime:</span>
                  <span className="text-accent">{mod.uptime}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Version:</span>
                  <span className="text-foreground/70">v{mod.version}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Boot Sequence Terminal */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">gti-zshell Terminal</h2>
        <div className="bg-background/50 border border-accent/30 rounded p-4 h-64 overflow-y-auto font-mono text-sm mb-4">
          {bootLog.map((line, idx) => (
            <div key={idx} className="text-accent mb-1">
              {line}
            </div>
          ))}
        </div>
        <Button onClick={handleRestart} className="w-full">
          RESTART Z-GENESIS
        </Button>
      </Card>

      {/* Self-Healing Status */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Self-Healing Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Health Check</div>
            <div className="text-2xl font-bold text-accent">98.5%</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Issues Fixed</div>
            <div className="text-2xl font-bold text-accent">1,247</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Last Heal</div>
            <div className="text-2xl font-bold text-accent">2m ago</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Recovery Rate</div>
            <div className="text-2xl font-bold text-accent">99.7%</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
