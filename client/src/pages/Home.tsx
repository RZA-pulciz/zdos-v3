import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const loginUrl = getLoginUrl();

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, 0.05) 25%, rgba(0, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, 0.05) 75%, rgba(0, 255, 255, 0.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8 px-4 max-w-2xl">
        {/* Logo */}
        <div className="space-y-2">
          <h1 className="text-7xl font-black neon-glow" style={{ letterSpacing: "0.1em" }}>
            ZDOS
          </h1>
          <p className="text-2xl neon-glow-pink" style={{ letterSpacing: "0.05em" }}>
            NEXUS
          </p>
        </div>

        {/* Tagline */}
        <div className="space-y-4">
          <p className="text-lg text-foreground/80 leading-relaxed">
            Unified Crypto Dashboard for HighCoin, Ethereum, and Polygon
          </p>
          <p className="text-sm text-accent/70 uppercase tracking-widest">
            &gt; Manage your digital assets in one cyberpunk interface
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
          <div className="hud-border p-4 text-left">
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm font-bold neon-glow-pink mb-2">HighCoin</div>
            <div className="text-xs text-foreground/60">
              Manage your HighCoin balance and transactions
            </div>
          </div>
          <div className="hud-border p-4 text-left">
            <div className="text-2xl mb-2">🔐</div>
            <div className="text-sm font-bold neon-glow mb-2">x-zdos Wallet</div>
            <div className="text-xs text-foreground/60">
              Ethereum wallet with full asset control
            </div>
          </div>
          <div className="hud-border p-4 text-left">
            <div className="text-2xl mb-2">🌊</div>
            <div className="text-sm font-bold neon-glow mb-2">Liquidity Pool</div>
            <div className="text-xs text-foreground/60">
              Polygon NETkali DSN liquidity management
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <a href={loginUrl}>
            <Button className="hud-border-pink px-8 py-6 text-lg font-bold neon-glow-pink hover:bg-destructive/10 transition-all">
              SIGN IN WITH GITHUB
            </Button>
          </a>
          <p className="text-xs text-foreground/60 mt-4 uppercase tracking-widest">
            Secure OAuth Authentication
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-xs text-foreground/40 mono-data">
        &gt; ZDOS Nexus v1.0.0
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-foreground/40 mono-data">
        &gt; Cyberpunk Dashboard
      </div>
    </div>
  );
}
