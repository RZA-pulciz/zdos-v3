import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeNodes: 42,
    txPerHour: 1250,
    bridgeZSupply: 500000000,
    uptime: 99.97,
    cortexAgents: 128,
    modulesOnline: 11,
  });

  const [chartData, setChartData] = useState([
    { time: "00:00", tx: 800, nodes: 38 },
    { time: "04:00", tx: 950, nodes: 40 },
    { time: "08:00", tx: 1100, nodes: 41 },
    { time: "12:00", tx: 1250, nodes: 42 },
    { time: "16:00", tx: 1180, nodes: 42 },
    { time: "20:00", tx: 1320, nodes: 42 },
  ]);

  const services = [
    { name: "ZDOS Core", status: "online", uptime: 99.99 },
    { name: "HighCoin", status: "online", uptime: 99.97 },
    { name: "ZLang VM", status: "online", uptime: 99.95 },
    { name: "DSN Wallet", status: "online", uptime: 99.98 },
    { name: "BridgeChain", status: "syncing", uptime: 98.5 },
    { name: "xCLOUD", status: "online", uptime: 99.99 },
    { name: "Z-GENESIS", status: "online", uptime: 99.96 },
    { name: "Z-STACK", status: "online", uptime: 99.99 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        txPerHour: Math.floor(Math.random() * 500) + 1000,
        cortexAgents: Math.floor(Math.random() * 50) + 100,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">NEXUS DASHBOARD</h1>
        <p className="text-foreground/70">ZDOS Ecosystem Overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Active Nodes</div>
          <div className="text-3xl font-bold neon-glow">{stats.activeNodes}</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">TX/Hour</div>
          <div className="text-3xl font-bold text-accent">{stats.txPerHour}</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">BridgeZ Supply</div>
          <div className="text-2xl font-bold neon-glow-green">{(stats.bridgeZSupply / 1000000).toFixed(0)}M</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Uptime</div>
          <div className="text-3xl font-bold text-accent">{stats.uptime}%</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Cortex Agents</div>
          <div className="text-3xl font-bold neon-glow-pink">{stats.cortexAgents}</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Modules Online</div>
          <div className="text-3xl font-bold neon-glow">{stats.modulesOnline}</div>
        </Card>
      </div>

      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Network Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 255, 255, 0.5)" }} />
            <Area type="monotone" dataKey="tx" stroke="rgba(0, 255, 255, 0.8)" fill="rgba(0, 255, 255, 0.1)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Services Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((service, idx) => (
            <div key={idx} className="hud-border p-3 text-center">
              <div className="text-sm font-semibold mb-2">{service.name}</div>
              <div className={`text-xs uppercase tracking-wider ${service.status === "online" ? "text-accent" : "text-destructive"}`}>
                {service.status}
              </div>
              <div className="text-xs text-foreground/60 mt-1">{service.uptime}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
