import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HighCoin() {
  const [stats, setStats] = useState({
    tps: 5000,
    blockTime: 2.5,
    stakingTotal: 250000000,
    nextBlockIn: 1.2,
    price: 125.5,
    priceChange24h: 5.2,
  });

  const [blocks, setBlocks] = useState([
    { height: 1000000, hash: "0xabc123def456...", miner: "validator-1", txCount: 512, timestamp: "2026-05-27T19:00:00Z" },
    { height: 999999, hash: "0xdef456abc123...", miner: "validator-2", txCount: 489, timestamp: "2026-05-27T18:58:00Z" },
    { height: 999998, hash: "0x123abc456def...", miner: "validator-3", txCount: 501, timestamp: "2026-05-27T18:56:00Z" },
  ]);

  const [chartData, setChartData] = useState([
    { time: "00:00", price: 120 },
    { time: "04:00", price: 122 },
    { time: "08:00", price: 123 },
    { time: "12:00", price: 125 },
    { time: "16:00", price: 124 },
    { time: "20:00", price: 125.5 },
  ]);

  const architecture = [
    { name: "VM", status: "active", version: "3.0.1" },
    { name: "Ledger", status: "active", version: "2.5.0" },
    { name: "Consensus", status: "active", version: "1.8.2" },
    { name: "Networking", status: "active", version: "2.1.0" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        tps: Math.floor(Math.random() * 2000) + 4000,
        price: prev.price + (Math.random() - 0.5) * 2,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">HIGHCOIN</h1>
        <p className="text-foreground/70">Blockchain PoA/PoS - Consensus Layer</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">TPS</div>
          <div className="text-3xl font-bold neon-glow">{stats.tps.toLocaleString()}</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Block Time</div>
          <div className="text-3xl font-bold text-accent">{stats.blockTime}s</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Staking Total</div>
          <div className="text-2xl font-bold neon-glow-green">{(stats.stakingTotal / 1000000).toFixed(0)}M BRZ</div>
        </Card>
        <Card className="hud-border p-4 bg-card/50 text-center">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Next Block</div>
          <div className="text-3xl font-bold text-destructive">{stats.nextBlockIn}s</div>
        </Card>
      </div>

      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">BRZ/USD Price Chart</h2>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-foreground/60 uppercase">Current Price</div>
            <div className="text-2xl font-bold neon-glow">${stats.price.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-xs text-foreground/60 uppercase">24h Change</div>
            <div className={`text-2xl font-bold ${stats.priceChange24h > 0 ? "text-accent" : "text-destructive"}`}>
              {stats.priceChange24h > 0 ? "+" : ""}{stats.priceChange24h}%
            </div>
          </div>
          <div>
            <div className="text-xs text-foreground/60 uppercase">Market Cap</div>
            <div className="text-2xl font-bold text-accent">$31.4B</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.5)" />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 255, 255, 0.5)" }} />
            <Line type="monotone" dataKey="price" stroke="rgba(0, 255, 255, 0.8)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Recent Blocks</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">Height</th>
                <th className="text-left p-2 text-accent">Hash</th>
                <th className="text-left p-2 text-accent">Miner</th>
                <th className="text-left p-2 text-accent">TX Count</th>
                <th className="text-left p-2 text-accent">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block, idx) => (
                <tr key={idx} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 mono-data text-accent">{block.height}</td>
                  <td className="p-2 mono-data text-foreground/70">{block.hash}</td>
                  <td className="p-2 text-foreground/70">{block.miner}</td>
                  <td className="p-2 text-accent font-semibold">{block.txCount}</td>
                  <td className="p-2 text-foreground/60">{new Date(block.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">HighCoin Architecture</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {architecture.map((component, idx) => (
            <div key={idx} className="hud-border p-4 text-center">
              <div className="text-sm font-semibold mb-2">{component.name}</div>
              <div className="text-xs text-accent uppercase tracking-wider mb-1">{component.status}</div>
              <div className="text-xs text-foreground/60">v{component.version}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
