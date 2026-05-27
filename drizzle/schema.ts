import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// HighCoin transactions table
export const highcoinTransactions = mysqlTable("highcoin_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  type: mysqlEnum("type", ["send", "receive"]).notNull(),
  amount: varchar("amount", { length: 128 }).notNull(), // Store as string for precision
  fromAddress: varchar("fromAddress", { length: 256 }),
  toAddress: varchar("toAddress", { length: 256 }).notNull(),
  txHash: varchar("txHash", { length: 256 }),
  status: mysqlEnum("status", ["pending", "completed", "failed"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HighcoinTransaction = typeof highcoinTransactions.$inferSelect;
export type InsertHighcoinTransaction = typeof highcoinTransactions.$inferInsert;

// Ethereum wallet addresses
export const walletAddresses = mysqlTable("wallet_addresses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  address: varchar("address", { length: 256 }).notNull().unique(),
  label: varchar("label", { length: 128 }),
  isDefault: int("isDefault").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WalletAddress = typeof walletAddresses.$inferSelect;
export type InsertWalletAddress = typeof walletAddresses.$inferInsert;

// Ethereum transactions
export const ethereumTransactions = mysqlTable("ethereum_transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  walletId: int("walletId").notNull().references(() => walletAddresses.id),
  txHash: varchar("txHash", { length: 256 }).notNull().unique(),
  type: mysqlEnum("type", ["send", "receive", "swap", "pool"]).notNull(),
  tokenSymbol: varchar("tokenSymbol", { length: 32 }).default("ETH"),
  amount: varchar("amount", { length: 128 }).notNull(),
  fromAddress: varchar("fromAddress", { length: 256 }).notNull(),
  toAddress: varchar("toAddress", { length: 256 }).notNull(),
  gasUsed: varchar("gasUsed", { length: 128 }),
  status: mysqlEnum("status", ["pending", "confirmed", "failed"]).default("pending"),
  blockNumber: int("blockNumber"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type EthereumTransaction = typeof ethereumTransactions.$inferSelect;
export type InsertEthereumTransaction = typeof ethereumTransactions.$inferInsert;

// Liquidity pool interactions (Polygon NETkali DSN)
export const liquidityPoolInteractions = mysqlTable("liquidity_pool_interactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  walletId: int("walletId").notNull().references(() => walletAddresses.id),
  txHash: varchar("txHash", { length: 256 }).notNull().unique(),
  type: mysqlEnum("type", ["deposit", "withdraw", "claim"]).notNull(),
  tokenAmount: varchar("tokenAmount", { length: 128 }).notNull(),
  lpTokenAmount: varchar("lpTokenAmount", { length: 128 }),
  status: mysqlEnum("status", ["pending", "confirmed", "failed"]).default("pending"),
  blockNumber: int("blockNumber"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LiquidityPoolInteraction = typeof liquidityPoolInteractions.$inferSelect;
export type InsertLiquidityPoolInteraction = typeof liquidityPoolInteractions.$inferInsert;

// User activity summary
export const userActivity = mysqlTable("user_activity", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id).unique(),
  totalHighcoinTransactions: int("totalHighcoinTransactions").default(0),
  totalEthereumTransactions: int("totalEthereumTransactions").default(0),
  totalPoolInteractions: int("totalPoolInteractions").default(0),
  lastActivityAt: timestamp("lastActivityAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UserActivity = typeof userActivity.$inferSelect;
export type InsertUserActivity = typeof userActivity.$inferInsert;