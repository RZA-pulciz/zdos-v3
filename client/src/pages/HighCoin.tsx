import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function HighCoin() {
  const { data: transactions, isLoading } = trpc.highcoin.getTransactions.useQuery();
  const sendMutation = trpc.highcoin.sendCoin.useMutation();
  const utils = trpc.useUtils();

  const [showSendForm, setShowSendForm] = useState(false);
  const [sendForm, setSendForm] = useState({ toAddress: "", amount: "" });

  const handleSend = async () => {
    if (!sendForm.toAddress || !sendForm.amount) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await sendMutation.mutateAsync(sendForm);
      toast.success("Transaction initiated");
      setSendForm({ toAddress: "", amount: "" });
      setShowSendForm(false);
      utils.highcoin.getTransactions.invalidate();
    } catch (error) {
      toast.error("Failed to send HighCoin");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="hud-border p-6 bg-card/50">
        <h2 className="text-3xl font-bold neon-glow-pink mb-2">HighCoin</h2>
        <p className="text-foreground/70 text-sm">
          Manage your HighCoin balance and transactions
        </p>
      </div>

      {/* Balance Card */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <div className="text-xs text-foreground/60 uppercase tracking-wider mb-2">
          Your Balance
        </div>
        <div className="text-4xl font-bold neon-glow-pink mb-4">0.00 HC</div>
        <div className="text-xs text-foreground/60">
          Address: <span className="mono-data text-accent">0x0000...0000</span>
        </div>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setShowSendForm(!showSendForm)}
          className="hud-border-pink p-4 text-sm font-semibold hover:bg-destructive/10 transition-all"
        >
          SEND HighCoin
        </button>
        <button className="hud-border p-4 text-sm font-semibold hover:bg-accent/10 transition-all">
          RECEIVE HighCoin
        </button>
      </div>

      {/* Send Form */}
      {showSendForm && (
        <Card className="hud-border-pink p-6 bg-card/50">
          <h3 className="text-lg font-bold neon-glow-pink mb-4">SEND HighCoin</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-foreground/60 uppercase tracking-wider">
                Recipient Address
              </label>
              <Input
                placeholder="0x..."
                value={sendForm.toAddress}
                onChange={(e) =>
                  setSendForm({ ...sendForm, toAddress: e.target.value })
                }
                className="mt-1 mono-data"
              />
            </div>
            <div>
              <label className="text-xs text-foreground/60 uppercase tracking-wider">
                Amount (HC)
              </label>
              <Input
                placeholder="0.00"
                type="number"
                value={sendForm.amount}
                onChange={(e) =>
                  setSendForm({ ...sendForm, amount: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSend}
                disabled={sendMutation.isPending}
                className="flex-1"
              >
                {sendMutation.isPending ? "Sending..." : "Send"}
              </Button>
              <Button
                onClick={() => setShowSendForm(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Transactions List */}
      <Card className="hud-border p-6 bg-card/50">
        <h3 className="text-lg font-bold neon-glow mb-4">TRANSACTION HISTORY</h3>
        <div className="space-y-2">
          {isLoading ? (
            <div className="text-foreground/60 text-sm">Loading transactions...</div>
          ) : transactions && transactions.length > 0 ? (
            transactions.map((tx, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border-b border-accent/20 hover:bg-accent/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold uppercase">
                    {tx.type === "send" ? "SENT" : "RECEIVED"}
                  </div>
                  <div className="text-xs text-foreground/60 mono-data">
                    {tx.toAddress}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-sm font-bold ${
                      tx.type === "send"
                        ? "text-destructive"
                        : "text-accent"
                    }`}
                  >
                    {tx.type === "send" ? "-" : "+"}{tx.amount} HC
                  </div>
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
