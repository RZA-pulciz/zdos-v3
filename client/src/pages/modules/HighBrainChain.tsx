import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HighBrainChain() {
  const [agents, setAgents] = useState([
    { id: "agent-1", name: "Reasoning Engine", status: "active", tasks: 42, efficiency: 98.5 },
    { id: "agent-2", name: "Memory Manager", status: "active", tasks: 128, efficiency: 97.2 },
    { id: "agent-3", name: "Knowledge Indexer", status: "syncing", tasks: 256, efficiency: 95.8 },
    { id: "agent-4", name: "Semantic Router", status: "active", tasks: 89, efficiency: 99.1 },
    { id: "agent-5", name: "Task Orchestrator", status: "active", tasks: 156, efficiency: 96.7 },
    { id: "agent-6", name: "Pattern Analyzer", status: "active", tasks: 203, efficiency: 98.3 },
  ]);

  const [memoryStore, setMemoryStore] = useState({
    entries: 1250000,
    indexSize: "2.3 GB",
    accessTime: "0.23ms",
    hitRate: 94.5,
  });

  const [chartData, setChartData] = useState([
    { agent: "Reasoning", efficiency: 98.5 },
    { agent: "Memory", efficiency: 97.2 },
    { agent: "Indexer", efficiency: 95.8 },
    { agent: "Router", efficiency: 99.1 },
    { agent: "Orchestrator", efficiency: 96.7 },
    { agent: "Analyzer", efficiency: 98.3 },
  ]);

  const [reasoningLog, setReasoningLog] = useState([
    "[COGNITIVE] Initializing reasoning engine...",
    "[SEMANTIC] Processing query: 'Optimize network performance'",
    "[KNOWLEDGE] Searching knowledge graph... 1,247 nodes found",
    "[REASONING] Analyzing 5 potential solutions",
    "[DECISION] Selected optimal path with 99.1% confidence",
    "[RESULT] Recommendation: Increase validator count to 48",
  ]);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">HIGHBRAINCHAIN</h1>
        <p className="text-foreground/70">Cognitive Layer - AGI-Powered Decision Making</p>
      </div>

      {/* Memory Store */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Memory Store</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Entries</div>
            <div className="text-2xl font-bold text-accent">{(memoryStore.entries / 1000000).toFixed(1)}M</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Index Size</div>
            <div className="text-2xl font-bold text-accent">{memoryStore.indexSize}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Access Time</div>
            <div className="text-2xl font-bold text-accent">{memoryStore.accessTime}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Hit Rate</div>
            <div className="text-2xl font-bold text-accent">{memoryStore.hitRate}%</div>
          </div>
        </div>
      </Card>

      {/* Cognitive Agents */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Cognitive Agents</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">Agent</th>
                <th className="text-left p-2 text-accent">Status</th>
                <th className="text-left p-2 text-accent">Tasks</th>
                <th className="text-left p-2 text-accent">Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 font-semibold">{agent.name}</td>
                  <td className={`p-2 uppercase text-xs font-semibold ${agent.status === "active" ? "text-accent" : "text-destructive"}`}>
                    {agent.status}
                  </td>
                  <td className="p-2 text-foreground/70">{agent.tasks}</td>
                  <td className="p-2 text-accent">{agent.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Efficiency Chart */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Agent Efficiency Metrics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="agent" stroke="rgba(255, 255, 255, 0.5)" />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 255, 255, 0.5)" }} />
            <Bar dataKey="efficiency" fill="rgba(0, 255, 255, 0.6)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Reasoning Log */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Reasoning Log</h2>
        <div className="bg-background/50 border border-accent/30 rounded p-4 h-48 overflow-y-auto font-mono text-sm">
          {reasoningLog.map((line, idx) => (
            <div key={idx} className="text-accent mb-1">
              {line}
            </div>
          ))}
        </div>
      </Card>

      {/* Knowledge Graph Stats */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Knowledge Graph</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Nodes</div>
            <div className="text-2xl font-bold text-accent">1.2M</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Edges</div>
            <div className="text-2xl font-bold text-accent">4.8M</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Density</div>
            <div className="text-2xl font-bold text-accent">0.67</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Avg Path</div>
            <div className="text-2xl font-bold text-accent">3.2</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
