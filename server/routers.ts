import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  highcoin: router({
    getTransactions: protectedProcedure.query(async ({ ctx }) => {
      const { getHighcoinTransactions } = await import("./db");
      return getHighcoinTransactions(ctx.user.id);
    }),
    sendCoin: protectedProcedure
      .input((val: unknown) => {
        if (typeof val !== "object" || val === null) throw new Error("Invalid input");
        const obj = val as Record<string, unknown>;
        return {
          toAddress: String(obj.toAddress || ""),
          amount: String(obj.amount || ""),
        };
      })
      .mutation(async ({ ctx, input }) => {
        const { createHighcoinTransaction } = await import("./db");
        return createHighcoinTransaction({
          userId: ctx.user.id,
          type: "send",
          amount: input.amount,
          toAddress: input.toAddress,
          status: "pending",
        });
      }),
  }),

  wallet: router({
    getAddresses: protectedProcedure.query(async ({ ctx }) => {
      const { getWalletAddresses } = await import("./db");
      return getWalletAddresses(ctx.user.id);
    }),
    getTransactions: protectedProcedure.query(async ({ ctx }) => {
      const { getEthereumTransactions } = await import("./db");
      return getEthereumTransactions(ctx.user.id);
    }),
  }),

  liquidityPool: router({
    getInteractions: protectedProcedure.query(async ({ ctx }) => {
      const { getLiquidityPoolInteractions } = await import("./db");
      return getLiquidityPoolInteractions(ctx.user.id);
    }),
  })
});

export type AppRouter = typeof appRouter;
