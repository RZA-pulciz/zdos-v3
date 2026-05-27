import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";

export default function Wallet() {
  const [balance, setBalance] = useState({
    brz: 10500.5,
    staking: 5000,
    stakingApy: 12.5,
    rewards: 625.75,
  });

  const [torStatus, setTorStatus] = useState({
    status: "connected",
    peers: 256,
    bandwidth: "2.5 MB/s",
  });

  const [transactions, setTransactions] = useState([
    { type: "stake", amount: 1000, address: "0xabc...123", status: "confirmed", timestamp: "2026-05-27T19:00:00Z" },
    { type: "reward", amount: 125.5, address: "0xdef...456", status: "confirmed", timestamp: "2026-05-27T18:00:00Z" },
    { type: "transfer", amount: 500, address: "0x789...abc", status: "pending", timestamp: "2026-05-27T17:00:00Z" },
  ]);

  const [swapForm, setSwapForm] = useState({ fromAmount: "", toAmount: "" });

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">DSN WALLET</h1>
        <p className="text-foreground/70">Distributed Storage Network - Asset Management</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hud-border p-6 bg-card/50">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Available Balance</div>
          <div className="text-4xl font-bold neon-glow mb-4">{balance.brz.toFixed(2)} BRZ</div>
          <div className="flex gap-2">
            <Button className="flex-1 text-xs">SEND</Button>
            <Button className="flex-1 text-xs" variant="outline">
              RECEIVE
            </Button>
          </div>
        </Card>

        <Card className="hud-border-pink p-6 bg-card/50">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">Staking Info</div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-foreground/70">Staked:</span>
              <span className="text-accent font-semibold">{balance.staking.toFixed(2)} BRZ</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">APY:</span>
              <span className="text-accent font-semibold">{balance.stakingApy}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/70">Rewards:</span>
              <span className="neon-glow-pink font-semibold">{balance.rewards.toFixed(2)} BRZ</span>
            </div>
          </div>
          <Button className="w-full text-xs">CLAIM REWARDS</Button>
        </Card>
      </div>

      {/* QR Code */}
      <Card className="hud-border p-6 bg-card/50 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32 bg-accent/10 border-2 border-accent flex items-center justify-center">
            <QrCode className="w-16 h-16 text-accent" />
          </div>
        </div>
        <div className="text-xs text-foreground/60 mono-data">0x1234567890abcdef1234567890abcdef12345678</div>
      </Card>

      {/* Swap */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Swap BRZ ↔ HighCoin</h2>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-foreground/60 uppercase tracking-wider">From Amount (BRZ)</label>
            <Input
              placeholder="0.00"
              type="number"
              value={swapForm.fromAmount}
              onChange={(e) => setSwapForm({ ...swapForm, fromAmount: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-foreground/60 uppercase tracking-wider">To Amount (HighCoin)</label>
            <Input
              placeholder="0.00"
              type="number"
              value={swapForm.toAmount}
              onChange={(e) => setSwapForm({ ...swapForm, toAmount: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button className="w-full">EXECUTE SWAP</Button>
        </div>
      </Card>

      {/* Z.TOR Panel */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Z.TOR Network Panel</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Status</div>
            <div className={`text-lg font-bold ${torStatus.status === "connected" ? "text-accent" : "text-destructive"}`}>
              {torStatus.status}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Peers</div>
            <div className="text-lg font-bold text-accent">{torStatus.peers}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Bandwidth</div>
            <div className="text-lg font-bold text-accent">{torStatus.bandwidth}</div>
          </div>
        </div>
      </Card>

      {/* Transaction History */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">Type</th>
                <th className="text-left p-2 text-accent">Amount</th>
                <th className="text-left p-2 text-accent">Address</th>
                <th className="text-left p-2 text-accent">Status</th>
                <th className="text-left p-2 text-accent">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 uppercase text-xs font-semibold text-accent">{tx.type}</td>
                  <td className="p-2 text-accent font-semibold">{tx.amount} BRZ</td>
                  <td className="p-2 mono-data text-foreground/70">{tx.address}</td>
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
    </div>
  );
}
