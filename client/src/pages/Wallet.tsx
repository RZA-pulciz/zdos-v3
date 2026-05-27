import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Wallet() {
  const { data: addresses, isLoading: addressesLoading } = trpc.wallet.getAddresses.useQuery();
  const { data: transactions, isLoading: txLoading } = trpc.wallet.getTransactions.useQuery();
  const [showAddWallet, setShowAddWallet] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  const handleAddWallet = async () => {
    if (!newAddress) {
      toast.error("Please enter a valid address");
      return;
    }
    toast.success("Wallet added");
    setNewAddress("");
    setShowAddWallet(false);
  };

  const defaultWallet = addresses?.[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hud-border p-6 bg-card/50">
        <h2 className="text-3xl font-bold neon-glow mb-2">x-zdos Wallet</h2>
        <p className="text-foreground/70 text-sm">
          Ethereum wallet interface for managing ETH and tokens
        </p>
      </div>

      {/* Wallet Balance */}
      {defaultWallet && (
        <Card className="hud-border p-6 bg-card/50">
          <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
            Primary Wallet
          </div>
          <div className="mono-data text-lg mb-4 break-all">{defaultWallet.address}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">ETH Balance</div>
              <div className="text-2xl font-bold neon-glow">0.00 ETH</div>
            </div>
            <div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">USD Value</div>
              <div className="text-2xl font-bold text-accent">$0.00</div>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="hud-border p-4 text-sm font-semibold hover:bg-accent/10 transition-all">
          SEND ETH
        </button>
        <button className="hud-border p-4 text-sm font-semibold hover:bg-accent/10 transition-all">
          RECEIVE
        </button>
        <button
          onClick={() => setShowAddWallet(!showAddWallet)}
          className="hud-border-pink p-4 text-sm font-semibold hover:bg-destructive/10 transition-all"
        >
          ADD WALLET
        </button>
      </div>

      {/* Add Wallet Form */}
      {showAddWallet && (
        <Card className="hud-border-pink p-6 bg-card/50">
          <h3 className="text-lg font-bold neon-glow-pink mb-4">ADD NEW WALLET</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground/60 uppercase tracking-wider">
                Ethereum Address
              </label>
              <Input
                placeholder="0x..."
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-1 mono-data"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddWallet} className="flex-1">
                Add
              </Button>
              <Button
                onClick={() => setShowAddWallet(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Wallets List */}
      <Card className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">YOUR WALLETS</h3>
        <div className="space-y-2">
          {addressesLoading ? (
            <div className="text-foreground/60 text-sm">Loading wallets...</div>
          ) : addresses && addresses.length > 0 ? (
            addresses.map((addr, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border-b border-accent/20 hover:bg-accent/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold">{addr.label || "Wallet"}</div>
                  <div className="text-xs text-foreground/60 mono-data">{addr.address}</div>
                </div>
                <div className="text-xs text-accent">Default</div>
              </div>
            ))
          ) : (
            <div className="text-foreground/60 text-sm">No wallets added yet</div>
          )}
        </div>
      </Card>

      {/* Transactions */}
      <Card className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">TRANSACTION HISTORY</h3>
        <div className="space-y-2">
          {txLoading ? (
            <div className="text-foreground/60 text-sm">Loading transactions...</div>
          ) : transactions && transactions.length > 0 ? (
            transactions.map((tx, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border-b border-accent/20 hover:bg-accent/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold uppercase">{tx.type}</div>
                  <div className="text-xs text-foreground/60 mono-data">{tx.txHash}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">{tx.amount} {tx.tokenSymbol}</div>
                  <div className="text-xs text-foreground/60">
                    {new Date(tx.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-foreground/60 text-sm">No transactions yet</div>
          )}
        </div>
      </Card>
    </div>
  );
}
