CREATE TABLE `ethereum_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`walletId` int NOT NULL,
	`txHash` varchar(256) NOT NULL,
	`type` enum('send','receive','swap','pool') NOT NULL,
	`tokenSymbol` varchar(32) DEFAULT 'ETH',
	`amount` varchar(128) NOT NULL,
	`fromAddress` varchar(256) NOT NULL,
	`toAddress` varchar(256) NOT NULL,
	`gasUsed` varchar(128),
	`status` enum('pending','confirmed','failed') DEFAULT 'pending',
	`blockNumber` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ethereum_transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `ethereum_transactions_txHash_unique` UNIQUE(`txHash`)
);
--> statement-breakpoint
CREATE TABLE `highcoin_transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('send','receive') NOT NULL,
	`amount` varchar(128) NOT NULL,
	`fromAddress` varchar(256),
	`toAddress` varchar(256) NOT NULL,
	`txHash` varchar(256),
	`status` enum('pending','completed','failed') DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `highcoin_transactions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `liquidity_pool_interactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`walletId` int NOT NULL,
	`txHash` varchar(256) NOT NULL,
	`type` enum('deposit','withdraw','claim') NOT NULL,
	`tokenAmount` varchar(128) NOT NULL,
	`lpTokenAmount` varchar(128),
	`status` enum('pending','confirmed','failed') DEFAULT 'pending',
	`blockNumber` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `liquidity_pool_interactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `liquidity_pool_interactions_txHash_unique` UNIQUE(`txHash`)
);
--> statement-breakpoint
CREATE TABLE `user_activity` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`totalHighcoinTransactions` int DEFAULT 0,
	`totalEthereumTransactions` int DEFAULT 0,
	`totalPoolInteractions` int DEFAULT 0,
	`lastActivityAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_activity_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_activity_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `wallet_addresses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`address` varchar(256) NOT NULL,
	`label` varchar(128),
	`isDefault` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `wallet_addresses_id` PRIMARY KEY(`id`),
	CONSTRAINT `wallet_addresses_address_unique` UNIQUE(`address`)
);
--> statement-breakpoint
ALTER TABLE `ethereum_transactions` ADD CONSTRAINT `ethereum_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ethereum_transactions` ADD CONSTRAINT `ethereum_transactions_walletId_wallet_addresses_id_fk` FOREIGN KEY (`walletId`) REFERENCES `wallet_addresses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `highcoin_transactions` ADD CONSTRAINT `highcoin_transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `liquidity_pool_interactions` ADD CONSTRAINT `liquidity_pool_interactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `liquidity_pool_interactions` ADD CONSTRAINT `liquidity_pool_interactions_walletId_wallet_addresses_id_fk` FOREIGN KEY (`walletId`) REFERENCES `wallet_addresses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_activity` ADD CONSTRAINT `user_activity_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `wallet_addresses` ADD CONSTRAINT `wallet_addresses_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;