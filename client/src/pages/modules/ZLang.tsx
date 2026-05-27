import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ZLang() {
  const [code, setCode] = useState(`fn main() {
  print("Hello ZDOS!");
  let x = 42;
  return x * 2;
}`);

  const [output, setOutput] = useState([
    "[ZECO] Z-Lang Playground v3.0.1",
    "[LOAD] ZPM Package Manager initialized",
    "[READY] Waiting for input...",
  ]);

  const [packages, setPackages] = useState([
    { name: "zdos-core", version: "3.0.0", status: "installed" },
    { name: "bridge-sdk", version: "2.1.0", status: "installed" },
    { name: "crypto-lib", version: "1.8.5", status: "installed" },
    { name: "ai-router", version: "2.5.0", status: "installed" },
  ]);

  const [modules, setModules] = useState([
    { name: "System", functions: 45, status: "loaded" },
    { name: "Network", functions: 28, status: "loaded" },
    { name: "Storage", functions: 32, status: "loaded" },
    { name: "Crypto", functions: 52, status: "loaded" },
  ]);

  const handleExecute = () => {
    setOutput((prev) => [
      ...prev,
      "> Executing...",
      "[EXEC] Compiling Z-Lang code",
      "[EXEC] Running main() function",
      "[OUTPUT] Hello ZDOS!",
      "[RESULT] 84",
      "[DONE] Execution completed in 0.234s",
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">Z-LANG PLAYGROUND</h1>
        <p className="text-foreground/70">ZDOS Programming Language - Interactive Development Environment</p>
      </div>

      {/* Editor */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Code Editor</h2>
        <Textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="font-mono text-sm bg-background/50 border-accent/30 text-foreground"
          rows={10}
          placeholder="Write your Z-Lang code here..."
        />
        <Button onClick={handleExecute} className="mt-4 w-full">
          EXECUTE CODE
        </Button>
      </Card>

      {/* Terminal Output */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">ZECO Terminal</h2>
        <div className="bg-background/50 border border-accent/30 rounded p-4 h-48 overflow-y-auto font-mono text-sm">
          {output.map((line, idx) => (
            <div key={idx} className="text-accent mb-1">
              {line}
            </div>
          ))}
        </div>
      </Card>

      {/* ZPM Packages */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">ZPM Package Manager</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {packages.map((pkg, idx) => (
            <div key={idx} className="hud-border p-3">
              <div className="text-sm font-semibold mb-1">{pkg.name}</div>
              <div className="text-xs text-accent mb-1">v{pkg.version}</div>
              <div className="text-xs text-foreground/60">{pkg.status}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* System Modules */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">System Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {modules.map((mod, idx) => (
            <div key={idx} className="hud-border-pink p-4 text-center">
              <div className="text-sm font-semibold mb-2">{mod.name}</div>
              <div className="text-xs text-accent mb-1">{mod.functions} functions</div>
              <div className="text-xs text-foreground/60">{mod.status}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
