import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const NETKALI_TOKEN = "0xfc90516a1f736FaC557e09D8853dB80dA192c296";
const POLYGON_CHAIN = "Polygon";

export default function LiquidityPool() {
  const { data: interactions, isLoading } = trpc.liquidityPool.getInteractions.useQuery();
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [depositAmount, setDepositAmount] = useState("");

  const handleDeposit = async () => {
    if (!depositAmount) {
      toast.error("Please enter an amount");
      return;
    }
    toast.success("Deposit initiated");
    setDepositAmount("");
    setShowDepositForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hud-border p-6 bg-card/50">
        <h2 className="text-3xl font-bold neon-glow mb-2">Liquidity Pool</h2>
        <p className="text-foreground/70 text-sm">
          NETkali DSN (0xfc90516a1f736FaC557e09D8853dB80dA192c296) on {POLYGON_CHAIN}
        </p>
      </div>

      {/* Pool Info */}
      <Card className="hud-border p-6 bg-card/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
              Token Address
            </div>
            <div className="mono-data text-sm break-all text-accent">{NETKALI_TOKEN}</div>
          </div>
          <div>
            <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
              Blockchain
            </div>
            <div className="text-lg font-bold neon-glow">{POLYGON_CHAIN}</div>
          </div>
          <div>
            <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
              Your LP Tokens
            </div>
            <div className="text-lg font-bold text-accent">0.00 LP</div>
          </div>
        </div>
      </Card>

      {/* Pool Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hud-border p-4 bg-card/50">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
            Your Liquidity
          </div>
          <div className="text-2xl font-bold neon-glow">$0.00</div>
          <div className="text-xs text-foreground/60 mt-2">0.00 NETkali DSN</div>
        </Card>
        <Card className="hud-border-pink p-4 bg-card/50">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
            Estimated APY
          </div>
          <div className="text-2xl font-bold neon-glow-pink">--</div>
          <div className="text-xs text-foreground/60 mt-2">Pending</div>
        </Card>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setShowDepositForm(!showDepositForm)}
          className="hud-border-pink p-4 text-sm font-semibold hover:bg-destructive/10 transition-all"
        >
          ADD LIQUIDITY
        </button>
        <button className="hud-border p-4 text-sm font-semibold hover:bg-accent/10 transition-all">
          REMOVE LIQUIDITY
        </button>
        <button className="hud-border p-4 text-sm font-semibold hover:bg-accent/10 transition-all">
          CLAIM REWARDS
        </button>
      </div>

      {/* Deposit Form */}
      {showDepositForm && (
        <Card className="hud-border-pink p-6 bg-card/50">
          <h3 className="text-lg font-bold neon-glow-pink mb-4">ADD LIQUIDITY</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground/60 uppercase tracking-wider">
                Amount (NETkali DSN)
              </label>
              <Input
                placeholder="0.00"
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="text-xs text-foreground/60">
              You will receive approximately <span className="text-accent">0.00 LP tokens</span>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDeposit} className="flex-1">
                Deposit
              </Button>
              <Button
                onClick={() => setShowDepositForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Pool Interactions */}
      <Card className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">YOUR INTERACTIONS</h3>
        <div className="space-y-2">
          {isLoading ? (
            <div className="text-foreground/60 text-sm">Loading interactions...</div>
          ) : interactions && interactions.length > 0 ? (
            interactions.map((interaction, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border-b border-accent/20 hover:bg-accent/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold uppercase">{interaction.type}</div>
                  <div className="text-xs text-foreground/60 mono-data">{interaction.txHash}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">{interaction.tokenAmount} DSN</div>
                  <div className="text-xs text-foreground/60">
                    {new Date(interaction.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-foreground/60 text-sm">No pool interactions yet</div>
          )}
        </div>
      </Card>

      {/* Pool Info Footer */}
      <div className="text-xs text-foreground/60 p-4 border border-accent/20 rounded-sm">
        <p className="mb-2">
          <strong>NETkali DSN Liquidity Pool on Polygon</strong>
        </p>
        <p>
          This liquidity pool operates exclusively on the Polygon blockchain. All interactions are
          limited to the NETkali DSN token (0xfc90516a1f736FaC557e09D8853dB80dA192c296).
        </p>
      </div>
    </div>
  );
}
