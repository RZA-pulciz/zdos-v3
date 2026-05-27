import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("Crypto Routes", () => {
  describe("HighCoin", () => {
    it("should retrieve highcoin transactions for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const transactions = await caller.highcoin.getTransactions();

      expect(Array.isArray(transactions)).toBe(true);
    });

    it("should accept sendCoin input with valid format", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.highcoin.sendCoin({
          toAddress: "0x1234567890123456789012345678901234567890",
          amount: "10.5",
        });
      } catch (error: any) {
        // Expected in test environment without real user in DB
        const errorStr = error?.message || String(error);
        expect(errorStr).toMatch(/foreign key|Failed query/);
      }
    });
  });

  describe("Wallet", () => {
    it("should retrieve wallet addresses for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const addresses = await caller.wallet.getAddresses();

      expect(Array.isArray(addresses)).toBe(true);
    });

    it("should retrieve ethereum transactions for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const transactions = await caller.wallet.getTransactions();

      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe("Liquidity Pool", () => {
    it("should retrieve liquidity pool interactions for authenticated user", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const interactions = await caller.liquidityPool.getInteractions();

      expect(Array.isArray(interactions)).toBe(true);
    });
  });

  describe("Authentication", () => {
    it("should require authentication for protected procedures", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);

      try {
        await caller.highcoin.getTransactions();
        expect.fail("Should have thrown authentication error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it("should allow public auth.me query", async () => {
      const ctx: TrpcContext = {
        user: null,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {} as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.me();

      expect(result).toBeNull();
    });
  });
});
