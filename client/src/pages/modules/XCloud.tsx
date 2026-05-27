import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function XCloud() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Alice Corp", email: "alice@corp.com", company: "TechCorp", status: "lead", value: 50000 },
    { id: 2, name: "Bob Industries", email: "bob@ind.com", company: "IndustrialCo", status: "prospect", value: 150000 },
    { id: 3, name: "Charlie Tech", email: "charlie@tech.com", company: "TechStart", status: "negotiation", value: 300000 },
    { id: 4, name: "Diana Systems", email: "diana@sys.com", company: "SystemsInc", status: "won", value: 500000 },
  ]);

  const [pipeline, setPipeline] = useState({
    leads: 45,
    prospects: 28,
    negotiation: 12,
    won: 8,
  });

  const [automations, setAutomations] = useState([
    { name: "Auto-Follow-up", status: "active", triggers: 1250 },
    { name: "Lead Scoring", status: "active", triggers: 892 },
    { name: "Email Campaign", status: "active", triggers: 2145 },
    { name: "Task Assignment", status: "active", triggers: 567 },
  ]);

  return (
    <div className="space-y-6">
      <div className="hud-border p-6 bg-card/50">
        <h1 className="text-4xl font-bold neon-glow mb-2">xCLOUD ENTERPRISE</h1>
        <p className="text-foreground/70">CRM & Business Automation Platform</p>
      </div>

      {/* Sales Pipeline */}
      <Card className="hud-border-pink p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow-pink mb-4">Sales Pipeline</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="hud-border p-4 text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Leads</div>
            <div className="text-4xl font-bold text-accent">{pipeline.leads}</div>
          </div>
          <div className="hud-border p-4 text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Prospects</div>
            <div className="text-4xl font-bold text-accent">{pipeline.prospects}</div>
          </div>
          <div className="hud-border p-4 text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Negotiation</div>
            <div className="text-4xl font-bold text-accent">{pipeline.negotiation}</div>
          </div>
          <div className="hud-border p-4 text-center">
            <div className="text-xs text-foreground/60 uppercase mb-2">Won</div>
            <div className="text-4xl font-bold neon-glow-green">{pipeline.won}</div>
          </div>
        </div>
      </Card>

      {/* Contacts */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">Contacts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-accent/30">
                <th className="text-left p-2 text-accent">Name</th>
                <th className="text-left p-2 text-accent">Email</th>
                <th className="text-left p-2 text-accent">Company</th>
                <th className="text-left p-2 text-accent">Status</th>
                <th className="text-left p-2 text-accent">Value</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                  <td className="p-2 font-semibold">{contact.name}</td>
                  <td className="p-2 text-foreground/70">{contact.email}</td>
                  <td className="p-2 text-foreground/70">{contact.company}</td>
                  <td className={`p-2 uppercase text-xs font-semibold ${contact.status === "won" ? "text-accent" : "text-destructive"}`}>
                    {contact.status}
                  </td>
                  <td className="p-2 text-accent font-semibold">${(contact.value / 1000).toFixed(0)}K</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Automations */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">ZDOS Automations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {automations.map((auto, idx) => (
            <div key={idx} className="hud-border-pink p-4">
              <div className="text-sm font-semibold mb-2">{auto.name}</div>
              <div className="text-xs text-accent uppercase mb-1">{auto.status}</div>
              <div className="text-xs text-foreground/60">{auto.triggers} triggers</div>
            </div>
          ))}
        </div>
      </Card>

      {/* DSN Layer */}
      <Card className="hud-border p-6 bg-card/50">
        <h2 className="text-lg font-bold neon-glow mb-4">DSN Layer Integration</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="hud-border p-4">
            <div className="text-sm font-semibold mb-2">Data Storage</div>
            <div className="text-xs text-foreground/70">Distributed across 42 nodes</div>
            <div className="text-xs text-accent mt-2">Status: Synced</div>
          </div>
          <div className="hud-border p-4">
            <div className="text-sm font-semibold mb-2">Encryption</div>
            <div className="text-xs text-foreground/70">End-to-end AES-256</div>
            <div className="text-xs text-accent mt-2">Status: Active</div>
          </div>
        </div>
      </Card>

      {/* Portal Fusion */}
      <Button className="w-full">OPEN PORTAL FUSION</Button>
    </div>
  );
}
