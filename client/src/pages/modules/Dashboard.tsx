import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({ activeNodes: 42, txPerHour: 1250, uptime: 99.97, cortexAgents: 128 });
  const [chartData] = useState([
    { time: "00:00", tx: 1200 }, { time: "04:00", tx: 1400 }, { time: "08:00", tx: 1100 },
    { time: "12:00", tx: 1600 }, { time: "16:00", tx: 1300 }, { time: "20:00", tx: 1500 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({ ...prev, txPerHour: Math.floor(Math.random() * 500) + 1000, cortexAgents: Math.floor(Math.random() * 50) + 100 }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">ZDOS NEXUS DASHBOARD</h1>
        <p className="text-foreground/70">Unified Distributed Operating System</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hud-border p-4 bg-card/50"><div className="text-xs text-foreground/60 uppercase mb-2">Active Nodes</div><div className="text-3xl font-bold text-accent">{stats.activeNodes}</div></Card>
        <Card className="hud-border p-4 bg-card/50"><div className="text-xs text-foreground/60 uppercase mb-2">TX/Hour</div><div className="text-3xl font-bold text-accent">{stats.txPerHour}</div></Card>
        <Card className="hud-border p-4 bg-card/50"><div className="text-xs text-foreground/60 uppercase mb-2">Uptime</div><div className="text-3xl font-bold text-accent">{stats.uptime}%</div></Card>
        <Card className="hud-border p-4 bg-card/50"><div className="text-xs text-foreground/60 uppercase mb-2">Agents</div><div className="text-3xl font-bold text-accent">{stats.cortexAgents}</div></Card>
      </div>
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Network Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" /><XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" /><YAxis stroke="rgba(255, 255, 255, 0.5)" /><Tooltip /><Line type="monotone" dataKey="tx" stroke="rgba(0, 255, 255, 0.8)" strokeWidth={2} dot={false} /></LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
