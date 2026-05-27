import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Nodes() {
  const [nodes, setNodes] = useState([
    { id: "node-1", status: "online", cpuLoad: 45, uptime: 99.99, peers: 128, region: "US-EAST", agents: 12 },
    { id: "node-2", status: "syncing", cpuLoad: 78, uptime: 98.5, peers: 95, region: "EU-WEST", agents: 8 },
    { id: "node-3", status: "online", cpuLoad: 32, uptime: 99.95, peers: 142, region: "ASIA-EAST", agents: 15 },
    { id: "node-4", status: "online", cpuLoad: 56, uptime: 99.98, peers: 118, region: "US-WEST", agents: 10 },
  ]);

  const [chartData, setChartData] = useState([
    { time: "00:00", load: 35 },
    { time: "02:00", load: 42 },
    { time: "04:00", load: 38 },
    { time: "06:00", load: 45 },
    { time: "08:00", load: 52 },
    { time: "10:00", load: 48 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          cpuLoad: Math.floor(Math.random() * 80),
          peers: Math.floor(Math.random() * 50) + 80,
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">ZDOS NODES</h1>
        <p className="text-foreground/70">Distributed Node Network - Real-time Monitoring</p>
      </div>

      {/* Nodes List */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Active Nodes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">Node ID</th>
                <th className="text-left p-2 text-accent">Status</th>
                <th className="text-left p-2 text-accent">CPU Load</th>
                <th className="text-left p-2 text-accent">Uptime</th>
                <th className="text-left p-2 text-accent">Peers</th>
                <th className="text-left p-2 text-accent">Region</th>
                <th className="text-left p-2 text-accent">Agents</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map((node, idx) => (
                <tr key={idx} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 mono-data text-accent font-semibold">{node.id}</td>
                  <td className={`p-2 uppercase text-xs font-semibold ${node.status === "online" ? "text-accent" : "text-destructive"}`}>
                    {node.status}
                  </td>
                  <td className="p-2 text-foreground/70">{node.cpuLoad}%</td>
                  <td className="p-2 text-accent">{node.uptime}%</td>
                  <td className="p-2 text-foreground/70">{node.peers}</td>
                  <td className="p-2 text-foreground/70">{node.region}</td>
                  <td className="p-2 text-accent font-semibold">{node.agents}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* CPU Load Chart */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Network CPU Load (10 min)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 255, 255, 0.5)" }} />
            <Line type="monotone" dataKey="load" stroke="rgba(255, 0, 255, 0.8)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Regional Distribution */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Regional Distribution</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["US-EAST", "EU-WEST", "ASIA-EAST", "US-WEST"].map((region, idx) => {
            const nodeCount = nodes.filter((n) => n.region === region).length;
            return (
              <div key={idx} className="hud-border p-4 text-center">
                <div className="text-sm font-semibold mb-2">{region}</div>
                <div className="text-3xl font-bold text-accent">{nodeCount}</div>
                <div className="text-xs text-foreground/60 mt-1">nodes</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
