import React from "react";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";

export default function Dashboard() {
  const { data: user } = trpc.auth.me.useQuery();
  const { data: highcoinTxs } = trpc.highcoin.getTransactions.useQuery();
  const { data: walletAddrs } = trpc.wallet.getAddresses.useQuery();
  const { data: poolInteractions } = trpc.liquidityPool.getInteractions.useQuery();

  const stats = [
    {
      label: "HighCoin Transactions",
      value: highcoinTxs?.length || 0,
      color: "text-destructive",
    },
    {
      label: "Wallet Addresses",
      value: walletAddrs?.length || 0,
      color: "text-accent",
    },
    {
      label: "Pool Interactions",
      value: poolInteractions?.length || 0,
      color: "text-accent",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="hud-border p-6 bg-card/50">
        <h2 className="text-3xl font-bold neon-glow mb-2">WELCOME TO ZDOS NEXUS</h2>
        <p className="text-foreground/70 text-sm">
          Manage your crypto assets across HighCoin, Ethereum, and Polygon in one unified dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="hud-border p-4 bg-card/50 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
            <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
              {stat.label}
            </div>
            <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">QUICK ACTIONS</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="hud-border p-3 text-sm font-semibold hover:bg-accent/10 transition-all">
            Send HighCoin
          </button>
          <button className="hud-border p-3 text-sm font-semibold hover:bg-accent/10 transition-all">
            View Wallet
          </button>
          <button className="hud-border-pink p-3 text-sm font-semibold hover:bg-destructive/10 transition-all">
            Add Liquidity
          </button>
          <button className="hud-border p-3 text-sm font-semibold hover:bg-accent/10 transition-all">
            Settings
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">RECENT ACTIVITY</h3>
        <div className="space-y-2 text-sm text-foreground/70">
          <div className="flex justify-between items-center p-2 border-b border-accent/20">
            <span>No recent activity</span>
            <span className="text-accent/50">--:--</span>
          </div>
        </div>
      </div>
    </div>
  );
}
