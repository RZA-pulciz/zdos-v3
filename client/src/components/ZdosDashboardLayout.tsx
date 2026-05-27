import React, { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X } from "lucide-react";

interface ZdosDashboardLayoutProps {
  children: React.ReactNode;
}

export default function ZdosDashboardLayout({ children }: ZdosDashboardLayoutProps) {
  const { user, logout, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentModule, setCurrentModule] = useState<string>("dashboard");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNavigate = (module: string) => {
    setCurrentModule(module);
    navigate(`/${module}`);
  };

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { id: "dashboard", label: "DASHBOARD", icon: "⚡" },
    { id: "highcoin", label: "HighCoin", icon: "💰" },
    { id: "wallet", label: "x-zdos Wallet", icon: "🔐" },
    { id: "liquidity", label: "Liquidity Pool", icon: "🌊" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground font-mono">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r-2 border-accent transition-all duration-300 flex flex-col overflow-hidden`}
        style={{
          boxShadow: "inset -10px 0 20px rgba(0, 255, 255, 0.05)",
        }}
      >
        {/* Logo */}
        <div className="p-4 border-b-2 border-accent/30">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold neon-glow">Z</div>
            {sidebarOpen && (
              <div className="text-xl font-bold neon-glow">DOS</div>
            )}
          </div>
          <div className={`text-xs text-accent/60 ${!sidebarOpen && "hidden"}`}>
            NEXUS
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-all duration-200 ${
                currentModule === item.id
                  ? "bg-accent/20 border-l-2 border-accent text-accent neon-glow"
                  : "text-foreground/70 hover:text-accent hover:bg-accent/10"
              }`}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t-2 border-accent/30 space-y-2">
          {sidebarOpen && (
            <div className="text-xs text-foreground/60 truncate">
              {user?.email}
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full text-xs"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && "Logout"}
          </Button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-20 right-2 p-1 hover:bg-accent/20 rounded-sm transition-colors"
        >
          {sidebarOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b-2 border-accent/30 bg-card/50 backdrop-blur-sm p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold neon-glow">ZDOS</h1>
            <div className="text-xs text-accent/60 uppercase tracking-wider">
              Nexus Dashboard
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-xs text-foreground/60">
              User: <span className="text-accent">{user?.name || "Anonymous"}</span>
            </div>
            {/* Status indicator */}
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-background/50">
          <div className="p-6">{children}</div>
        </div>
      </main>
    </div>
  );
}
