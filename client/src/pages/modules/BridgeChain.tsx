import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function BridgeChain() {
  const [connections, setConnections] = useState([
    { from: "BRZ", to: "ETH", fee: 0.5, volume24h: 1500000, syncStatus: "synced" },
    { from: "BRZ", to: "MATIC", fee: 0.3, volume24h: 2000000, syncStatus: "syncing" },
    { from: "BRZ", to: "BSC", fee: 0.25, volume24h: 1200000, syncStatus: "synced" },
  ]);

  const [transactions, setTransactions] = useState([
    { from: "ETH", to: "BRZ", amount: 50, status: "confirmed", timestamp: "2026-05-27T19:00:00Z" },
    { from: "MATIC", to: "BRZ", amount: 100, status: "confirmed", timestamp: "2026-05-27T18:55:00Z" },
    { from: "BRZ", to: "BSC", amount: 75, status: "pending", timestamp: "2026-05-27T18:50:00Z" },
  ]);

  const [chartData, setChartData] = useState([
    { chain: "ETH", volume: 1500 },
    { chain: "MATIC", volume: 2000 },
    { chain: "BSC", volume: 1200 },
  ]);

  const modules = [
    { name: "BridgeZ Core", status: "active", version: "2.1.0" },
    { name: "TX Validator", status: "active", version: "1.9.5" },
    { name: "EVM Adapter", status: "active", version: "3.0.2" },
    { name: "Reward Logic", status: "active", version: "1.5.1" },
    { name: "RPC Router", status: "active", version: "2.3.0" },
    { name: "P2P Sync", status: "syncing", version: "1.7.8" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          volume24h: conn.volume24h + Math.floor(Math.random() * 100000),
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">BRIDGECHAIN</h1>
        <p className="text-foreground/70">Cross-Chain Bridge - Multi-Blockchain Interoperability</p>
      </div>

      {/* Connections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {connections.map((conn, idx) => (
          <Card key={idx} className="hud-border-pink p-6 bg-card/50">
            <div className="text-sm font-semibold mb-4">
              {conn.from} <span className="text-accent">↔</span> {conn.to}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Fee:</span>
                <span className="text-accent">{conn.fee}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">24h Volume:</span>
                <span className="text-accent">${(conn.volume24h / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Status:</span>
                <span className={conn.syncStatus === "synced" ? "text-accent" : "text-destructive"}>
                  {conn.syncStatus}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Volume Chart */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">24h Bridge Volume by Chain</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 255, 255, 0.1)" />
            <XAxis dataKey="chain" stroke="rgba(255, 255, 255, 0.5)" />
            <YAxis stroke="rgba(255, 255, 255, 0.5)" />
            <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", border: "1px solid rgba(0, 255, 255, 0.5)" }} />
            <Bar dataKey="volume" fill="rgba(0, 255, 255, 0.6)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Transactions */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Recent Bridge Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">From</th>
                <th className="text-left p-2 text-accent">To</th>
                <th className="text-left p-2 text-accent">Amount</th>
                <th className="text-left p-2 text-accent">Status</th>
                <th className="text-left p-2 text-accent">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 text-accent font-semibold">{tx.from}</td>
                  <td className="p-2 text-accent font-semibold">{tx.to}</td>
                  <td className="p-2 text-foreground/70">{tx.amount} BRZ</td>
                  <td className={`p-2 uppercase text-xs font-semibold ${tx.status === "confirmed" ? "text-accent" : "text-destructive"}`}>
                    {tx.status}
                  </td>
                  <td className="p-2 text-foreground/60">{new Date(tx.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Runtime Modules */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Z-Lang Runtime Modules</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {modules.map((module, idx) => (
            <div key={idx} className="hud-border p-4">
              <div className="text-sm font-semibold mb-2">{module.name}</div>
              <div className="text-xs text-accent uppercase tracking-wider mb-1">{module.status}</div>
              <div className="text-xs text-foreground/60">v{module.version}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
