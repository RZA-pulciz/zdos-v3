import { useState, useEffect } from "react";
import { Route, Switch } from "wouter";
import { Menu, X, Zap } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Modules
import Dashboard from "./pages/modules/Dashboard";
import HighCoin from "./pages/modules/HighCoin";
import BridgeChain from "./pages/modules/BridgeChain";
import Wallet from "./pages/modules/Wallet";
import ZLang from "./pages/modules/ZLang";
import Nodes from "./pages/modules/Nodes";
import ZGenesis from "./pages/modules/ZGenesis";
import XCloud from "./pages/modules/XCloud";
import ZStack from "./pages/modules/ZStack";
import HighBrainChain from "./pages/modules/HighBrainChain";
import About from "./pages/modules/About";

const modules = [
  { name: "Dashboard", path: "/", icon: "📊", component: Dashboard },
  { name: "HighCoin", path: "/highcoin", icon: "💰", component: HighCoin },
  { name: "BridgeChain", path: "/bridgechain", icon: "🌉", component: BridgeChain },
  { name: "DSN Wallet", path: "/wallet", icon: "👛", component: Wallet },
  { name: "Z-Lang", path: "/zlang", icon: "⚙️", component: ZLang },
  { name: "ZDOS Nodes", path: "/nodes", icon: "🔗", component: Nodes },
  { name: "Z-GENESIS", path: "/zgenesis", icon: "🧬", component: ZGenesis },
  { name: "xCLOUD", path: "/xcloud", icon: "☁️", component: XCloud },
  { name: "Z-STACK", path: "/zstack", icon: "🏗️", component: ZStack },
  { name: "HighBrainChain", path: "/highbrainchain", icon: "🧠", component: HighBrainChain },
  { name: "About", path: "/about", icon: "ℹ️", component: About },
];

function Router() {
  return (
    <Switch>
      {modules.map((module) => (
        <Route key={module.path} path={module.path} component={module.component} />
      ))}
    </Switch>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState("/");
  const [networkStats, setNetworkStats] = useState({
    activeNodes: 42,
    uptime: 99.97,
    txPerHour: 1250,
    agentsActive: 128,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats((prev) => ({
        ...prev,
        txPerHour: Math.floor(Math.random() * 500) + 1000,
        agentsActive: Math.floor(Math.random() * 50) + 100,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar */}
            <div
              className={`${
                sidebarOpen ? "w-64" : "w-20"
              } bg-card/50 border-r border-accent/30 transition-all duration-300 flex flex-col overflow-y-auto`}
            >
              {/* Logo */}
              <div className="p-4 border-b border-accent/30 flex items-center gap-3">
                <Zap className="w-6 h-6 text-accent neon-glow" />
                {sidebarOpen && <div className="font-bold text-lg neon-glow">ZDOS</div>}
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-2 space-y-1">
                {modules.map((module) => (
                  <a
                    key={module.path}
                    href={module.path}
                    onClick={() => setCurrentPath(module.path)}
                    className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                      currentPath === module.path
                        ? "bg-accent/20 text-accent border-l-2 border-accent"
                        : "text-foreground/70 hover:bg-accent/10"
                    }`}
                  >
                    <span className="text-lg">{module.icon}</span>
                    {sidebarOpen && <span className="text-sm font-medium">{module.name}</span>}
                  </a>
                ))}
              </nav>

              {/* Footer */}
              <div className="p-2 border-t border-accent/30 text-xs text-foreground/60">
                {sidebarOpen && <div className="text-center">ZDOS NEXUS v3.0</div>}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="bg-card/50 border-b border-accent/30 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-accent/10 rounded transition-colors"
                  >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                  <h1 className="text-2xl font-bold neon-glow">ZDOS NEXUS</h1>
                </div>

                {/* Network Status */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-foreground/60 text-xs uppercase">Active Nodes</div>
                    <div className="text-accent font-bold">{networkStats.activeNodes}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground/60 text-xs uppercase">Uptime</div>
                    <div className="text-accent font-bold">{networkStats.uptime}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground/60 text-xs uppercase">TX/Hour</div>
                    <div className="text-accent font-bold">{networkStats.txPerHour}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-foreground/60 text-xs uppercase">Agents</div>
                    <div className="text-accent font-bold">{networkStats.agentsActive}</div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 overflow-y-auto p-6">
                <Router />
              </main>
            </div>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
