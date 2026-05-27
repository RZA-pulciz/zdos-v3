import React from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function Profile() {
  const { user } = useAuth();
  const { data: highcoinTxs } = trpc.highcoin.getTransactions.useQuery();
  const { data: walletTxs } = trpc.wallet.getTransactions.useQuery();
  const { data: poolInteractions } = trpc.liquidityPool.getInteractions.useQuery();

  const stats = [
    {
      label: "HighCoin Transactions",
      value: highcoinTxs?.length || 0,
      color: "text-destructive",
    },
    {
      label: "Ethereum Transactions",
      value: walletTxs?.length || 0,
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
      {/* Header */}
      <div className="hud-border p-6 bg-card/50">
        <h2 className="text-3xl font-bold neon-glow mb-2">USER PROFILE</h2>
        <p className="text-foreground/70 text-sm">Manage your account and view activity</p>
      </div>

      {/* User Info */}
      <Card className="hud-border p-6 bg-card/50">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
              Account Information
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-xs text-foreground/60 uppercase tracking-wider">Name</div>
                <div className="text-lg font-bold neon-glow">{user?.name || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/60 uppercase tracking-wider">Email</div>
                <div className="mono-data text-sm">{user?.email || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs text-foreground/60 uppercase tracking-wider">
                  Login Method
                </div>
                <div className="text-sm font-semibold text-accent">
                  {user?.loginMethod || "GitHub"}
                </div>
              </div>
              <div>
                <div className="text-xs text-foreground/60 uppercase tracking-wider">
                  Member Since
                </div>
                <div className="text-sm">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activity Summary */}
      <div>
        <h3 className="text-lg font-bold neon-glow mb-4">ACTIVITY SUMMARY</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, idx) => (
            <Card key={idx} className="hud-border p-4 bg-card/50">
              <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
                {stat.label}
              </div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">RECENT ACTIVITY</h3>
        <div className="space-y-2 text-sm text-foreground/70">
          <div className="flex justify-between items-center p-2 border-b border-accent/20">
            <span>
              Last login:{" "}
              {user?.lastSignedIn
                ? new Date(user.lastSignedIn).toLocaleString()
                : "N/A"}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 border-b border-accent/20">
            <span>
              Account updated:{" "}
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleString()
                : "N/A"}
            </span>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow-pink mb-4">SETTINGS</h3>
        <div className="space-y-3">
          <button className="hud-border-pink w-full p-3 text-sm font-semibold hover:bg-destructive/10 transition-all">
            CHANGE PASSWORD
          </button>
          <button className="hud-border-pink w-full p-3 text-sm font-semibold hover:bg-destructive/10 transition-all">
            ENABLE 2FA
          </button>
          <button className="hud-border-pink w-full p-3 text-sm font-semibold hover:bg-destructive/10 transition-all">
            DELETE ACCOUNT
          </button>
        </div>
      </Card>
    </div>
  );
}
